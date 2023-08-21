import base64
import os


dirname = os.path.dirname(os.path.realpath(__file__))
filename = 'aldrich-dev-portfolio-firebase-adminsdk-nxd05-df72616d13.json'
inputfile = dirname + '/' + filename

with open(inputfile, 'rb') as jsonFile:
    encodeFile = base64.b64encode(jsonFile.read())
    print(encodeFile.decode())

