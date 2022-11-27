import requests
import settings
import time

def np_02B_api(ip, username, password, is_on):
    if settings.DEBUG: return

    if is_on:
        endpoint = '/cmd.cgi?grp=0'
    else:
        endpoint = '/cmd.cgi?grp=30'

    url = 'http://' + ip + endpoint
    r = requests.get(url, auth=(username, password), timeout=4)
    r.raise_for_status()

def lights_on():
    np_02B_api(settings.LIGHT_IP, settings.LIGHT_USER, settings.LIGHT_PASS, True)

def lights_off():
    np_02B_api(settings.LIGHT_IP, settings.LIGHT_USER, settings.LIGHT_PASS, False)

def grid_on():
    np_02B_api(settings.GRID_IP, settings.GRID_USER, settings.GRID_PASS, True)

def grid_off():
    np_02B_api(settings.GRID_IP, settings.GRID_USER, settings.GRID_PASS, False)


if __name__ == '__main__':
    try:
        print('Turning lights on...')
        lights_on()

        print('Waiting three seconds...')
        time.sleep(3)

        print('Turning lights off...')
        lights_off()
    except BaseException as e:
        print('Problem with lights: {} - {}'.format(e.__class__.__name__, str(e)))

    try:
        print('Turning grid on...')
        grid_on()

        print('Waiting three seconds...')
        time.sleep(3)

        print('Turning grid off...')
        grid_off()
    except BaseException as e:
        print('Problem with grid: {} - {}'.format(e.__class__.__name__, str(e)))
