from pymongo import MongoClient

DATABASE = 'vidya'
HOSTNAME = 'localhost'
PORT = 27017

print('IMPORT CALLED ****************************')

__client = MongoClient('localhost', 27017)
CONNECTION = __client.vidya