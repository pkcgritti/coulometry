import { DatasetRepository } from './dataset';
import connection from '../db'

export default {
  Dataset: new DatasetRepository(connection)
}
