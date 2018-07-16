"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = require("express");
function action(promise, params, onSuccess = 200, info) {
    return function (req, res, next) {
        const args = params ? params(req, res, next) : [];
        try {
            promise(...args)
                .then((data) => res.sendMessage(onSuccess, data, info))
                .catch(res.sendMessage);
        }
        catch (err) {
            res.sendMessage(err);
        }
    };
}
class Controller {
    buildRouter() {
        const router = express_1.Router();
        const keys = Reflect.getMetadataKeys(this);
        if (keys.includes('controller:rules')) {
            const rules = Reflect.getMetadata('controller:rules', this);
            console.log(rules);
            rules.forEach((rule) => {
                const handler = this[rule.handler].bind(this);
                const args = [...rule.middlewares, action(handler, rule.extractor)];
                router[rule.method](rule.path, ...args);
            });
        }
        return router;
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map