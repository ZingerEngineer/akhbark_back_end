import mongoose from 'mongoose'
import { IComment } from '../interfaces/global'
const commentSchema = new mongoose.Schema<IComment>({
  id: mongoose.Types.ObjectId,
  timeCreated: String,
  owner: {
    userName: String,
    userId: mongoose.Types.ObjectId
  },
  commentedToEntity: {
    entityId: mongoose.Types.ObjectId
  },
  text: { required: false, type: String },
  image: { required: false, type: String },
  video: { required: false, type: String },
  audio: { required: false, type: String }
})
const Comment = mongoose.model<IComment>('comments', commentSchema)
export { Comment, commentSchema }
