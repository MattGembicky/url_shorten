import mysql, { ConnectionConfig } from "mysql";
const INFO: ConnectionConfig = {
  user: "root",
  host: "localhost",
  password: "password",
  database: "url_shortener",
};

const db = mysql.createConnection(process.env!.CLEARDB_DATABASE_URL || INFO);

export default db;
