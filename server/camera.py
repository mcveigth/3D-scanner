#Config script for cameras

import settings
import paramiko

command = "ls -l"

def sshCamera(host:str, username:str, password:str):
    client = paramiko.client.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host, username=username, password=password)
    _stdin, _stdout,_stderr = client.exec_command("hostname -I")
    print(_stdout.read().decode())
    client.close()

if __name__ == '__main__':
    for ip in settings.RASPBERRY_IPS:
        if(ip != "192.168.99.106"):
            sshCamera(ip, settings.RASPBERRY_USER, settings.RASPBERRY_PASS)