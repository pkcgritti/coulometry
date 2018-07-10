import matplotlib.pyplot as plt
import numpy as np
import time
from repository.utils import getDataset
from core.utils import dictToDataset
from core.datatypes import Dataset
from core.operations import filter_dataset, convolute_dataset, derivate_dataset, subtract_gaussian_like, propagate, extend_dataset
from core.estimators import estimate_best_gauss_like
import core.constants as CT

DATASET_ID = ['5b43d07bd595ec0a611c8cba', '5b42cf5fb1020409d3dea488', '5b436e23d595ec0a611c8caf'][0]
dataset_dict = getDataset(DATASET_ID)

s1 = dictToDataset(dataset_dict)
points = [
]

start = time.time()
s2 = extend_dataset(s1, CT.DEFAULT_EORDER, CT.DEFAULT_EREPTS)
s3 = filter_dataset(s2, CT.DEFAULT_FORDER)
s4 = derivate_dataset(s3)
s5 = convolute_dataset(s4, CT.DEFAULT_WORDER)
s6 = propagate(s5, points)
for i in range(3):
  next_point = estimate_best_gauss_like(s6, s1, CT.DEFAULT_OFFSET)
  # plt.figure()
  # plt.plot(s4.time, s4.data * 10)
  # s6.plot()
  # plt.plot(s6.time, next_point['amplitude'] * np.exp( - ((s6.time - next_point['center']) ** 2) / next_point['gain'] ))
  points.append(next_point)
  s6 = propagate(s5, points)
duration = time.time() - start
print(points)
print(len(s1.data), len(s6.data))
print('Elapsed time is %.6f milliseconds' % (duration * 1000))

# plt.plot(s6.time[CT.DEFAULT_OFFSET:-CT.DEFAULT_OFFSET], s6.data[CT.DEFAULT_OFFSET:-CT.DEFAULT_OFFSET])


plt.figure()
s1.plot()
for p in points:
  plt.plot(p['center'], p['reference'], 'k.')
plt.show()



