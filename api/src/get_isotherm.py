#!/usr/bin/env python

import os
import pandas as pd 
import numpy as np
from scipy.optimize import curve_fit

DESTINATION_FOLDER = "/app/userfile_uploads"


def get_isotherm(df_adsb,initialGuess):

    def isotherm(Piso, qsat, b): 
        Rg=8.314*10**(-5);                # Gas constant <(m^3 bar)/(K mol)> [for all calculations]
        Tiso=298.15
        c=(Piso)/(Rg*Tiso)
        qiso=((qsat*b*c)/(1 + b*c)) 
        return qiso
    xData=df_adsb['P'].to_numpy()
    yData=df_adsb['q'].to_numpy()
    popt, pcov = curve_fit(isotherm, xData, yData, initialGuess)
    print('I am working', flush=True)
    xFit = np.arange(0,1,0.01)
    yFit = isotherm(xFit,popt[0],popt[1])
    print('I am working fine fit', flush=True)
    df_fit = pd.DataFrame(columns = ['Pfit', 'qfit']) 
    df_fit['Pfit'] = xFit
    df_fit['qfit'] = yFit
    print(df_fit)
    return df_fit.to_dict("records")

