import 'reflect-metadata';
import { Router } from 'express';

function action (promise, params, onSuccess = 200, info?) {
  return function (req, res, next) {
    const args = params ? params(req, res, next) : [];
    try {
      promise(...args)
        .then((data) => res.sendMessage(onSuccess, data, info))
        .catch(res.sendMessage);
    } catch (err) {
      res.sendMessage(err);
    }
  };
}

interface IRule {
  path?: string;
  method?: string;
  middlewares?: any[];
  handler?: string;
  extractor (req, res, next): any[];
}

export class Controller {
  public buildRouter () {
    const router = Router();
    const keys = Reflect.getMetadataKeys(this) as any;
    if (keys.includes('controller:rules')) {
      const rules: IRule[] = Reflect.getMetadata('controller:rules', this);
      rules.forEach((rule) => {
        const handler = this[rule.handler].bind(this);
        const args = [...rule.middlewares, action(handler, rule.extractor)];
        router[rule.method](rule.path, ...args);
      });
    }
    return router;
  }
}
