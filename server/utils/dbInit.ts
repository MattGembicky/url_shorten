import mysql from "mysql2";

export const db = mysql.createPool({
  host: "mysql_db",
  user: "MYSQL_USER",
  password: "MYSQL_PASSWORD",
  database: "url_shortener",
});

export default db;