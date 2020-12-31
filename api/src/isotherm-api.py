#!/usr/bin/env python

from flask import Flask, request, redirect, jsonify
from flask_restful import Resource, Api
import os 
from werkzeug.utils import secure_filename
from flask_cors import CORS
import pandas as pd
import numpy as np

from webargs import fields
from webargs.flaskparser import use_kwargs, parser
from get_isotherm import get_isotherm, isotherm

import sys

def allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

ALLOWED_EXTENSIONS = set(["csv", "xlsx"])

class HelloWorld(Resource):	
    def get(self):	
        return jsonify({'isotherm': "I am Working"})

class Upload_File(Resource):
    def __init__(self):
        self.output_name = "Upload_File" 
        super()

    def post(self):
        try:
            if request.method == "POST":
                # Check if the post request has the file part
                if "files[]" not in request.files:
                    print("No files[] part exist", file=sys.stderr)
                    return redirect(request.url)
                files = request.files.getlist("files[]")
                for file in files:
                    if file.filename == "":
                        print("No selected file", file=sys.stderr)
                        return redirect(request.url)
                    if not allowed_file(file.filename):
                        raise ValueError("Error!!! File doesn't match the requirements")
                    if file and allowed_file(file.filename):
                        df = pd.read_csv(file)
                        print("Processing incoming file:", file.filename, file=sys.stderr)
                        if request.form.get('qsat_init') == "":
                            qsat_init = 4
                        else:
                            qsat_init = float(request.form.get('qsat_init'))
                        if request.form.get('b0_init') == "":
                            b0_init = 0.1
                        else:
                            b0_init = float(request.form.get('b0_init'))
                        if request.form.get('delu_init') == "":
                            delu_init = -10
                        else:
                            delu_init = float(request.form.get('delu_init'))
                        initialGuess=[qsat_init, b0_init, delu_init]
                        isotherm_fit, fitvals = get_isotherm(df,initialGuess)
                        return jsonify({'isotherm': df.to_dict("records"),'isotherm_fit': isotherm_fit, 'popt': fitvals})
                return ""
        except ValueError as e: 
            return str(e), 400

class EnterParameters(Resource):
    def __init__(self):
        self.output_name = "enter_parameters" 
        super()

    def get(self):
        print("Running GET Request")
        args = request.args
        xFit = np.arange(0,1,0.05)
        Ttot = 3
        zFit = np.empty(Ttot*len(xFit)); zFit.fill(1)
        flag = 0
        for Temp in ['283.15', '298.15', '313.15']:
            zFit[ flag*len(xFit): (flag+1)*len(xFit) ] = Temp
            flag+=1
        xFit = np.tile(xFit,Ttot)
        X = xFit, zFit
        yFit = isotherm(X, float(args['qsat']), float(args['b0']), 1000*float(args['delu']))
        df = pd.DataFrame()
        df['Pfit'] = xFit
        df['qfit'] = yFit
        df['T'] = zFit
        return jsonify({'isotherm_fit': df.to_dict("records")})

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Upload_File,"/uploadfile")
api.add_resource(HelloWorld,"/testing")
api.add_resource(EnterParameters,"/enter_parameters")

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7501, debug=True)