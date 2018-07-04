''' Experimentação de técnica de detecção automática de pontos de inflexão
em ensaios coulométricos '''

import urllib
import json
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

api_url = 'http://localhost:8000/'
request = lambda x: json.loads(urllib.request.urlopen(api_url + x).read())['payload']
datasources = request('dataset')
datasets = [request('dataset/' + ds['_id']) for ds in datasources]

wds_idx = 2  # Seleção do dataset
f_order = 10 # Tamanho janela de filtro simétrico (order * 2 + 1)
w_order = 20 # Tamanho janela de convolução (order * 2 + 1)

wds = np.array(datasets[wds_idx]['voltage'])
wds_time = np.arange(0, len(wds)) * datasets[wds_idx]['samplingInterval']

class Dataset:
    ''' Dataset representation '''
    def __init__(self, data, time):
        self.data = data
        self.time = time
        self.dt = time[1] - time[0]

    def plot(self):
        plt.plot(self.time, self.data)

    def __len__(self):
        return len(self.data)

def filter(dataset, order):
    ''' Filtra dataset com filtro simétrico de tamanho (order * 2 + 1) '''
    if not isinstance(dataset, Dataset):
        raise TypeError('Dataset must be a dataset object')
    data = np.array(dataset.data)
    time = np.array(dataset.time)
    delta_data = np.ones((order,))
    delta_time = np.arange(0, order) * dataset.dt
    w = np.ones((2 * order + 1,)) / (2 * order + 1)
    e_data = np.hstack(
        (
            delta_data * np.mean(data[0]),
            data,
            delta_data * np.mean(data[-1])
        )
    )
    e_time = np.hstack(
        (
            delta_time - delta_time[-1] - dataset.dt,
            time,
            delta_time + time[-1] + dataset.dt
        )
    )
    for i in range(order, len(e_data) - order):
        e_data[i] = e_data[i-order:i+1+order].dot(w)
    return Dataset(e_data, e_time)

def deriv(dataset):
    ''' Deriva um dataset '''
    if not isinstance(dataset, Dataset):
        raise TypeError('Dataset must be a dataset object')
    data = np.array(dataset.data)
    time = np.array(dataset.time)
    n_data = np.zeros((len(data) - 1,))
    n_time = np.zeros((len(time) - 1,))
    for i in range(0, len(n_data)):
        n_data[i] = (data[i+1] - data[i]) / dataset.dt
        n_time[i] = time[i+1]
    return Dataset(n_data, n_time)

def convol(dataset, wsize):
    ''' Convoluciona um dataset com janela triangular '''
    if not isinstance(dataset, Dataset):
        raise TypeError('Dataset must be a dataset object')
    line = np.linspace(0, 1, wsize)
    w = np.hstack((line, [1.], line[-1::-1]))
    data = np.array(dataset.data)
    time = np.array(dataset.time)
    n_data = np.zeros((len(data),))
    for i in range(wsize, len(data) - wsize):
        n_data[i] = data[i-wsize:i+1+wsize].dot(w)
    return Dataset(n_data, time)

class Detector:
    def __init__(self, dataset):
        self.dataset = dataset
        self.filtered = filter(dataset, f_order)
        self.derived = deriv(self.filtered)
        self.points = []

    def __propagate__(self):
        ''' Retorna derivada filtrada, subtraída de influências, de acordo com o número de pontos
        no detector '''
        return self.derived

    def __estimate_gaussian__(self, ref, time):
        pass

    def addPoint(self):
        reference = self.__propagate__()
        convoluted = convol(reference, 20)
        time = convoluted.time[np.argmin(convoluted.data)]
        print(time)

    def remPoint(self):
        pass
    
    def ignorePoint(self, idx):
        pass
    
    def plot(self):
        plt.plot(self.filtered.time, self.filtered.data)
        plt.plot(10.0, -1.0, 'k.', markersize=10, markerfacecolor='red')

# detector = Detector(Dataset(wds, wds_time))
# detector.addPoint()
# plt.figure()
# detector.plot()
# plt.show()

# def buildLaggedFeatures (source, lag=2, dropna=True):
#     if type(source) is pd.DataFrame:
#         newDict = {}
#         for col in source:
#             newDict[col] = source[col]
#             for l in range(1, lag+1):
#                 newDict['%s_lag%d' % (col, l)] = source[col].shift(l)
#         return pd.DataFrame(newDict, index=source.index)

# data = pd.DataFrame({
#     'potential': wds
# }, index=wds_time)

# print(data.diff(2))


# dt = Dataset(wds, wds_time)
# filt = filter(dt, f_order)
# diff = deriv(filt)
# conv = convol(diff, w_order)

# plt.ion()
# diff.plot()
# conv.plot()

# m  = np.min(conv.data)
# mi = conv.time[np.where(conv.data == m)][0]
# pi = dt.data[np.where(dt.time == mi)][0]



