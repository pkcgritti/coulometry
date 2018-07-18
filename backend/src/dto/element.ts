import { Schema, Types } from 'mongoose';
import { collection, aprop, prop } from '../decorators/mongoose';

@collection('Elements')
class Element {
  @prop({ required: true })
  public name: string;
  @prop({ required: true })
  public molarMass: number;
  @prop({ required: true })
  public density: number;
  @prop({ required: true })
  public meanPotential: number;
  @prop({ required: true })
  public nEletrons: number;
  @prop({ required: true })
  public iteractive: boolean;
  @prop({ required: true, ref: 'Materials' })
  public material: Schema.Types.ObjectId;
}

export { Element };
