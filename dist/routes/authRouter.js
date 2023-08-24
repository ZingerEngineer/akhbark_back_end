"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const User_1 = require("../schemas/User");
const authRouter = express_1.default.Router();
exports.authRouter = authRouter;
authRouter.post('/login', User_1.userLoginSchema.validate({ user }), auth_controller_1.login);
authRouter.post('/register', validateRegisterInput, auth_controller_1.register);
