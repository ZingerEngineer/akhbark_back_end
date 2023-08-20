"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const followerSchema_1 = __importDefault(require("../schemas/followerSchema"));
const userSchema = new mongoose_1.default.Schema({
    id: String,
    role: String,
    userName: String,
    email: String,
    password: String,
    avatar: String,
    followers: {
        totalNumber: Number,
        followersArray: [followerSchema_1.default]
    },
    posts: {
        totalNumber: Number,
        postsArray: [Post]
    },
    recentActivity: [Activity]
});
const User = mongoose_1.default.model('user', userSchema);
exports.default = User;
