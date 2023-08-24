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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegister = exports.userLogin = void 0;
const user_1 = require("../daos/user");
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const bcrypt_2 = require("bcrypt");
const userLogin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.findOneUserByEmail)(email);
    if (!user)
        throw new Error('User not found.');
    const passwordCheck = yield (0, bcrypt_1.compare)(password, user.password);
    if (!passwordCheck)
        throw new Error("Password doesn't match");
    const { id, userName, role } = user;
    const payload = { id, userName, email, role };
    const secret = process.env.PRIVATE_KEY;
    if (!secret)
        throw new Error('Error occured.');
    const token = (0, jsonwebtoken_1.sign)(payload, secret);
    const userData = user;
    return { userData, token };
});
exports.userLogin = userLogin;
const userRegister = (email, password, userName) => __awaiter(void 0, void 0, void 0, function* () {
    const hashedPassword = yield (0, bcrypt_2.hash)(password, 10);
    (0, user_1.createUser)({
        userName,
        email,
        password: hashedPassword
    });
});
exports.userRegister = userRegister;
