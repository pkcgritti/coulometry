import { DatasetRepository } from './dataset';
import { MaterialRepository } from './material';
import { ElementRepository } from './element';
import connection from '../db'

export default {
  Dataset: new DatasetRepository(connection),
  Material: new MaterialRepository(connection),
  Element: new ElementRepository(connection)
}
