import mongoose from 'mongoose'
import { IActivity } from '../interfaces/global'
import { reactionSchema } from './Reaction'
import { commentSchema } from './Comment'

const activitySchema = new mongoose.Schema<IActivity>({
  id: mongoose.Types.ObjectId,
  timeCreated: { type: String, default: new Date(Date.now()).toString() },
  owner: {
    type: Object,
    userName: String,
    userId: mongoose.Types.ObjectId,
    required: true
  },
  affectedEntity: {
    type: Object,
    entityType: String,
    entityId: mongoose.Types.ObjectId,
    required: true
  },
  reaction: { type: reactionSchema, required: false },
  comment: { type: commentSchema, required: false }
})
const Activity = mongoose.model<IActivity>('activities', activitySchema)

export { Activity, activitySchema }
