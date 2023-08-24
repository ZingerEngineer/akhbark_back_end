"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("./mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const bodyParser = require("body-parser");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
(0, mongoose_1.default)();
app.use(bodyParser.json());
app.get('/', (req, res, next) => {
    res.send('Express + TypeScript Server');
    console.log('Hey from app');
    console.log(req.body);
    next();
});
app.post('/post', (req, res, next) => {
    req.body = { name: 'kosomok' };
    res.send(req.body);
    next();
});
app.get('/user', (req, res, next) => {
    console.log('Hey from app/users');
    next();
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    // dbConnection()
});
