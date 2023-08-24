"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOneUserByEmail = exports.createUser = void 0;
const User_1 = require("../models/User");
const createUser = (data) => {
    const user = new User_1.User(data);
    return user.save();
};
exports.createUser = createUser;
const findOneUserByEmail = (email) => {
    const user = User_1.User.findOne({ email });
    return user;
};
exports.findOneUserByEmail = findOneUserByEmail;
