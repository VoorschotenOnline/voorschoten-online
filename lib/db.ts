import mysql from "mysql2/promise";

declare global {
  var mysqlPool: mysql.Pool | undefined;
}

function hasDbConfig() {
  return (
    process.env.DB_HOST &&
    process.env.DB_NAME &&
    process.env.DB_USER &&
    process.env.DB_PASSWORD
  );
}

export function getDb() {
  if (!hasDbConfig()) {
    throw new Error("Database niet geconfigureerd");
  }

  if (!global.mysqlPool) {
    global.mysqlPool = mysql.createPool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 3306),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 5,
      charset: "utf8mb4"
    });
  }

  return global.mysqlPool;
}

export const db = {
  query: async (...args: any[]) => {
    const pool = getDb();
    return pool.query(...args);
  }
};