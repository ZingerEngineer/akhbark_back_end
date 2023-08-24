"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activitySchema = exports.Activity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Reaction_1 = require("./Reaction");
const Comment_1 = require("./Comment");
const activitySchema = new mongoose_1.default.Schema({
    id: mongoose_1.default.Types.ObjectId,
    timeCreated: String,
    owner: {
        userName: String,
        userId: mongoose_1.default.Types.ObjectId
    },
    affectedEntity: {
        entityId: mongoose_1.default.Types.ObjectId
    },
    reaction: { type: Reaction_1.reactionSchema, required: false },
    comment: { type: Comment_1.commentSchema, required: false }
});
exports.activitySchema = activitySchema;
const Activity = mongoose_1.default.model('activities', activitySchema);
exports.Activity = Activity;
