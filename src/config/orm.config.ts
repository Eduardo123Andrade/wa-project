import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import { dbConfig } from "./env.config";


export const ormConfig = {
  database: dbConfig.dbName,
  username: dbConfig.dbUserName,
  password: dbConfig.dbPassword,
  host: dbConfig.dbHost,
  type: dbConfig.dbConnection,
  port: dbConfig.dbPort,
  entities: ["./src/models/**/*.model.ts"],
  migrations: ["./src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "./src/database/migrations",
    entitiesDir: "./src/models",
  },
  namingStrategy: new SnakeNamingStrategy(),
};