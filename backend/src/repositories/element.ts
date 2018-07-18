import { Document, Connection } from 'mongoose';
import { Element } from '../dto/element';
import { buildModel } from '../decorators/mongoose';
import MongooseRepository from './base/mongoose';

export interface IElementDocument extends Element, Document {}

export class ElementRepository extends MongooseRepository<Element, IElementDocument> {
  constructor (conn: Connection) {
    super(buildModel<IElementDocument>(conn, Element));
  }
}
