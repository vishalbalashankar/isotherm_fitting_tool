#!/usr/bin/env python

import os
import pandas as pd 

DESTINATION_FOLDER = "/app/userfile_uploads"

def get_isotherm(component):
    files=os.listdir(DESTINATION_FOLDER)
    file_name="/".join([DESTINATION_FOLDER,files[component - 1]])
    print(file_name, flush = True)
    df = pd.read_csv(file_name)
    return df.to_dict("records")

