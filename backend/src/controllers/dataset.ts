import { GET, POST, DELETE, PUT } from '../decorators/router';
import { Controller } from './base/controller';
import Repositories from '../repositories';
import Services from '../services';
import axios from 'axios';
import { Types } from 'mongoose';
import config from '../config';

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

  // Change to PUT
  @GET('/:id/addpoint', req => [req.params.id])
  addPoint (id) {
    const hostname = config.microservice.hostname
    const port = config.microservice.port
    const uri = `http://${hostname}:${port}/add_point?id=${id}`
    return axios.get(uri)
      .then(response => {
        return Repositories.Dataset.updateOne({
          _id: Types.ObjectId(id)
        }, {
          $push: {
            results: response.data
          }
        }).then(() => {
          return response.data
        })
      })
      .catch(error => {
        console.log('Error', error.response.data)
        return {}
      })
  }

  @GET('/:id/removepoint', req => [req.params.id])
  removePoint (id) {
    return Repositories.Dataset.updateOne({
      _id: Types.ObjectId(id)
    }, {
      $pop: {
        results: 1
      }
    })
  }

  @GET('/:id/togglepoint/:index', req => [req.params.id, req.params.index])
  togglePoint (id, index) {
    const query = { _id: Types.ObjectId(id) }
    const number = Number.parseInt(index)
    return Repositories.Dataset.findOne(query)
      .then(dataset => {
        let ignore = dataset.ignore
        if (dataset.ignore.indexOf(number) > -1) {
          ignore = dataset.ignore.filter(x => x !== number)
        } else {
          ignore.push(number)
        }
        return Repositories.Dataset.updateOne(query, { $set: { ignore } })
      })
  }

  @POST('/', req => [req.body])
  createDataset (dataset) {
    return Repositories.Dataset.createOne(dataset)
  }

  @PUT('/:id', req => [req.params.id, req.body])
  updateDataset (did, dataset) {
    if (!dataset) throw 400;
    return Repositories.Dataset.updateOne({ _id: Types.ObjectId(did) }, {
      $set: dataset
    });
  }

  @DELETE('/:id', req => [req.params.id])
  deleteDataset (id) {
    return Repositories.Dataset.deleteOne({
      _id: Types.ObjectId(id)
    });
  }

  @POST('/:id/broadcast', req => [req.params.id, req.body.results])
  broadcastResults (id, results) {
    return Repositories.Dataset.findOne({
      _id: Types.ObjectId(id)
    }).then(dataset => {
      if (!dataset) throw 400;
      console.log('Sending email')
    })
  }
};