import { Schema, Types } from 'mongoose';
import { collection, aprop, prop } from '../decorators/mongoose';

@collection('Materials')
class Material {
  @prop({ required: true })
  public name: string;
  @aprop(Schema.Types.ObjectId)
  public elements: any[];
}

export { Material };
