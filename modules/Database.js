"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFullUrl = exports.shorten = void 0;
const dbInit_1 = __importDefault(require("../utils/dbInit"));
const md5_1 = __importDefault(require("md5"));
//charset
const charset_json_1 = __importDefault(require("./charset.json"));
const CHARSET = charset_json_1.default.charset;
function getNewEnding(characters) {
    // handle all nines
    const nines = characters.reduce((count, v) => (v === CHARSET[CHARSET.length - 1] ? count + 1 : count), 0);
    if (nines === characters.length) {
        return Array(characters.length + 1).fill(CHARSET[0]);
    }
    // add
    let result = [...characters];
    for (let i = characters.length - 1; i >= 0; i--) {
        if (result[i] === CHARSET[CHARSET.length - 1]) {
            result[i] = CHARSET[0];
            continue;
        }
        result[i] = CHARSET[CHARSET.indexOf(result[i]) + 1];
        break;
    }
    return result;
}
function createShortUrl(url, callback) {
    const EXISTENCEQUERY = "SELECT * FROM Urls WHERE short LIKE ?% ORDER BY date_added DESC";
    let short = (0, md5_1.default)(url).slice(-7);
    dbInit_1.default.query(EXISTENCEQUERY, short, (err, res) => {
        console.log(short, res);
        if (err) {
            console.log(err);
            return callback(undefined);
        }
        if (res.length === 0) {
            return callback(short);
        }
        // it may happen but very ulikely
        const end = res[0].short.slice(7).split("");
        return short + getNewEnding(end);
    });
}
const shorten = (url, callback) => {
    const EXISTENCEQUERY = "SELECT * FROM Urls WHERE short% LIKE ?";
    const hash = (0, md5_1.default)(url).slice(-7);
    dbInit_1.default.query(EXISTENCEQUERY, hash, (err, res) => {
        console.log(res);
        if (err) {
            console.log(err);
            return callback(undefined);
        }
        if (res.length > 0) {
            if (res.length === 1) {
                return callback(res[0].short);
            }
            res.forEach((record) => {
                if (record.url === url) {
                    return callback(record.short);
                }
            });
        }
        createShortUrl(url, (short) => {
            const INSERTATIONQUERY = "INSERT INTO Urls(url, short) VALUES (?, ?)";
            dbInit_1.default.query(INSERTATIONQUERY, [url, short], (err) => {
                if (err) {
                    console.log(err);
                    return callback(undefined);
                }
                if (short.length > 16) {
                    return callback(null);
                }
            });
            return callback(short);
        });
    });
};
exports.shorten = shorten;
const getFullUrl = (url, callback) => {
    const EXISTENCEQUERY = "SELECT * FROM Urls WHERE short LIKE ?";
    dbInit_1.default.query(EXISTENCEQUERY, url, (err, res) => {
        if (err) {
            console.log(err);
            return callback(undefined);
        }
        if (res.length !== 0) {
            return callback(res[0].url);
        }
        return callback(null);
    });
};
exports.getFullUrl = getFullUrl;
