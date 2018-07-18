import { Schema, Types } from 'mongoose';
import { collection, aprop, prop } from '../decorators/mongoose';

@collection('Datasets')
class Dataset {
  @prop({ required: true })
  public name: string;
  @prop({ default: false })
  public processed?: boolean;
  @prop()
  public material?: Schema.Types.ObjectId;
  @prop({ default: Date.now })
  public uploaded?: Date;
  @prop({ default: 0.0 })
  public startTime?: number;
  @prop({ default: 0.1 })
  public samplingInterval?: number;
  @prop({ default: 2.6 })
  public area?: number;
  @prop({ default: 0.023 })
  public current?: number;
  @prop({ default: {} })
  public details?: Schema.Types.Mixed;
  @aprop(Schema.Types.Mixed)
  public results?: Schema.Types.Mixed[];
  @aprop(Number)
  public ignore?: number[];
  @aprop(Number)
  public voltage: number[];
}

export { Dataset };
