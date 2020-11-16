#!/usr/bin/env python

from flask import Flask, request, redirect, jsonify
from flask_restful import Resource, Api
import os 
from werkzeug.utils import secure_filename
from flask_cors import CORS

from webargs import fields
from webargs.flaskparser import use_kwargs, parser
from get_isotherm import get_isotherm
import pandas as pd

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

UPLOAD_FOLDER = "/app/userfile_uploads"
ALLOWED_EXTENSIONS = set(["csv", "xlsx"])

class Upload_File(Resource):
    def __init__(self):
        self.output_name = "Upload_File" 
        super()

    def post(self):
        target = UPLOAD_FOLDER
        print(target, flush=True)
        if not os.path.isdir(target):
            print("Folder not available, creating a new directory", flush=True)
            os.mkdir(target)
        if request.method == "POST":
            # Check if the post request has the file part
            if "files[]" not in request.files:
                print("No files[] part exist", flush=True)
                return redirect(request.url)
            files = request.files.getlist("files[]")
            print("Size of Files", files, flush = True)
            for file in files:
                print(file, flush=True)
                if file.filename == "":
                    print("No selected file", flush=True)
                    return ""
                if file and allowed_file(file.filename):
                    df = pd.read_csv(file)
                    print(df, flush=True)
                    print("Processing incoming file:", file.filename, flush=True)
                    return ""
            return jsonify({'isotherm': df.to_dict("records")})

class Isotherms(Resource):
    def __init__(self):
        self.output_name = "Isotherms"
        super()

    @use_kwargs({"adsbnum": fields.Int(missing=1)},location = "query")
    def get(self, adsbnum):
        print("Get Request")
        print(adsbnum,flush=True)
        return jsonify({'isotherm': get_isotherm(adsbnum)})


app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Upload_File,"/upload-file")
api.add_resource(Isotherms,"/isotherms/")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7501, debug=True)