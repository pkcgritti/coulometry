import * as express from 'express';
import { Application as ExpressApplication } from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
import messager from './middlewares/messager';
import './db';
import Repositories from './repositories'
import Controllers from './controllers';

const router = express.Router()
  .get('/', (_, res) => res.send('Online'));

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(fileUpload())
  .use(cors({
    origin: true
  }))
  .use(messager())
  .use('/dataset', Controllers.Dataset.buildRouter())
  .use('/', router)
  .listen(8000, function () {
    console.log('Listening on port 8000')
  });

export { app }
