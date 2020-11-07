#!/usr/bin/env python

from flask import Flask
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

@app.route('/api')
def index():
    return {
        'userid': 1,
        'title': 'Isotherm Fitting tool',
        'working': False
    }

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=7501, debug=True)