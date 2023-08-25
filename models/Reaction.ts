import mongoose from 'mongoose'
import { IReaction } from '../interfaces/Post'
const reactionSchema = new mongoose.Schema<IReaction>({
  id: mongoose.Types.ObjectId,
  timeCreated: { type: String, default: new Date(Date.now()).toString() },
  owner: {
    type: Object,
    userName: String,
    userId: mongoose.Types.ObjectId,
    required: true
  },
  icon: String,
  label: String,
  reactedToEntity: {
    type: Object,
    entityType: String,
    entityId: mongoose.Types.ObjectId,
    required: true
  }
})
const Reaction = mongoose.model<IReaction>('reactions', reactionSchema)
export { Reaction, reactionSchema }
