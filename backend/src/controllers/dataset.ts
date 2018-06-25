import { GET, POST, DELETE } from '../decorators/router';
import { Controller } from './base/controller';
import Repositories from '../repositories';
import { Types } from 'mongoose';

export class DatasetController extends Controller {
  @GET('/')
  listDatasets () {
    return Repositories.Dataset.find({}, {
      name: 1,
      processed: 1,
      material: 1,
      uploaded: 1
    });
  }

  @GET('/:id', req => [req.params.id])
  getDataset (id) {
    return Repositories.Dataset.findOne({
      _id: Types.ObjectId(id)
    })
  }

  @POST('/', req => [req.body])
  createDataset (dataset) {
    return Repositories.Dataset.createOne(dataset)
  }

  @DELETE('/:id', req => [req.params.id])
  deleteDataset (id) {
    return Repositories.Dataset.deleteOne({
      _id: Types.ObjectId(id)
    });
  }
};