"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullUrl = exports.shorten = void 0;
const dbInit_1 = __importDefault(require("../utils/dbInit"));
const md5_1 = __importDefault(require("md5"));
function getShortUrl(url, callback) {
    const existenceQuery = "SELECT * FROM Urls WHERE short LIKE ?";
    let short = (0, md5_1.default)(url).slice(-7);
    dbInit_1.default.query(existenceQuery, short, (err, res) => {
        console.log(short, res);
        if (err) {
            console.log(err);
            return undefined;
        }
        if (res.length === 0) {
            return callback(short);
        }
        // todo
    });
}
const shorten = (url, callback) => {
    const existenceQuery = "SELECT * FROM Urls WHERE url LIKE ?";
    const insertationQuery = "INSERT INTO Urls(url, short) VALUES (?, ?)";
    dbInit_1.default.query(existenceQuery, url, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        if (res.length !== 0) {
            return callback(res[0].short);
        }
        getShortUrl(url, (short) => {
            dbInit_1.default.query(insertationQuery, [url, short], (err) => {
                if (err) {
                    console.log(err);
                }
            });
            return callback(short);
        });
    });
};
exports.shorten = shorten;
const getFullUrl = (url, callback) => {
    const existenceQuery = "SELECT * FROM Urls WHERE short LIKE ?";
    dbInit_1.default.query(existenceQuery, url, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        if (res.length !== 0) {
            return callback(res[0].url);
        }
        // todo
    });
};
exports.getFullUrl = getFullUrl;
