#!/usr/bin/env python

import os
import pandas as pd 
import numpy as np
from scipy.optimize import curve_fit

DESTINATION_FOLDER = "/app/userfile_uploads"


def get_isotherm(df_adsb,initialGuess):

    def isotherm(X, qsat, b0, dUb): 
        Piso, Tiso = X
        R = 8.314
        Rg=8.314*10**(-5);                # Gas constant <(m^3 bar)/(K mol)> [for all calculations]
        c=(Piso)/(Rg*Tiso)
        b=b0*np.exp(-dUb/(R*Tiso))
        qiso=((qsat*b*c)/(1 + b*c)) 
        return qiso
    xData=df_adsb['P'].to_numpy()
    yData=df_adsb['q'].to_numpy()
    zData=df_adsb['T'].to_numpy()
    popt, pcov = curve_fit(isotherm, (xData,zData), yData, p0 = initialGuess, maxfev=50000)
    xFit = np.arange(0,1,0.05)
    zFit = np.empty(3*len(xFit)); zFit.fill(1)
    flag = 0
    for Temp in df_adsb['T'].unique():
        zFit[flag*len(xFit): (flag+1)*len(xFit) ] = Temp
        flag+=1
    xFit = np.tile(xFit,3)
    X = xFit, zFit
    yFit = isotherm(X,popt[0],popt[1],popt[2])
    print('Curve fit in Progress', flush=True)
    df_fit = pd.DataFrame(columns = ['Pfit', 'qfit']) 
    df_fit['Pfit'] = xFit
    df_fit['qfit'] = yFit
    fitparam = ["qsat", "b0", "dUb"]
    return df_fit.to_dict("records"), dict(zip(fitparam,popt))

