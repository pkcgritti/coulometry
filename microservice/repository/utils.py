"""
Utilities to fetch data from typescript server
"""
from json import loads
from urllib.request import urlopen

BASE_URL = 'http://localhost:8091/'

def get (api_url):
  """
  Send GET request to server 
  """
  try:
    response = urlopen(BASE_URL + api_url).read()
    return response
  except:
    print('Could not retrieve data')
    return b'{}'

def listDatasets ():
  """
  List datasets on the server
  """
  response = get('dataset')
  return loads(response.decode('utf-8'))['payload']

def getDataset (dataset_id):
  """
  Get dataset by ID
  """
  response = get('dataset/%s' % dataset_id)
  return loads(response.decode('utf-8'))['payload']

if __name__ == '__main__':
  datasets = getDataset('5b422dd0e670081e58731c0f')
  print(datasets['voltage'])