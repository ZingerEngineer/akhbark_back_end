import mongoose from 'mongoose'
import { IReaction } from '../interfaces/Post'
const reactionSchema = new mongoose.Schema<IReaction>({
  id: mongoose.Types.ObjectId,
  timeCreated: String,
  owner: {
    userName: String,
    userId: mongoose.Types.ObjectId
  },
  icon: String,
  label: String,
  reactedToEntity: {
    entityId: mongoose.Types.ObjectId
  }
})
const Reaction = mongoose.model<IReaction>('reactions', reactionSchema)
export { Reaction, reactionSchema }
