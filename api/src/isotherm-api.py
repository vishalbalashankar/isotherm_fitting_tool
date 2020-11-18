#!/usr/bin/env python

from flask import Flask, request, redirect, jsonify
from flask_restful import Resource, Api
import os 
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pandas as pd

from webargs import fields
from webargs.flaskparser import use_kwargs, parser
from get_isotherm import get_isotherm

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

ALLOWED_EXTENSIONS = set(["csv", "xlsx"])

class Upload_File_1(Resource):
    def __init__(self):
        self.output_name = "Upload_File" 
        super()

    def post(self):
        if request.method == "POST":
            # Check if the post request has the file part
            if "files[]" not in request.files:
                print("No files[] part exist", flush=True)
                return redirect(request.url)
            files = request.files.getlist("files[]")
            for file in files:
                if file.filename == "":
                    print("No selected file", flush=True)
                    return redirect(request.url)
                if file and allowed_file(file.filename):
                    df = pd.read_csv(file)
                    print("Processing incoming file:", file.filename, flush=True)
                    initialGuess=[2.0,0.01]
                    return jsonify({'isotherm': df.to_dict("records"),'isotherm_fit': get_isotherm(df,initialGuess)})
            return ""

class Upload_File_2(Resource):
    def __init__(self):
        self.output_name = "Upload_File" 
        super()

    def post(self):
        if request.method == "POST":
            # Check if the post request has the file part
            if "files[]" not in request.files:
                print("No files[] part exist", flush=True)
                return redirect(request.url)
            files = request.files.getlist("files[]")
            for file in files:
                if file.filename == "":
                    print("No selected file", flush=True)
                    return redirect(request.url)
                if file and allowed_file(file.filename):
                    df = pd.read_csv(file)
                    print("Processing incoming file:", file.filename, flush=True)
                    initialGuess=[6,0.001]
                    print("N2 working here", flush=True)
                    print(get_isotherm(df,initialGuess))
                    print("N2 worked perfectly here", flush=True)
                    return jsonify({'isotherm': df.to_dict("records"),'isotherm_fit': get_isotherm(df,initialGuess)})
            return ""

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Upload_File_1,"/upload-file-1")
api.add_resource(Upload_File_2,"/upload-file-2")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7501, debug=True)