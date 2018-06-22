import * as express from 'express';
import { Application as ExpressApplication } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import './db';
import 'reflect-metadata';
import { prependListener } from 'cluster';
import { CONNREFUSED } from 'dns';
// import Repositories from './repositories'

function defineMethod (method, path, ...args) {
  return function (target: any, propertyName: string) {
    const middlewares = args.splice(0, args.length - 1)
    const extractor = args[0]
    let rules = Reflect.getMetadata('controller:rules', target)

    if (!rules) {
      Reflect.defineMetadata('controller:rules', [], target)
      rules = Reflect.getMetadata('controller:rules', target)
    }

    rules.push({
      method,
      path,
      handler: propertyName,
      middlewares,
      extractor
    })
  }
}

function get (path, ...args) {
  return defineMethod('get', path, ...args)
}

function post (path, ...args) {
  return defineMethod('post', path, ...args)
}

class Controller {
  @get('/', req => [req])
  @get('/another', req => [req])
  doSomething () {

  }

  @post('/')
  doAnotherThing () {

  }
}

console.log(Reflect.getMetadata('controller:rules', Controller.prototype))

const router = express.Router()
  .get('/', (_, res) => res.send('Online'));

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(cors({
    origin: true
  }))
  .use('/', router)
  .listen(8080, function () {
    console.log('Listening on port 8000')
  });

class Application {
  _instance: ExpressApplication
  constructor (middlewares: any[]) {
    this._instance = express()
    middlewares.forEach(middleware => {
      this._instance.use(middleware)
    })
  }

  config () {
    return this._instance
  }

  use (obj) {
    console.log(obj)
    console.log(obj instanceof Controller)
  }
}

const a = new Application([
  bodyParser.json(),
  bodyParser.urlencoded({
    extended: true
  }),
  cors({
    origin: true
  })
])

class Foo extends Controller {
}

a.use(new Foo())

export { app }
