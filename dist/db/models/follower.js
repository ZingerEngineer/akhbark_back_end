"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const followerSchema_1 = __importDefault(require("../schemas/followerSchema"));
const Follower = mongoose_1.default.model('user', followerSchema_1.default);
exports.default = Follower;
