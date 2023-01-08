#Config script for cameras

import settings
import paramiko

def sshCamera(host:str, username:str, password:str, command="ls"):
    client = paramiko.client.SSHClient()
    client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    client.connect(host, username=username, password=password)
    _stdin, _stdout,_stderr = client.exec_command("mount -o remount,rw / && cd /camsoft/ && pwd && rm options.cfg && echo -ISO 100 -ss 5000 -awb off -awbg 1.304,1.667 -mm matrix -drc off -h 972 -w 1296 -q 100 -t 1500 -br -bs '-65995' -bm -ev 0 -ex off -co 0 -sa 0 >> options.cfg") #should be modify to use mount -o remount, rm
    #_stdin, _stdout,_stderr = client.exec_command("cd /camsoft/")
    #_stdin, _stdout,_stderr = client.exec_command("pwd")
    
    #_stdin, _stdout,_stderr = client.exec_command("rm options.cfg")
    #_stdin, _stdout,_stderr = client.exec_command("echo -ISO 100 -ss 5000 -awb off -awbg 1.304,1.667 -mm matrix -drc off -h 972 -w 1296 -q 100 -t 1500 -br -bs '-65995' -bm -ev 0 -ex off -co 0 -sa 0 >> options.cfg")
    #_stdin, _stdout,_stderr = client.exec_command("pwd")
    print(_stdout.read().decode())
    client.close()

if __name__ == '__main__':
    for ip in settings.RASPBERRY_IPS:
        sshCamera(ip, settings.RASPBERRY_USER, settings.RASPBERRY_PASS)
        print("done ip: " + ip)
