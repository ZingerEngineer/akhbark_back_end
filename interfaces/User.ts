import { IPost, IReaction } from './Post.js'
import { IActivity, IComment, IReport } from './global.js'

type IFollower = Omit<
  IUser,
  | 'email'
  | 'password'
  | 'followers'
  | 'posts'
  | 'recentActivity'
  | 'role'
  | 'timeCreated'
  | 'reports'
  | 'comments'
  | 'reactions'
>
interface IUser {
  id: string
  timeCreated: string
  role: string
  userName: string
  email: string
  password: string
  avatar: string
  followers: {
    totalNumber: number
    followersArray: IFollower[]
  }
  posts: {
    totalNumber: number
    postsArray: IPost[]
  }
  recentActivity: IActivity[]
  reports: IReport[]
  comments: IComment[]
  reactions: IReaction[]
}
export { IUser, IFollower }
