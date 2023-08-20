import firebase_admin
from firebase_admin import credentials, storage
import os
# import sys
# from uuid import uuid4

BUCKETPATH = "aldrich-dev-portfolio.appspot.com"
PROJECTNAME = "portfolio"
SOURCEDIR   = "src/"
IGNORE = ["firebase_cred.js"]

if __name__ == "__main__":
# I should be able to turn this into a Github Action file
    githubTempPath = '/Users/runner/work/_temp'
    keyFilePath = './aldrich-dev-portfolio-firebase-adminsdk-nxd05-df72616d13.json'

    keyFilePath = '/tmp/firebase_key.json'

    firebase_key = os.environ.get('FIREBASE_STORAGE_KEY')
    if firebase_key != None:
        print("FIREBASE_STORAGE_KEY FOUND")

        with open(keyFilePath, 'w') as keyFile:
            keyFile.write(firebase_key)

        cred = credentials.Certificate(keyFilePath)
        firebase_admin.initialize_app(cred, {
            'storageBucket' : f"{BUCKETPATH}"
        })

        bucket = storage.bucket()

        storage_path = f"portfolio/{PROJECTNAME}"

        for root, _, files in os.walk(SOURCEDIR):
            print(f"root: ${root} files: ${files}")
            for file in files:
                local_file_path = os.path.join(root, file)
                blob_path = os.path.join(storage_path, os.path.relpath(local_file_path, SOURCEDIR))
                blob = bucket.blob(blob_path)
                blob.upload_from_filename(local_file_path)
                print(f'{local_file_path} uplodated to {blob_path}')
    else:
        print("FIREBASE_STORAGE_KEY NOT FOUND")
