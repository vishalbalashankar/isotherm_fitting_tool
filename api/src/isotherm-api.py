#!/usr/bin/env python

from flask import Flask, request, redirect, jsonify
from flask_restful import Resource, Api
import os 
from werkzeug.utils import secure_filename
from flask_cors import CORS

from webargs import fields
from webargs.flaskparser import use_kwargs, parser
from get_isotherm import get_isotherm

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

ALLOWED_EXTENSIONS = set(["csv", "xlsx"])

class Upload_File(Resource):
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
                    filename = secure_filename(file.filename)
                    print("Processing incoming file:", filename, flush=True)
                    # return redirect(url_for('uploaded_file',filename=filename))
            return ""


app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Upload_File,"/upload-file")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7501, debug=True)