import mongoose from 'mongoose'
import { IPost } from '../../interfaces/Post'
import Follower from '../schemas/followerSchema'
import User from './userSchema'
const postSchema = new mongoose.Schema<IPost>({
  owner: User,
  id: String,
  title: String,
  image: String,
  video: String,
  privacy: String,
  interactions: {
    totalNumber: Number,
    interactionTypes: [Interaction]
  },
  reportStatus: {
    reportsNumber: Number
    reportsArray: [Report]
  },
  comments: [Comment]
})
const Post = mongoose.model<IPost>('user', postSchema)
export default Post