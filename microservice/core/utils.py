from core.datatypes import Dataset
import numpy as np

def datasetGuard (dataset_obj):
  """
  Testa se o objeto é uma instância de dataset.
  Lança TypeError caso não seja.
  """
  if not isinstance(dataset_obj, Dataset):
    raise TypeError('dataset_obj type is not instance of Dataset')

def dictToDataset(dataset_dict):
  """
  Transforma um dict response em um Dataset
  """
  voltage = dataset_dict['voltage']
  time = np.arange(0, len(voltage)) * dataset_dict['samplingInterval'] + dataset_dict['startTime']
  return Dataset(voltage, time)
