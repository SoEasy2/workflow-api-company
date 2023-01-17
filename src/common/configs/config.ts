import type { Config } from './config.interface';
import { Dialect } from 'sequelize';

const config: Config = {
  graphql: {
    playgroundEnabled: true,
    debug: true,
    schemaDestination: './src/schema.graphql',
    sortSchema: true,
  },
  database: {
    dialect: 'postgres' as Dialect,
    host: process.env.DATABASE_HOST,
    port: +process.env.DATABASE_PORT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    logging: true,
  },
};

export default (): Config => config;
