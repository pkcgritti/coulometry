import { collection, aprop, prop } from '../decorators/mongoose'

@collection('Datasets')
class Dataset {
  @prop({ required: true })
  name: string
  @prop({ required: true })
  path: string
  @prop({ default: false })
  processed?: boolean
  @prop({ default: Date.now() })
  uploaded?: Date
}

export { Dataset }
