"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.followerSchema = exports.Follower = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const followerSchema = new mongoose_1.default.Schema({
    id: mongoose_1.default.Types.ObjectId,
    userName: String,
    avatar: String
});
exports.followerSchema = followerSchema;
const Follower = mongoose_1.default.model('user', followerSchema);
exports.Follower = Follower;
