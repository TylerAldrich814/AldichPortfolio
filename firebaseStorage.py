import firebase_admin
from firebase_admin import credentials, storage
import os
from uuid import uuid4
import sys

BUCKETPATH = "aldrich-dev-portfolio.appspot.com"
PROJECTNAME = "portfolio"
SOURCEDIR   = "src/"
IGNORE = ["firebase_cred.js"]
# KEYFILENAME = '/aldrich-dev-portfolio-firebase-adminsdk-nxd05-df72616d13.json'
KEYFILENAME = 'my_secret.json'
GITHUBTEMPPATH = '/Users/runner/work/_temp'
# -----------------------------------------------------------------------------


# First, we get our Github Firebase Secret credentials, and decode it back into
# it's original file. Which we then use to verify our Credentials with Firebase.
# At which point, we update our Project files on our Firebase Storage for your
# portfolio.
if __name__ == "__main__":
# I should be able to turn this into a Github Action file
    def UploadFiles():
        # firebase_key = os.environ.get('FIREBASE_STORAGE_KEY')
        keyFilePath = '/Users/runner/work/_temp/firebase_key.json'
        firebase_key = os.environ.get('FIREBASE_AUTH') or ""
        if firebase_key == "":
            print(" -> FAILED TO FETCH FIREBASE AUTHENTICATION KEY")
            return

        with open(keyFilePath, 'w') as keyFile:
            keyFile.write(firebase_key)

        print(" -> STARTING FIREBASE STORAGE FILE TRANSFER.")
        # with open(keyFilePath, 'w') as keyFile:
        #     keyFile.write(firebase_key)

        keyFilePath = GITHUBTEMPPATH + KEYFILENAME;

        cred = credentials.Certificate(keyFilePath)
        firebase_admin.initialize_app(cred, {
            'storageBucket' : f"{BUCKETPATH}"
        })
        print(" -> SUCCESSFULLY INITIALIZED FIREBASE APP.")

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
    UploadFiles()
