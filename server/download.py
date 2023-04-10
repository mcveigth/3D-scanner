import os
import settings
from threading import Thread, Lock
# import paramiko
from paramiko import Transport, util, SFTPClient
import time
from queue import Queue

util.log_to_file('../paramiko.log')

lock = Lock()

def fake_download(ip, dest):
    import requests, random
    num = ip.split('.')[3]
    r = requests.get('https://picsum.photos/400/300?random=' + num)
    time.sleep(random.uniform(2, 10))
    with open(dest / (num + '_420.jpg'), 'wb') as f:
        f.write(r.content)

def download(ip, dest):
    with lock:
        #acquire lock before accessing the destination directory
        #to prevent race condition
        if settings.DEBUG:
            fake_download(ip, dest)

        print('Downloading from', ip)

        port = 22
        transport = Transport((ip, port))
        transport.connect(None, settings.RASPBERRY_USER, settings.RASPBERRY_PASS)

        sftp = SFTPClient.from_transport(transport)

        files = sftp.listdir('/3dscan/')
        latest_file = max(files, key=lambda f:sftp.stat('/3dscan/' + f).st_mtime)
        source_file = '/3dscan/' + latest_file
        dest_file = dest / (latest_file + '.tmp')
        print('Grabbing latest file', source_file)
        sftp.get(source_file, dest_file)
        sftp.remove(source_file)
        done_file = dest / latest_file
        dest_file.rename(done_file)

        #delete all other files
        for f in files:
            if f != latest_file:
                sftp.remove('/3dscan/' + f)

        if sftp: sftp.close()
        if transport: transport.close()

        print('Finished downloading from', ip)

def download_all_photos(dest):
    if not dest.exists():
        raise Exception('Destination does not exist')

    print('Downloading all photos to', dest)

    for ip in settings.RASPBERRY_IPS:
        t = Thread(target=download, args=(ip, dest))
        t.start()

# possible fix for faster threading

def download_sublist(sublist, dest):
    for ip in sublist:
        download(ip, dest)
def download_main(dest):
    IPS = settings.RASPBERRY_IPS

    # Define the number of threads to use
    num_threads = 4

    # Divide the list into sublists
    sublist_size = len(IPS) // num_threads
    sublists = [IPS[i:i+sublist_size] for i in range(0, len(IPS), sublist_size)]

    #create a thread for each sublist and start them
    threads = []
    for i, sublist in enumerate(sublists):
        thread_name = f"Thread-{i}"
        thread = Thread(target=download, args=(sublist, dest), name=thread_name)
        thread.start()
        threads.append(thread)

    # Wait for all threads to finish
    for thread in threads:
        thread.join()

if __name__ == '__main__':
    from pathlib import Path
    path = Path('/home/figurines/3D-scanner/server/')
    ip = input("insert ip of the camera: ")
    download(ip, path)
