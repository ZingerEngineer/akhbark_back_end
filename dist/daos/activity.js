"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createActivity = exports.findManyActivities = void 0;
const Activity_1 = require("../models/Activity");
const findManyActivities = () => {
    return Activity_1.Activity.find();
};
exports.findManyActivities = findManyActivities;
const createActivity = (data) => {
    const activity = new Activity_1.Activity(data);
    return activity.save();
};
exports.createActivity = createActivity;
