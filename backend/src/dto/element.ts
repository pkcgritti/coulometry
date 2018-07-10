import { Schema, Types } from 'mongoose';
import { collection, aprop, prop } from '../decorators/mongoose';

@collection('Elements')
class Element {
  @prop({ required: true })
  name: string
  @prop({ required: true })
  molarMass: number
  @prop({ required: true })
  density: number
  @prop({ required: true })
  material: Schema.Types.ObjectId
}

export { Element }