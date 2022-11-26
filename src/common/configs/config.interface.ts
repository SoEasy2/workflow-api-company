import { Dialect } from 'sequelize';

export interface Config {
  graphql: GraphqlConfig;
  database: DatabaseConfig;
}
export interface GraphqlConfig {
  playgroundEnabled: boolean;
  debug: boolean;
  schemaDestination: string;
  sortSchema: boolean;
}
export interface DatabaseConfig {
  dialect: Dialect;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  logging: boolean;
}
