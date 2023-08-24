"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = exports.Post = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Reaction_1 = require("./Reaction");
const Report_1 = require("./Report");
const Comment_1 = require("./Comment");
const postSchema = new mongoose_1.default.Schema({
    id: mongoose_1.default.Types.ObjectId,
    timeCreated: String,
    owner: {
        userName: String,
        userId: mongoose_1.default.Types.ObjectId
    },
    title: String,
    image: String,
    video: String,
    privacy: String,
    reactions: {
        totalNumber: Number,
        ReactionTypes: { type: [Reaction_1.reactionSchema] }
    },
    reportStatus: {
        reportsNumber: Number,
        reportsArray: { type: [Report_1.reportSchema] }
    },
    comments: { type: [Comment_1.commentSchema] }
});
exports.postSchema = postSchema;
const Post = mongoose_1.default.model('posts', postSchema);
exports.Post = Post;
