"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    id: String,
    role: String,
    userName: String,
    email: String,
    password: String,
    avatar: String,
    followers: {
        totalNumber: Number,
        followersArray: Follower[]
    },
    posts: {
        totalNumber: Number,
        postsArray: Post[]
    },
    recentActivity: Activity[]
});
