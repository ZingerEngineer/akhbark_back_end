import mongoose from 'mongoose'
import { IUser } from '../interfaces/User'
import { followerSchema } from './Follower'
import { postSchema } from './Post'
import { activitySchema } from './Activity'
import { reportSchema } from './Report'
import { commentSchema } from './Comment'
import { reactionSchema } from './Reaction'
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
