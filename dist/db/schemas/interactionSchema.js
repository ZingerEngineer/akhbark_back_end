"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema_1 = __importDefault(require("./userSchema"));
const postSchema = new mongoose_1.default.Schema({
    owner: userSchema_1.default,
    id: String,
    title: String,
    image: String,
    video: String,
    privacy: String,
    interactions: {
        totalNumber: Number,
        interactionTypes: [Interaction]
    },
    reportStatus: {
        reportsNumber: Number,
        reportsArray: [Report]
    },
    comments: [Comment]
});
const Post = mongoose_1.default.model('user', postSchema);
exports.default = Post;
