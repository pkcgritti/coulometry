from core.datatypes import Dataset
from core.utils import datasetGuard
import numpy as np

def filter_dataset (dataset, order):
  """
  Filtra dataset com filtro simétrico de tamanho (order * 2 + 1).
  Retorna um novo dataset como resultado.
  """
  datasetGuard(dataset)
  data = np.array(dataset.data)
  time = np.array(dataset.time)
  w = np.ones((2 * order + 1,)) / (2 * order + 1)
  for i in range(order, len(data) - order):
    data[i] = data[i-order:i+1+order].dot(w)
  return Dataset(data, time)

def derivate_dataset(dataset):
  """
  Calcula derivada de um dataset.
  Retorna um novo dataset.
  """
  datasetGuard(dataset)
  data = np.array(dataset.data)
  time = np.array(dataset.time)
  n_data = np.zeros((len(data) - 1,))
  n_time = np.zeros((len(time) - 1,))
  for i in range(0, len(n_data)):
    n_data[i] = (data[i+1] - data[i]) / dataset.dt
    n_time[i] = time[i+1]
  return Dataset(n_data, n_time)

def convolute_dataset(dataset, wsize):
  """
  Convoluciona um dataset com janela triangular.
  Retorna um novo dataset.
  """
  datasetGuard(dataset)
  line = np.linspace(0, 1, wsize)
  w = np.hstack((line, [1.], line[::-1]))
  data = np.array(dataset.data)
  time = np.array(dataset.time)
  n_data = np.zeros((len(data),))
  for i in range(wsize, len(data) - wsize):
    n_data[i] = data[i-wsize:i+1+wsize].dot(w)
  return Dataset(n_data, time)

def subtract_gaussian_like(dataset, center, amplitude, gain):
  """
  Subtrai de um dataset um sinal do tipo gaussiano centrado
  em `center', com amplitude `amplitude' e ganho `gain'.
  """
  datasetGuard(dataset)
  time = np.array(dataset.time)
  signal = amplitude * np.exp( - ((time - center)**2) / gain )
  result = np.array(dataset.data) - signal
  return Dataset(result, time)

def propagate(dataset, points):
  """
  Propaga subtração de gaussianas para cada ponto providenciado em `points'
  """
  datasetGuard(dataset)
  stage = Dataset(dataset.data, dataset.time)
  for p in points:
    stage = subtract_gaussian_like(stage, p['center'], p['amplitude'], p['gain'])
  return stage

def build_regression_matrix (pivot, order):
  """
  Constroi matriz de regressão para predição simétrica
  """
  X = np.ones_like(pivot)
  for i in range(order):
    X = np.hstack((X, pivot ** (i + 1)))
  return X

def simetric_predict (data, order = 2):
  """
  Rotina principal utilizada pela extensão do dataset
  """
  time = np.arange(0, len(data)) * 0.01
  target = np.array(data)
  time.shape = target.shape = (len(data), 1)
  regs = build_regression_matrix(time, order)
  theta = np.linalg.pinv(regs).dot(target)
  pred_time = np.array(time) + (len(data)) * 0.01
  pred_regs = build_regression_matrix(pred_time, order)
  pred_data = pred_regs.dot(theta)
  pred_data.shape = (len(data),)
  return pred_data
  
def extend_dataset (dataset, samples, times=1, order=[0,0]):
  """
  Extende dataset usando predições locais nas extremidades.
  """
  data = np.array(dataset.data)
  time = np.array(dataset.time)
  base_time = np.arange(0, samples)
  lower_time = (time[0] - dataset.dt * (1 + base_time))[::-1]
  upper_time = time[-1] + dataset.dt * (1 + base_time) 
  left_tail = simetric_predict(data[0:samples][::-1], order[0])[::-1]
  right_tail = simetric_predict(data[-samples:], order[1])
  e_data = np.hstack((left_tail, data, right_tail))
  e_time = np.hstack((lower_time, time, upper_time))
  result = Dataset(e_data, e_time)
  print('Initial size', len(data), 'Final size', len(e_data), 'Samples', samples)
  if (times > 1):
    return extend_dataset(result, samples, times-1)
  else:
    return result
