import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var _mysqlPool: mysql.Pool | undefined;
}

function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing environment variable: ${name}`);
  return value;
}

export const db =
  global._mysqlPool ??
  mysql.createPool({
    host: getRequiredEnv("DB_HOST"),
    port: Number(process.env.DB_PORT || 3306),
    user: getRequiredEnv("DB_USER"),
    password: getRequiredEnv("DB_PASSWORD"),
    database: getRequiredEnv("DB_NAME"),
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: "utf8mb4"
  });

if (process.env.NODE_ENV !== "production") {
  global._mysqlPool = db;
}