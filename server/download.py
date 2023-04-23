import os
import settings
from paramiko import Transport, util, SFTPClient
from multiprocessing import Pool
from functools import partial
import time

util.log_to_file('../paramiko.log')


def fake_download(ip, dest):
    import requests, random
    num = ip.split('.')[3]
    r = requests.get('https://picsum.photos/400/300?random=' + num)
    time.sleep(random.uniform(2, 10))
    with open(dest / (num + '_420.jpg'), 'wb') as f:
        f.write(r.content)


def download(ip, dest):
    if settings.DEBUG:
        fake_download(ip, dest)

    print('Downloading from', ip)

    port = 22
    transport = Transport((ip, port))
    transport.connect(None, settings.RASPBERRY_USER, settings.RASPBERRY_PASS)

    sftp = SFTPClient.from_transport(transport)

    files = sftp.listdir('/3dscan/')
    latest_file = max(files, key=lambda f: sftp.stat('/3dscan/' + f).st_mtime)
    source_file = '/3dscan/' + latest_file
    dest_file = dest / (latest_file + '.tmp')
    print('Grabbing latest file', source_file)
    sftp.get(source_file, dest_file)
    sftp.remove(source_file)
    done_file = dest / latest_file
    dest_file.rename(done_file)

    # delete all other files
    for f in files:
        if f != latest_file:
            sftp.remove('/3dscan/' + f)

    if sftp: sftp.close()
    if transport: transport.close()

    print('Finished downloading from', ip)


def download_all_photos(path):
    if not path.exists():
        raise Exception('Destination does not exist')

    print('Downloading all photos to', path)

    with Pool(settings.WORKERS) as pool:
        func = partial(download, dest=path)
        start_time = time.time()
        initial_time = start_time
        results = pool.imap_unordered(func, settings.RASPBERRY_IPS)
        for r in results:
            end_time = time.time()
            print("time taken for result" , end_time - start_time, "seconds")
            start_time = end_time

        end_time = time.time()
        print("total time taken:", end_time - initial_time, 'seconds')


if __name__ == '__main__':
    from pathlib import Path
    path = Path('output/mcveigth@test.com_02')
    download_all_photos(path)