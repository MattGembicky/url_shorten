"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
const INFO = {
    user: "root",
    host: "localhost",
    password: "password",
    database: "url_shortener",
};
const db = mysql_1.default.createConnection(process.env.CLEARDB_DATABASE_URL || INFO);
exports.default = db;
