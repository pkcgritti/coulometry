from repository.utils import getDataset
from core.utils import dictToDataset
from core.datatypes import Dataset
from core.constants import DEFAULT_EORDER, DEFAULT_EREPTS, DEFAULT_FORDER, DEFAULT_OFFSET, DEFAULT_WORDER
from core.operations import filter_dataset, derivate_dataset, convolute_dataset, subtract_gaussian_like, extend_dataset
from core.estimators import estimate_best_gauss_like
from flask import Flask, Response, request
from json import load, dumps

app = Flask(__name__)

def processDataset (dataset_id):
  try:
    dataset_dict = getDataset(dataset_id)
    points = dataset_dict['results']
    s1 = dictToDataset(dataset_dict)
    s2 = extend_dataset(s1, DEFAULT_EORDER, DEFAULT_EREPTS)
    s3 = filter_dataset(s2, DEFAULT_FORDER)
    s4 = derivate_dataset(s3)
    s5 = convolute_dataset(s4, DEFAULT_WORDER)
    sf = Dataset(s5.data, s5.time)
    for p in points:
      sf = subtract_gaussian_like(sf, p['center'], p['amplitude'], p['gain'])
    data = estimate_best_gauss_like(sf, s1, DEFAULT_OFFSET)
    status = 200
  except:
    data = { 'message': 'Could not find dataset %s' % dataset_id }
    status = 404
  return (data, status)

@app.route('/add_point')
def addPoint():
  if 'id' in request.args:
    dataset_id = request.args['id']
    data, status = processDataset(dataset_id)
  else:
    data = { 'message': 'No dataset_id provided' }
    status = 400
  
  return Response(dumps(data), status = status, mimetype='application/json')

if __name__ == '__main__':
  with open('../config.json') as f:
    config = load(f)
  mscfg = config.get('base', {}).get('microservice', {})
  hostname = mscfg.get('hostname', 'localhost')
  port = mscfg.get('port', 8001)
  app.run(hostname, port, debug=True)
