#!/usr/bin/env python

from flask import Flask, request, redirect, url_for, flash
from flask_cors import CORS 
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = '/Users/vishal/Documents/isotherm_fitting_tool/utility'


app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
#APP_ROOT = os.path.dirname(os.path.abspath(__file__))

CORS(app)

@app.route('/api')
def index():
    return "Hello World"

@app.route("/upload-file", methods=["GET","POST"])
def upload_file():
#    target = os.path.join(APP_ROOT, '/images_upload')
    target = UPLOAD_FOLDER
    print(target, flush=True)
    if not os.path.isdir(target):
        print('Folder not available', flush = True)
        os.mkdir(target)
    if request.method == 'POST':
        print("I am inside",flush = True)
    #Check if the post request has the file part
        if 'file' not in request.files:
            print('No file part',flush=True)
            return redirect(request.url)
        file=request.files["file"]
        if file.filename == '':
            print('No selected file',flush=True)
            return redirect(request.url)
        if file:
            print('uploading file', flush=True)
            filename = secure_filename(file.filename)
            destination = "/".join([target, filename])
            print(destination, flush = True)
            print("Accept incoming file:", filename, flush = True)
            file.save(destination)   
            print('uploading file', flush=True)
            #return redirect(url_for('uploaded_file',filename=filename))

    return ''

#    if request.method == "POST":

#        if request.files:
#            print("File is uploading",flush=True)#

#            image = request.files["image"]

#            print(os.path.join(app.config['ISOTHERM_UPLOADS'],image.filename), flush=True)
#            image.save(os.path.join(app.config['ISOTHERM_UPLOADS'],image.filename))



#            print("File is uploading",flush=True)

#            return "file uploaded successfully!"


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7501, debug=True)

flask_cors.CORS(app, expose_headers='Authorization')
