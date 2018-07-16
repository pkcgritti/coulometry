import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as fileUpload from 'express-fileupload';
import config from './config';
import messager from './middlewares/messager';
import './db';
import Controllers from './controllers';

const router = express.Router()
  .get('/', (_, res) => res.send('Online'));

const app = express()
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({
    extended: true,
  }))
  .use(fileUpload())
  .use(cors({
    origin: true,
  }))
  .use(express.static('public'))
  .use(messager())
  .use('/dataset', Controllers.Dataset.buildRouter())
  .use('/material', Controllers.Material.buildRouter())
  .use('/', router)
  .listen(config.express.port, function () {
    console.log('Listening on port ' + config.express.port);
  });

export { app };
