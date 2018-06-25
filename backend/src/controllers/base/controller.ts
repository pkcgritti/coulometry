import 'reflect-metadata';
import { Router } from 'express';

function action (promise, params, onSuccess = 200, info = undefined) {
  return function (req, res, next) {
    let args = params ? params(req, res, next) : [];
    try {
      promise(...args)
        .then(data => res.sendMessage(onSuccess, data, info))
        .catch(res.sendMessage);
    } catch (err) {
      res.sendMessage(err);
    }
  }
}

interface Rule {
  path?: string
  method?: string
  middlewares?: any[]
  handler?: string
  extractor (req, res, next): any[]
}

export class Controller {
  buildRouter () {
    const router = Router();
    const keys = <any> Reflect.getMetadataKeys(this);
    if (keys.includes('controller:rules')) {
      const rules: Rule[] = Reflect.getMetadata('controller:rules', this);
      console.log(rules);
      rules.forEach(rule => {
        const handler = this[rule.handler].bind(this);
        const args = [...rule.middlewares, action(handler, rule.extractor)];
        router[rule.method](rule.path, ...args);
      })
    }
    return router;
  }
}