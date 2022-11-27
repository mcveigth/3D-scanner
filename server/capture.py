import socket
import sys
import time

# make sure multicast is being routed to the right interface ie.
# sudo route add -net 224.0.0.0 netmask 240.0.0.0 dev enx00249b649e67

def trigger_capture():
    charid = 1
    unitid = 1
    groupid = 1

    gtdate = time.gmtime()
    now = str(gtdate.tm_year) + str(gtdate.tm_mon) + str(gtdate.tm_mday) + str(gtdate.tm_hour) + str(gtdate.tm_min) + str(gtdate.tm_sec)

    SDATA = str(now)

    print('Sending: ' + SDATA)
    MCAST_GRP = '224.1.1.1'
    MCAST_PORT = 5007
    SCMD = chr(charid)
    SUNIT = chr(unitid)
    SGROUP = chr(groupid)
    SEND = SCMD+SUNIT+SGROUP+SDATA
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM, socket.IPPROTO_UDP)
    dev = 'eth0' + '\0'
    sock.setsockopt(socket.IPPROTO_IP, socket.IP_MULTICAST_TTL, 2)
    sock.sendto(SEND.encode('utf-8'), (MCAST_GRP, MCAST_PORT))
    sock.close()
    print('Sent.')

if __name__ == '__main__':
    print('Triggering test capture...')
    trigger_capture()
