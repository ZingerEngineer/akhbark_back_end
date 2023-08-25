import mongoose from 'mongoose'
import { IComment } from '../interfaces/global'
const commentSchema = new mongoose.Schema<IComment>({
  id: mongoose.Types.ObjectId,
  timeCreated: { type: String, default: new Date(Date.now()).toString() },
  owner: {
    type: Object,
    userName: String,
    userId: mongoose.Types.ObjectId,
    required: true
  },
  commentedToEntity: {
    type: Object,
    entityType: String,
    entityId: mongoose.Types.ObjectId,
    required: true
  },
  text: { type: String, required: false },
  image: { type: String, required: false },
  video: { type: String, required: false },
  audio: { type: String, required: false }
})
const Comment = mongoose.model<IComment>('comments', commentSchema)
export { Comment, commentSchema }
