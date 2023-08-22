import mongoose from 'mongoose'
import { IUser } from '../../interfaces/User'
import { followerSchema } from '../schemas/followerSchema'
import { postSchema } from '../schemas/postSchema'
import { activitySchema } from './activitySchema'
import { reportSchema } from './reportSchema'
import { commentSchema } from './commentSchema'
import { reactionSchema } from './reactionSchema'
const userSchema = new mongoose.Schema<IUser>({
  id: mongoose.Types.ObjectId,
  timeCreated: String,
  role: String,
  userName: String,
  email: String,
  password: String,
  avatar: String,
  followers: {
    totalNumber: Number,
    followersArray: { type: [followerSchema] }
  },
  posts: {
    totalNumber: Number,
    postsArray: [postSchema]
  },
  recentActivity: [activitySchema],
  reports: [reportSchema],
  comments: [commentSchema],
  reactions: [reactionSchema]
})
const User = mongoose.model<IUser>('users', userSchema)
export { User, userSchema }
