#!/usr/bin/env python

from flask import Flask, request, redirect
from flask_cors import CORS 


app = Flask(__name__)
CORS(app)

@app.route('/api')
def index():
    return "Hello World"

@app.route("/upload-file", methods=["GET","POST"])
def upload_file():

    if request.method == "POST":

        if request.files:

            file_1=request.files["file_1"]

            print(file_1)

            return "file uploaded successfully!"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7501, debug=True)