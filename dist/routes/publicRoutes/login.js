"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// credentials coming in requests --> new user
/* new user = {
userName: 'username',
email: 'email@example.com',
password: '******we246' *bcrypted*
}
- user doesn't have id yet --> new user
- user doesn't have image.
-
*/
// body parser handles request body converts to json.
//
const express_1 = __importDefault(require("express"));
const login = express_1.default.Router();
login.post('/login', (req, res, next) => { });
