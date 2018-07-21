import { Model, DocumentQuery, Document, ModelUpdateOptions, Types } from 'mongoose';
import { Writer, Reader } from './interfaces';
import { autoBind } from '../../helpers/binding';

type WithId<T> = { _id?: Types.ObjectId } & T

abstract class MongooseRepository<Custom, Native extends Document> implements Writer<WithId<Custom>>, Reader<WithId<Custom>> {
  private model: Model<Native>

  constructor (model: Model<Native>) {
    this.model = model
    autoBind(this)
  }

  public pipeline (): Pipeline<Native> {
    return new Pipeline(this.model)
  }

  public createInstance (doc: WithId<Custom>): Native {
    return new this.model(doc)
  }

  private __find__ (conditions?: any, projection?: any, options?: any): DocumentQuery<Native[], Native> {
    return this.model.find(conditions, projection, options)
  }

  public $find (conditions?: any, projection?: any, options?: any): Promise<Native[]> {
    return this.__find__(conditions, projection, options).exec()
  }

  public find (conditions?: any, projection?: any, options?: any): Promise<WithId<Custom>[]> {
    return this.__find__(conditions, projection, options).lean().exec()
  }

  private __findOne__ (conditions?: any, projection?: any, options?: any): DocumentQuery<Native, Native> {
    return this.model.findOne(conditions, projection, options)
  }

  public $findOne (conditions?: any, projections?: any, options?: any): Promise<Native> {
    return this.__findOne__(conditions, projections, options).exec()
  }

  public findOne (conditions?: any, projections?: any, options?: any): Promise<WithId<Custom>> {
    return this.__findOne__(conditions, projections, options).lean().exec()
  }

  public delete (conditions: any): Promise<any> {
    return this.model.deleteMany(conditions).exec()
  }

  public deleteOne (conditions: any): Promise<any> {
    return this.model.deleteOne(conditions).exec()
  }

  public create (docs: WithId<Custom>[]): Promise<WithId<Custom>[]> {
    return this.model.create(docs)
      .then(docs => docs.map(doc => <WithId<Custom>>doc.toObject()))
  }

  public $create (docs: WithId<Custom>[]): Promise<Native[]> {
    return this.model.create(docs)
  }

  public createOne (doc: WithId<Custom>): Promise<WithId<Custom>> {
    return this.model.create(doc)
      .then(doc => <WithId<Custom>>doc.toObject())
  }

  public $createOne (doc: WithId<Custom>): Promise<Native> {
    return this.model.create(doc)
  }

  public update (conditions: any, doc: any, options?: ModelUpdateOptions): Promise<any> {
    return this.model.updateMany(conditions, doc, options).exec()
  }

  public updateOne (conditions: any, doc: any, options: ModelUpdateOptions = { new: true }): Promise<any> {
    return this.model.updateOne(conditions, doc, options).exec()
  }
}

class Pipeline<Native extends Document> {
  private model: Model<Native>
  private stages: any[]

  constructor (model: Model<Native>) {
    this.model = model
    this.stages = []
  }

  private __append__ (stage: string, expression: Object | number) {
    this.stages.push({ [stage]: expression })
  }

  public match (expression: Object): this {
    this.__append__('$match', expression)
    return this
  }

  public project (expression: Object): this {
    this.__append__('$project', expression)
    return this
  }

  public group (expression: Object): this {
    this.__append__('$group', expression)
    return this
  }

  public sort (expression: Object): this {
    this.__append__('$sort', expression)
    return this
  }

  public limit (integer: number): this {
    this.__append__('$limit', integer)
    return this
  }

  public execute () {
    return this.model.aggregate(this.stages)
  }

  public build (): Function {
    return this.execute.bind(this)
  }
}

export default MongooseRepository
