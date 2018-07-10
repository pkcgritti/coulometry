import { Schema, Types } from 'mongoose';
import { collection, aprop, prop } from '../decorators/mongoose';

@collection('Materials')
class Material {
  @prop({ required: true })
  name: string
  @aprop(Schema.Types.ObjectId)
  elements: any[]
}

export { Material }