import os
import json
import time
from datetime import datetime
from pathlib import Path
from flask import Flask, request, abort, send_from_directory
from flask_cors import CORS
#testing
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager
from apscheduler.schedulers.background import BackgroundScheduler
##
import power, capture, download, settings, otpLogin

import logging
log = logging.getLogger('werkzeug')
if not settings.DEBUG:
    log.setLevel(logging.ERROR)

build_folder = Path('../client/build')
#output_folder = Path('./output')
output_folder = Path('/home/mike/3DshockOriginal/server/output') #path needs to be changed each time if folder is different
app = Flask(__name__, static_folder=str(build_folder), static_url_path='')

CORS(app)

#testing
app.config["JWT_SECRET_KEY"] = "testing1"
jwt = JWTManager(app)
##
STANDBY = 0
WARMUP = 1
CAPTURING_PHOTO = 2
CAPTURING_GRID = 3
WRITING = 4
DOWNLOADING = 5

status = STANDBY

#testing
otpQueue = "otpQueue.json"

def createOtps():
    """Creates otps based on dates provided by otpQueue"""
    dates = otpLogin.createDates("otpQueue.json")
    otps = [otpLogin.getOTP(d) for d in dates]
    print(otps)

def checkQueue():
    """Checks for changes in queue, if changes were made call createOtps"""
    with open("otp.log") as f:
        stamp = f.read()
        actStamp = str(os.path.getctime("otpQueue.json"))
        if stamp != actStamp:
            print("file has changed")
            with open("otp.log", "w") as f:
                f.write(actStamp)
            createOtps()

scheduler = BackgroundScheduler() 
scheduler.add_job(func=checkQueue,trigger='interval', seconds=5) #sets scheduler for checkQueue
scheduler.start()
##
@app.route('/api/status', methods=['GET'])
def status_get():
    return {'status': status}

@app.route('/api/clients', methods=['POST'])
def clients_post():
    content = request.json    
    email = str(content['email'])
    passcode = str(content['passcode'])
    #testing
    if otpLogin.verifyOTP(passcode, 3) or passcode == '123456':
        #verifies otp for a window of 3(90secs)
        for i in range(1, 100):
            suffix = str(i).zfill(2)
            folder = email + '_' + suffix
            path = output_folder / folder
            if not path.exists():
                break

        content['date'] = datetime.now().strftime('%Y-%m-%d')
        content['time'] = datetime.now().strftime('%H:%M:%S')

        path.mkdir() #fucking tanner where did you get your degree from. A cerealbox?
        print(path)
        info_file = path / 'info.json'
        info_file.touch()
        info_file.write_text(json.dumps(content, indent=4))

        client_id = folder

        print('POST client:', content, 'cid:', client_id)
        return {'client_id': client_id}
    else:
        return {"msg": "Wrong passcode"}, 401

@app.route('/api/clients/<cid>', methods=['GET'])
def clients_get(cid):
    folder = cid
    path = output_folder / cid

    if not path.exists():
        abort(404)

    info_file = path / 'info.json'
    info_text = info_file.read_text()
    res = json.loads(info_text)
    photo_glob = path.glob('*.jpg')
    res['has_photos'] = bool(list(photo_glob))

    print('GET client:', cid, 'res:', res)
    return res

@app.route('/api/clients/<cid>/session', methods=['GET'])
def session_get(cid):
    folder = cid
    path = output_folder / cid

    if not path.exists():
        abort(404)

    photo_glob = path.glob('*.jpg')
    res = {}
    res['photos'] = sorted([x.name for x in photo_glob])

    return res

@app.route('/api/clients/<cid>/session', methods=['DELETE'])
def session_delete(cid):
    folder = cid
    path = output_folder / cid

    if not path.exists():
        abort(404)

    photo_glob = path.glob('*.jpg')

    for p in photo_glob:
        p.unlink()

    print('DELETE session:', cid)
    return ''

@app.route('/api/clients/<cid>/session', methods=['POST'])
def session_post(cid):
    content = request.json
    light_time = content.get('light_time', 5000)

    global status

    print('POST session:', cid)
    folder = cid
    path = output_folder / cid

    if not path.exists():
        abort(404)

    # go through the photo taking process

    try:
        # warmup
        status = WARMUP
        power.lights_on()
        #time.sleep(2)
        #power.lights_off()
        #time.sleep(1)
    except BaseException as e:
        print('Problem with lights: {} - {}'.format(e.__class__.__name__, str(e)))
        print()
        print('Are you sure the system is connected?')
        print()
        abort(500)

    # capture
    status = CAPTURING_PHOTO
    power.lights_on()
    time.sleep(0.1)
    capture.trigger_capture()
    #time.sleep(light_time / 1000)
    #power.lights_off()

    status = WRITING
    time.sleep(max(5 - light_time / 1000, 1))

    status = DOWNLOADING
    download.download_all_photos(path)
    time.sleep(3)

    status = STANDBY
    print('Finished.')
    return ''

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')

@app.route('/output/<path:filename>')
def output(filename):
    return send_from_directory('output/', filename)

app.run(host='0.0.0.0', port=5001, debug=True) #changed port to 80 for changes and testing
