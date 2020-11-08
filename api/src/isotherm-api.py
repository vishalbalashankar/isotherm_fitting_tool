#!/usr/bin/env python

from flask import Flask, request, redirect, url_for, flash
from flask_cors import CORS
from werkzeug.utils import secure_filename
import os

UPLOAD_FOLDER = "/Users/vishal/Documents/isotherm_fitting_tool/utility"
ALLOWED_EXTENSIONS = set(["txt", "pdf"])

app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

CORS(app)


def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/api")
def index():
    return "Hello World"


@app.route("/upload-file", methods=["GET", "POST"])
def upload_file():
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


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=7501, debug=True)

flask_cors.CORS(app, expose_headers="Authorization")
