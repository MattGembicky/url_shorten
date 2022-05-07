"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const dbInit_1 = __importDefault(require("./dbInit"));
let connectionTries = 0;
function dbConnection() {
    dbInit_1.default.connect((err) => {
        if (err) {
            console.log("Connection with database was not established:", err);
            if (connectionTries < 3) {
                connectionTries += 1;
                setTimeout(dbConnection, 7000);
            }
            else {
                console.log("client cann't connect");
            }
            return;
        }
        connectionTries = 0;
        console.log("Connection with database was established");
    });
    dbInit_1.default.on("error", (err) => {
        console.log("Database error", err);
        if (err.code == "PROTOCOL_CONNECTION_LOST") {
            console.log("Connection with database was lost");
            dbConnection();
        }
    });
}
exports.dbConnection = dbConnection;
