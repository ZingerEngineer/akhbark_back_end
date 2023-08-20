import mongoose from 'mongoose'
import { IUser } from '../../interfaces/User'
import Follower from '../schemas/followerSchema'
const userSchema = new mongoose.Schema<IUser>({
  id: String,
  role: String,
  userName: String,
  email: String,
  password: String,
  avatar: String,
  followers: {
    totalNumber: Number,
    followersArray: [Follower]
  },
  posts: {
    totalNumber: Number
    postsArray: [Post]
  },
  recentActivity: [Activity]
})
const User = mongoose.model<IUser>('user', userSchema)
export default User