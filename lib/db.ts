import mysql from "mysql2/promise";

declare global {
  // eslint-disable-next-line no-var
  var mysqlPool: mysql.Pool | undefined;
}

function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

export function getDb() {
  if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool({
      host: required("DB_HOST"),
      port: Number(process.env.DB_PORT || 3306),
      user: required("DB_USER"),
      password: required("DB_PASSWORD"),
      database: required("DB_NAME"),
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      charset: "utf8mb4"
    });
  }

  return global.mysqlPool;
}

export const db = {
  query: async (...args: Parameters<mysql.Pool["query"]>) => {
    const pool = getDb();
    return pool.query(...args);
  }
};