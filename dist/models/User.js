"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Follower_1 = require("./Follower");
const Post_1 = require("./Post");
const Activity_1 = require("./Activity");
const Report_1 = require("./Report");
const Comment_1 = require("./Comment");
const Reaction_1 = require("./Reaction");
const userSchema = new mongoose_1.default.Schema({
    id: mongoose_1.default.Types.ObjectId,
    timeCreated: { type: String, default: new Date(Date.now()).toString() },
    role: { type: String, default: 'user' },
    token: { type: String, default: '' },
    userName: { type: String, default: 'guest' },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, default: 'default_user_url' },
    followers: {
        type: Object,
        totalNumber: { type: Number, default: 0 },
        followersArray: { type: [Follower_1.followerSchema], default: [] }
    },
    posts: {
        type: Object,
        totalNumber: { type: Number, default: 0 },
        postsArray: { type: [Post_1.postSchema], default: [] }
    },
    recentActivity: { type: [Activity_1.activitySchema], default: [] },
    reports: { type: [Report_1.reportSchema], default: [] },
    comments: { type: [Comment_1.commentSchema], default: [] },
    reactions: { type: [Reaction_1.reactionSchema], default: [] }
});
exports.userSchema = userSchema;
const User = mongoose_1.default.model('users', userSchema);
exports.User = User;
