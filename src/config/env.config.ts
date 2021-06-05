import env from "dotenv";

env.config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const serverPort = String(process.env.PORT || '');
const dbName = String(process.env.DB_NAME || '');
const dbUserName = String(process.env.DB_USERNAME || '');
const dbPassword = String(process.env.DB_PASSWORD || '');
const dbHost = String(process.env.DB_HOST || '');
const dbConnection = String(process.env.DB_CONNECTION || '');
const dbPort = Number(String(process.env.DB_PORT || '0'));
const jwtSecret = String(process.env.JWT_SECRET);
const jwtAccessExpirationMinutes = String(process.env.JWT_ACCESS_EXPIRATION_MINUTES);
const accessServerToken = String(process.env.ACCESS_SERVER_TOKEN);

export const dbConfig = {
  dbName,
  dbUserName,
  dbPassword,
  dbHost,
  dbConnection,
  dbPort,
};

export const environmentKeys = {
  serverPort,
  dbName,
  dbUserName,
  dbPassword,
  dbHost,
  dbConnection,
  dbPort,
  jwtSecret,
  jwtAccessExpirationMinutes,
  accessServerToken,
};
