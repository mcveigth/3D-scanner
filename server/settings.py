import os
DEBUG = os.environ.get('FLASK_ENV', True) == 'development'

WORKERS=120
DATABASE = 'mysql+mysqlconnector://mcveigth:asdf@localhost:3306/company'
LIGHT_IP = '192.168.99.25'
LIGHT_USER = 'admin'
LIGHT_PASS = 'admin'

GRID_IP = '192.168.99.20'
GRID_USER = 'admin'
GRID_PASS = 'admin'

RASPBERRY_USER = 'root'
RASPBERRY_PASS = '3dscan'
RASPBERRY_IPS = [
    '192.168.99.101',
    '192.168.99.102',
    '192.168.99.103',
    '192.168.99.104',
    '192.168.99.105',
    '192.168.99.106',
    '192.168.99.107',
    '192.168.99.108',
    '192.168.99.109',
    '192.168.99.110',
    '192.168.99.111',
    '192.168.99.112',
    '192.168.99.113',
    '192.168.99.114',
    '192.168.99.115',
    '192.168.99.116',
    '192.168.99.117',
    '192.168.99.118',
    '192.168.99.119',
    '192.168.99.120',
    '192.168.99.121',
    '192.168.99.122',
    '192.168.99.123',
    '192.168.99.124',
    '192.168.99.125',
    '192.168.99.126',
    '192.168.99.127',
    '192.168.99.128',
    '192.168.99.129',
    '192.168.99.130',
    '192.168.99.131',
    '192.168.99.132',
    '192.168.99.133',
    '192.168.99.134',
    '192.168.99.135',
    '192.168.99.136',
    '192.168.99.137',
    '192.168.99.138',
    '192.168.99.139',
    '192.168.99.140',
    '192.168.99.141',
    '192.168.99.142',
    '192.168.99.143',
    '192.168.99.144',
    '192.168.99.145',
    '192.168.99.146',
    '192.168.99.147',
    '192.168.99.148',
    '192.168.99.149',
    '192.168.99.150',
    '192.168.99.151',
    '192.168.99.152',
    '192.168.99.153',
    '192.168.99.154',
    '192.168.99.155',
    '192.168.99.156',
    '192.168.99.157',
    '192.168.99.158',
    '192.168.99.159',
    '192.168.99.160',
    '192.168.99.161',
    '192.168.99.162',
    '192.168.99.163',
    '192.168.99.164',
    '192.168.99.165',
    '192.168.99.166',
    '192.168.99.167',
    '192.168.99.168',
    '192.168.99.169',
    '192.168.99.170',
    '192.168.99.171',
    '192.168.99.172',
    '192.168.99.173',
    '192.168.99.174',
    '192.168.99.175',
    '192.168.99.176',
    '192.168.99.177',
    '192.168.99.178',
    '192.168.99.179',
    '192.168.99.180',
    '192.168.99.181',
    '192.168.99.182',
    '192.168.99.183',
    '192.168.99.184',
    '192.168.99.185',
    '192.168.99.191',
    '192.168.99.192',
    '192.168.99.193',
    '192.168.99.194',
    '192.168.99.195',
]