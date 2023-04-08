import os
import settings
import threading
import paramiko
import time
import asyncio

paramiko.util.log_to_file('paramiko.log')


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
    transport = paramiko.Transport((ip, port))
    transport.connect(None, settings.RASPBERRY_USER, settings.RASPBERRY_PASS)

    sftp = paramiko.SFTPClient.from_transport(transport)

    files = sftp.listdir('/3dscan/')

    for f in files:
        source_file = '/3dscan/' + f
        dest_file = dest / (f + '.tmp')
        print('Grabbing file', source_file)
        sftp.get(source_file, dest_file)
        sftp.remove(source_file)
        done_file = dest / f
        dest_file.rename(done_file)

    if sftp: sftp.close()
    if transport: transport.close()

    print('Finished downloading from', ip)


def download_all_photos(dest):
    if not dest.exists():
        raise Exception('Destination does not exist')

    print('Downloading all photos to', dest)

    for ip in settings.RASPBERRY_IPS:
        t = threading.Thread(target=download, args=(ip, dest))
        t.start()

async def download_all_photos_asyncio(dest):
    """uses asyncio to download pictures from RASPBERRY_IPS, supposedly should fix some problems"""
    if not dest.exists():
        raise Exception('Destination does not exist')

    print('Downloading all photos to', dest)

    tasks = []
    for ip in settings.RASPBERRY_IPS:
        tasks.append(asyncio.create_task(download(ip, dest)))

    await asyncio.gather(*tasks, return_exceptions=True)

    print("Finished downloading all photos")


if __name__ == '__main__':
    from pathlib import Path

    download_all_photos(Path('test/'))
    loop = asyncio.get_event_loop()
    loop.run_until_complete(download_all_photos_asyncio(Path('test/')))
