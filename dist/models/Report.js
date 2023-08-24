"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportSchema = exports.Report = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const reportSchema = new mongoose_1.default.Schema({
    id: mongoose_1.default.Types.ObjectId,
    timeCreated: String,
    entityReported: {
        entityId: mongoose_1.default.Types.ObjectId
    },
    title: String,
    reasons: [String],
    reportBody: String
});
exports.reportSchema = reportSchema;
const Report = mongoose_1.default.model('reports', reportSchema);
exports.Report = Report;
