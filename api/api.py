import time
from flask import Flask
from search import all_file_text

app = Flask(__name__)

@app.route('/time')
def get_current_time():
    return {'time': time.time()}

@app.route('/s3_files')
def get_text_in_s3_files():
    return all_file_text()
