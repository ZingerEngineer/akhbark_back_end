import mongoose from 'mongoose'
import { IFollower } from '../interfaces/User'
const followerSchema = new mongoose.Schema<IFollower>({
  id: mongoose.Types.ObjectId,
  userName: String,
  avatar: String
})
const Follower = mongoose.model<IFollower>('user', followerSchema)
export { Follower, followerSchema }
