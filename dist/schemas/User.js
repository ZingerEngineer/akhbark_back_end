"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterSchema = exports.userLoginSchema = void 0;
const yup_1 = require("yup");
exports.userLoginSchema = (0, yup_1.object)({
    email: (0, yup_1.string)().email().required('email is required.'),
    password: (0, yup_1.string)().required('password is required.')
});
exports.userRegisterSchema = (0, yup_1.object)({
    userName: (0, yup_1.string)().required(),
    email: (0, yup_1.string)().email().required('email is required.'),
    password: (0, yup_1.string)().min(8).max(15).required('password is required.')
});
