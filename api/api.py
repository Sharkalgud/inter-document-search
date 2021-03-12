import time
from flask import Flask, request
from search import all_file_text

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/s3_files')
def get_text_in_s3_files():
    return all_file_text()

@app.route('/search')
def search():
    search_term = request.args.get('term').lower()
    file_text = all_file_text()
    search_results = {}
    for file_name in file_text.keys():
        text = file_text[file_name]
        sentenctes = text.split('. ')
        for sentence in sentenctes:
            if search_term in sentence.lower():
                if file_name in search_results:
                    search_results[file_name].append(sentence)
                else:
                    search_results[file_name] = [sentence]
    return search_results

@app.route('/search2')
def search2():
    search_term = request.args.get('term').lower()
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
