import * as fs from 'fs'
import * as path from 'path'

const configFile = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../../../config.json')).toString())
const baseConfig = Object.assign({},
  configFile.base,
  process.env.NODE_ENV === 'production'
    ? configFile.production
    : configFile.development
)

interface IMongoConfig {
  hostname: string
  database: string 
}

interface IExpressConfig {
  hostname: string
  port: number
  rest_url: string
}

interface IMicroserviceConfig {
  hostname: string
  port: number
}

interface IConfigFile {
  mongodb: IMongoConfig
  express: IExpressConfig
  microservice: IMicroserviceConfig
}

export default <IConfigFile> baseConfig
