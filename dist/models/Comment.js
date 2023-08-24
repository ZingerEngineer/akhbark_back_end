"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    id: mongoose_1.default.Types.ObjectId,
    timeCreated: String,
    owner: {
        userName: String,
        userId: mongoose_1.default.Types.ObjectId
    },
    commentedToEntity: {
        entityId: mongoose_1.default.Types.ObjectId
    },
    text: { required: false, type: String },
    image: { required: false, type: String },
    video: { required: false, type: String },
    audio: { required: false, type: String }
});
exports.commentSchema = commentSchema;
const Comment = mongoose_1.default.model('comments', commentSchema);
exports.Comment = Comment;
