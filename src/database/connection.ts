import { Connection, createConnection } from "typeorm";
import { ormConfig } from "../config/";

const selectORMConnectionType = (type: string) => {
  const object: any = {
    mysql: "mysql",
    mariadb: "mariadb",
    postgres: "postgres",
    cockroachdb: "cockroachdb",
    sqlite: "sqlite",
    mssql: "mssql",
    sap: "sap",
    oracle: "oracle",
    cordova: "cordova",
    nativescript: "nativescript",
    sqljs: "sqljs",
    mongodb: "mongodb",
    expo: "expo",
    // react-native: "",
    // aurora-data-api: "",
    // aurora-data-api-pg: "",
    // better-sqlite3: "",
  };

  return object[type] ?? "mysql";
};

export default async (): Promise<Connection> => {
  return createConnection({
    type: selectORMConnectionType(ormConfig.type),
    host: ormConfig.host,
    port: ormConfig.port,
    username: ormConfig.username,
    password: ormConfig.password,
    database: ormConfig.database,
    entities: ormConfig.entities,
    migrations: ormConfig.migrations,
    cli: {
      entitiesDir: ormConfig.cli.entitiesDir,
      migrationsDir: ormConfig.cli.migrationsDir
    },
    namingStrategy: ormConfig.namingStrategy
  })
}

