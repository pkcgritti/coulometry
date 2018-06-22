"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binding_1 = require("../../helpers/binding");
class MongooseRepository {
    constructor(model) {
        this.model = model;
        binding_1.autoBind(this);
    }
    pipeline() {
        return new Pipeline(this.model);
    }
    createInstance(doc) {
        return new this.model(doc);
    }
    __find__(conditions, projection, options) {
        return this.model.find(conditions, projection, options);
    }
    $find(conditions, projection, options) {
        return this.__find__(conditions, projection, options).exec();
    }
    find(conditions, projection, options) {
        return this.__find__(conditions, projection, options).lean().exec();
    }
    __findOne__(conditions, projection, options) {
        return this.model.findOne(conditions, projection, options);
    }
    $findOne(conditions, projections, options) {
        return this.__findOne__(conditions, projections, options).exec();
    }
    findOne(conditions, projections, options) {
        return this.__findOne__(conditions, projections, options).lean().exec();
    }
    delete(conditions) {
        return this.model.deleteMany(conditions).exec();
    }
    deleteOne(conditions) {
        return this.model.deleteOne(conditions).exec();
    }
    create(docs) {
        return this.model.create(docs)
            .then(docs => docs.map(doc => doc.toObject()));
    }
    $create(docs) {
        return this.model.create(docs);
    }
    createOne(doc) {
        return this.model.create(doc)
            .then(doc => doc.toObject());
    }
    $createOne(doc) {
        return this.model.create(doc);
    }
    update(conditions, doc, options) {
        return this.model.updateMany(conditions, doc, options).exec();
    }
    updateOne(conditions, doc, options = { new: true }) {
        return this.model.updateOne(conditions, doc, options).exec();
    }
}
class Pipeline {
    constructor(model) {
        this.model = model;
        this.stages = [];
    }
    __append__(stage, expression) {
        this.stages.push({ [stage]: expression });
    }
    match(expression) {
        this.__append__('$match', expression);
        return this;
    }
    project(expression) {
        this.__append__('$project', expression);
        return this;
    }
    group(expression) {
        this.__append__('$group', expression);
        return this;
    }
    sort(expression) {
        this.__append__('$sort', expression);
        return this;
    }
    limit(integer) {
        this.__append__('$limit', integer);
        return this;
    }
    execute() {
        return this.model.aggregate(this.stages);
    }
    build() {
        return this.execute.bind(this);
    }
}
exports.default = MongooseRepository;
//# sourceMappingURL=mongoose.js.map