"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const mongoose_1 = require("mongoose");
function appendSchemaType(metaKey, propName, propValue, target) {
    let content = Reflect.getMetadata(metaKey, target);
    if (content === undefined)
        content = {};
    content[propName] = propValue;
    Reflect.defineMetadata(metaKey, content, target);
    return content;
}
exports.appendSchemaType = appendSchemaType;
function getSchemaTypes(target) {
    return Reflect.getMetadata('schema:types', target.prototype);
}
exports.getSchemaTypes = getSchemaTypes;
function getSchemaName(target) {
    return Reflect.getMetadata('schema:name', target);
}
exports.getSchemaName = getSchemaName;
function aprop(subtype, options) {
    return function (target, propertyName) {
        const type = Reflect.getMetadata('design:type', target, propertyName);
        if (type.name !== 'Array')
            throw new TypeError('Property must be array');
        const typeSchema = getSchemaTypes(subtype);
        if (typeSchema === undefined) {
            appendSchemaType('schema:types', propertyName, [Object.assign({ type: subtype }, options)], target);
        }
        else {
            appendSchemaType('schema:types', propertyName, [typeSchema], target);
        }
    };
}
exports.aprop = aprop;
function prop(options) {
    return function (target, propertyName) {
        const type = Reflect.getMetadata('design:type', target, propertyName);
        const typeSchema = getSchemaTypes(type);
        if (typeSchema === undefined) {
            appendSchemaType('schema:types', propertyName, Object.assign({ type: type }, options), target);
        }
        else {
            appendSchemaType('schema:types', propertyName, typeSchema, target);
        }
    };
}
exports.prop = prop;
function collection(name) {
    return function (target) {
        Reflect.defineMetadata('schema:name', name, target);
    };
}
exports.collection = collection;
function index(expression) {
    return function (target) {
        Reflect.defineMetadata('schema:index', expression, target);
    };
}
exports.index = index;
function method() {
    return function (target, propertyName, propertyDescriptor) {
        console.log(`${propertyName}: Function`);
    };
}
exports.method = method;
function buildSchema(type) {
    let schemaTypes = getSchemaTypes(type);
    if (!schemaTypes)
        throw new TypeError(`Type ${type.name} does not contain a schema`);
    const schemaInstance = new mongoose_1.Schema(schemaTypes, { versionKey: false });
    return schemaInstance;
}
exports.buildSchema = buildSchema;
function buildModel(connection, type, options) {
    const schemaName = getSchemaName(type);
    if (!schemaName)
        throw new TypeError(`Type ${type.name} does not contain a schema name`);
    const schema = buildSchema(type);
    return connection.model(schemaName, schema);
}
exports.buildModel = buildModel;
//# sourceMappingURL=mongoose.js.map