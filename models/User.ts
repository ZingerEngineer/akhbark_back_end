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
  timeCreated: { type: String, default: new Date(Date.now()).toString() },
  role: { type: String, default: 'user' },
  token: { type: String, default: '' },
  userName: { type: String, default: 'guest' },
  email: { type: String, required: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'default_user_url' },
  coverImage: { type: String, default: '', required: false },
  followers: {
    type: Object,
    totalNumber: { type: Number, default: 0 },
    followersArray: { type: [followerSchema], default: [] }
  },
  posts: {
    type: Object,
    totalNumber: { type: Number, default: 0 },
    postsArray: { type: [postSchema], default: [] }
  },
  recentActivity: { type: [activitySchema], default: [] },
  reports: { type: [reportSchema], default: [] },
  comments: { type: [commentSchema], default: [] },
  reactions: { type: [reactionSchema], default: [] },
  settings: { type: Object, default: '' }
})
const User = mongoose.model<IUser>('users', userSchema)
export { User, userSchema }
