import mongoose from 'mongoose'
import { IPost } from '../../interfaces/Post'
import { reactionSchema } from './reactionSchema'
import { reportSchema } from './reportSchema'
import { commentSchema } from './commentSchema'
const postSchema = new mongoose.Schema<IPost>({
  id: mongoose.Types.ObjectId,
  timeCreated: String,
  owner: {
    userName: String,
    userId: mongoose.Types.ObjectId
  },
  title: String,
  image: String,
  video: String,
  privacy: String,
  reactions: {
    totalNumber: Number,
    ReactionTypes: { type: [reactionSchema] }
  },
  reportStatus: {
    reportsNumber: Number,
    reportsArray: { type: [reportSchema] }
  },
  comments: { type: [commentSchema] }
})
const Post = mongoose.model<IPost>('posts', postSchema)
export { Post, postSchema }
