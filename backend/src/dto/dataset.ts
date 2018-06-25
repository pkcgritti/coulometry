import { Schema, Types } from 'mongoose';
import { collection, aprop, prop } from '../decorators/mongoose';

@collection('Datasets')
class Dataset {
  @prop({ required: true })
  name: string
  @prop({ default: false })
  processed?: boolean
  @prop()
  material?: Schema.Types.ObjectId
  @prop({ default: Date.now })
  uploaded?: Date
  @prop({ default: 0.1 })
  samplingInterval?: Number
  @prop({ default: 0.023 })
  current?: Number
  @prop({ default: {} })
  details?: Schema.Types.Mixed
  @aprop(Number)
  results?: Number[]
  @aprop(Number)
  voltage: Number[]
}

export { Dataset }
