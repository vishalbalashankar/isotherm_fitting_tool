#!/usr/bin/env python

from flask import Flask, request, redirect, jsonify
from flask_restful import Resource, Api
import os 
from werkzeug.utils import secure_filename

app = Flask(__name__)
api = Api(app)

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
            for file in files:
                if file.filename == "":
                    print("No selected file", flush=True)
                    return redirect(request.url)
                if file and allowed_file(file.filename):
                    filename = secure_filename(file.filename)
                    destination = "/".join([target, filename])
                    print(destination, flush=True)
                    file.save(destination)
                    print("Uploading incoming file:", filename, flush=True)
                    # return redirect(url_for('uploaded_file',filename=filename))
            return ""

api.add_resource(Upload_File,"/upload-file")


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7501, debug=True)