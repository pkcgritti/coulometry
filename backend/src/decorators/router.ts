function defineMethod (method, path, ...args) {
  return function (target: any, propertyName: string) {
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
  }
}

export function GET (path, ...args) {
  return defineMethod('get', path, ...args);
};

export function POST (path, ...args) {
  return defineMethod('post', path, ...args);
};

export function PUT (path, ...args) {
  return defineMethod('put', path, ...args);
};

// tslint:disable-next-line
export function DELETE (path, ...args) {
  return defineMethod('delete', path, ...args);
};