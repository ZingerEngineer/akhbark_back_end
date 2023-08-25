import mongoose from 'mongoose'
import { IPost } from '../interfaces/Post'
import { reactionSchema } from './Reaction'
import { reportSchema } from './Report'
import { commentSchema } from './Comment'
const postSchema = new mongoose.Schema<IPost>({
  id: mongoose.Types.ObjectId,
  timeCreated: { type: String, default: new Date(Date.now()).toString() },
  owner: {
    type: Object,
    userName: String,
    userId: mongoose.Types.ObjectId,
    required: true
  },
  title: String,
  image: String,
  video: String,
  privacy: String,
  reactions: {
    type: Object,
    totalNumber: Number,
    ReactionTypes: { type: [reactionSchema] }
  },
  reportStatus: {
    type: Object,
    reportsNumber: Number,
    reportsArray: { type: [reportSchema] }
  },
  comments: { type: [commentSchema] }
})
const Post = mongoose.model<IPost>('posts', postSchema)
export { Post, postSchema }
