import numpy as np
import matplotlib.pyplot as plt

class Dataset:
  """
  Dataset representation
  """
  def __init__(self, data, time):
    self.data = data
    self.time = time
    self.dt = time[1] - time[0]

  def plot(self):
    plt.plot(self.time, self.data)

  def __len__(self):
    return len(self.data)
