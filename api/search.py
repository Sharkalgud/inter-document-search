import boto3
import os

BUCKET = "seed-serverless-notes-api-tutorial-file-storage"
DOWNLOADDIR = "files/downloads/"

#downloads all files present in s3 bucket
#returns keys in downloads
def download_files():
    s3Client = boto3.client('s3')
    s3Resource = boto3.resource('s3')
    keys = []
    response = s3Client.list_objects(Bucket=BUCKET)
    if 'Contents' in response:
        for item in response['Contents']:
            keys.append(item['Key'])
    for key in keys:
        s3Resource.meta.client.download_file(BUCKET, key, DOWNLOADDIR + key)
    return keys

#returns all the text for files in download/files in dict
def all_file_text():
    download_files()

    file_text = {}
    directory = os.fsencode(DOWNLOADDIR)
    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        if filename != ".DS_Store":
            with open(DOWNLOADDIR + filename, 'r', encoding='windows-1252') as f:
                text = f.read()
            file_text[filename] = text
    return file_text
