import mongoose from 'mongoose'
import { IActivity } from '../../interfaces/global'
import { reactionSchema } from './reactionSchema'
import { commentSchema } from './commentSchema'
const activitySchema = new mongoose.Schema<IActivity>({
  id: mongoose.Types.ObjectId,
  timeCreated: String,
  owner: {
    userName: String,
    userId: mongoose.Types.ObjectId
  },
  affectedEntity: {
    entityId: mongoose.Types.ObjectId
  },
  reaction: { type: reactionSchema, required: false },
  comment: { type: commentSchema, required: false }
})
const Activity = mongoose.model<IActivity>('activities', activitySchema)
export { Activity, activitySchema }
