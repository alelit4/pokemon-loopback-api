import * as dotenv from 'dotenv';

dotenv.config();

export const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: '',
  host: process.env.MONGO_DB_HOST,
  port: process.env.MONGO_DB_PORT,
  user: process.env.MONGO_DB_USERNAME,
  password: process.env.MONGO_DB_PASSWORD,
  database: process.env.MONGO_INITDB_DATABASE,
  useNewUrlParser: true,
};