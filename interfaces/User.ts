import { IPost } from './Post.js'
import { IActivity } from './global.js'

type IFollower = Omit<
  IUser,
  'email' | 'password' | 'followers' | 'posts' | 'recentActivity' | 'role'
>
interface IUser {
  id: string
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
}
export { IUser, IFollower }
