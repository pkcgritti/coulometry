"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function defineMethod(method, path, ...args) {
    return function (target, propertyName) {
        const middlewares = args.splice(0, args.length - 1);
        const extractor = args[0];
        let rules = Reflect.getMetadata('controller:rules', target);
        if (!rules) {
            Reflect.defineMetadata('controller:rules', [], target);
            rules = Reflect.getMetadata('controller:rules', target);
        }
        rules.push({
            method,
            path,
            handler: propertyName,
            middlewares,
            extractor
        });
    };
}
function GET(path, ...args) {
    return defineMethod('get', path, ...args);
}
exports.GET = GET;
;
function POST(path, ...args) {
    return defineMethod('post', path, ...args);
}
exports.POST = POST;
;
function PUT(path, ...args) {
    return defineMethod('put', path, ...args);
}
exports.PUT = PUT;
;
// tslint:disable-next-line
function DELETE(path, ...args) {
    return defineMethod('delete', path, ...args);
}
exports.DELETE = DELETE;
;
//# sourceMappingURL=router.js.map