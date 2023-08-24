"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reactionSchema = exports.Reaction = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reactionSchema = new mongoose_1.default.Schema({
    id: mongoose_1.default.Types.ObjectId,
    timeCreated: String,
    owner: {
        userName: String,
        userId: mongoose_1.default.Types.ObjectId
    },
    icon: String,
    label: String,
    reactedToEntity: {
        entityId: mongoose_1.default.Types.ObjectId
    }
});
exports.reactionSchema = reactionSchema;
const Reaction = mongoose_1.default.model('reactions', reactionSchema);
exports.Reaction = Reaction;
