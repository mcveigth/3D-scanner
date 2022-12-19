#Config script for cameras

import settings
import paramiko

def sshCamera(host:str, username:str, password:str, command="ls"):
    client = paramiko.client.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host, username=username, password=password)
    _stdin, _stdout,_stderr = client.exec_command("hostname -I") #should be modify to use mount -o remount, rm
    print(_stdout.read().decode())
    client.close()

def sshAllCameras(cameras):
    for cam in cameras:
        print(cam)

if __name__ == '__main__':
    #for ip in settings.RASPBERRY_IPS:
    #    if(ip != "192.168.99.106"):
    #        sshCamera(ip, settings.RASPBERRY_USER, settings.RASPBERRY_PASS)
    sshAllCameras(["values", "more values", "even more values"])
