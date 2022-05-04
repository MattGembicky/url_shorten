"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const app = (0, express_1.default)();
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils/utils");
const Database_1 = require("./modules/Database");
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server running on port:", PORT);
    (0, utils_1.dbConnection)();
});
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
}));
app.post("/shorten", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = req.body.fullUrl;
    try {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            url = "https://" + url;
        }
        yield (0, axios_1.default)(url);
    }
    catch (e) {
        console.log(e);
        res.send({ valid: false, errorNumber: 200 });
        return undefined;
    }
    (0, Database_1.shorten)(url, (result) => {
        console.log(result);
        // database error
        if (result !== undefined) {
            // validation error
            if (result !== null) {
                res.send({ valid: true, short: result });
            }
            else {
                res.send({ valid: false, errorNumber: 202 });
            }
        }
        else {
            res.send({ valid: false, errorNumber: 100 });
        }
        return undefined;
    });
}));
app.post("/redirect", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let url = req.body.shortUrl;
    (0, Database_1.getFullUrl)(url, (result) => {
        if (result !== undefined) {
            if (result !== null) {
                res.send({ found: true, fullUrl: result });
            }
            else {
                res.send({ found: false, errorNumber: 201 });
            }
        }
        else {
            res.send({ found: false, errorNumber: 100 });
        }
        return;
    });
}));
