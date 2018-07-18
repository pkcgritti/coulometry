import { Document, Connection } from 'mongoose';
import { Material } from '../dto/material';
import { buildModel } from '../decorators/mongoose';
import MongooseRepository from './base/mongoose';

export interface IMaterialDocument extends Material, Document {}

export class MaterialRepository extends MongooseRepository<Material, IMaterialDocument> {
  constructor (conn: Connection) {
    super(buildModel<IMaterialDocument>(conn, Material));
  }
}
