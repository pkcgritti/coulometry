import { Document, Connection } from 'mongoose';
import { Dataset } from '../dto/dataset';
import { buildModel } from '../decorators/mongoose';
import MongooseRepository from './base/mongoose';

export interface IDatasetDocument extends Dataset, Document {};

export class DatasetRepository extends MongooseRepository<Dataset, IDatasetDocument> {
  constructor (conn: Connection) {
    super(buildModel<IDatasetDocument>(conn, Dataset))
  }
};
// export class DatasetController {
//   @get('/', req => [req.body.user])
//   sendDataset () {
//     return 'ae'
//   }

//   @get('/:id', req => [])
// }
