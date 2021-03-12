import boto3
import os
import requests
import json
from scipy import spatial

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
            with open(DOWNLOADDIR + filename, 'r') as f:
                text = f.read()
            file_text[filename] = text
    return file_text

#returns positions of sentences in each document that have the search term in them
def extactMatchSearch(search_term):
    file_text = all_file_text()
    search_results = {}
    for file_name in file_text.keys():
        text = file_text[file_name]
        sentenctes = text.split('. ')
        count = 0
        for sentence in sentenctes:
            if search_term in sentence.lower():
                sentence_obj = {"start": count, "length": len(sentence)}
                if file_name in search_results:
                    search_results[file_name]["results"].append(sentence_obj)
                else:
                    search_results[file_name] = {"text": text, "results": [sentence_obj]}
            count += len(sentence) + 2
    return search_results


#returns positions of sentences in each document that are relevant to the query made
def relevantContextSearch(question):
    file_text = all_file_text()
    answers = {}
    for file_name in file_text.keys():
        text = file_text[file_name]
        sentences = text.split('. ')
        embeddings = getEmbeddings(question, sentences)
        question_embedding = embeddings[question]
        count = 0
        for sentence in sentences:
            sentence_embedding = embeddings[sentence]
            result =  1 - spatial.distance.cosine(question_embedding, sentence_embedding)
            if result > 0.68:
                sentence_obj = {"start": count, "length": len(sentence)}
                if file_name in answers:
                    answers[file_name]["results"].append(sentence_obj)
                else:
                    answers[file_name] = {"text": text, "results": [sentence_obj]}
            count += len(sentence) + 2
    return answers

#take questions and sentencts and resturn dict of their embeddings or something like that
def getEmbeddings(question, sentences):
    chunkObj = {"0": question}
    count = 1
    for sentence in sentences:
        chunkObj[str(count)] = sentence
        count += 1
    requesObj = {"chunk": chunkObj}

    url = 'http://3.101.151.128:8123/v3/chunk_embeddings/'
    header = {"Content-Type": "application/json"}
    response = requests.post(url, json=requesObj, headers=header)
    response.raise_for_status()
    raw_embeddings = json.loads(response.text)

    return raw_embeddings
