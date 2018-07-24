import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
import config from './config';
import messager from './middlewares/messager';
import './db';
import Controllers from './controllers';
import * as path from 'path';

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use(fileUpload())
  .use(cors({
    origin: true,
  }))
  .use(messager())
  .use('/dataset', Controllers.Dataset.buildRouter())
  .use('/material', Controllers.Material.buildRouter())
  .use(express.static(path.resolve(__dirname, '../public')))
  .listen(config.express.port, function () {
    console.log('Listening on port ' + config.express.port);
  });

export { app };
