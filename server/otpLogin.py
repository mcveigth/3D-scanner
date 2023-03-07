import pyotp
import datetime
import json

key = pyotp.random_base32()
totp = pyotp.TOTP(key)
def getOTP(date):
    """Generate otp for datetime"""
    passcode = totp.at(for_time=date)
    return passcode

def verifyOTP(passcode, window):
    """Verify otp for passcode and a certain time"""
    return totp.verify(passcode, valid_window=window)

def createDates(file):
    """Create datetime objects based on dates from a json file, then return objects in a list"""
    with open(file) as f:
        data = json.load(f)
        return [datetime.datetime.strptime(data[i]["date"], '%Y-%m-%d %H:%M') for i in range(len(data))]