import { IPost, IReaction } from './Post.js'
import {
  IActivity,
  IComment,
  IReport,
  IUserSettings,
  IToken
} from './global.js'

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
  | 'token'
  | 'settings'
  | 'coverImage'
>

interface IUser {
  id?: string
  timeCreated?: string
  role?: string
  tokens?: IToken[]
  userName?: string
  email: string
  password: string
  avatar?: string
  coverImage?: string
  followers?: {
    totalNumber: number
    followersArray: IFollower[]
  }
  posts?: {
    totalNumber: number
    postsArray: IPost[]
  }
  recentActivity?: IActivity[]
  reports?: IReport[]
  comments?: IComment[]
  reactions?: IReaction[]
  settings?: IUserSettings
}
export { IUser, IFollower }
