import { IPost } from './Post'
import { IUser } from './User'

export enum tokenTypes {
  authorization_token,
  reset_password_token
}
interface IToken {
  timeCreated: string
  owner: {
    email: string
    userName?: String
    userId: string
  }
  body: string
  type: tokenTypes
}
interface IReaction {
  id: string
  timeCreated: string
  icon: string
  label: string
  owner: IUser
  reactedToEntity: IPost | IComment
}
interface IReport {
  id: string
  timeCreated: string
  owner: IUser
  entityReported: IUser | IPost | IComment
  title: string
  reasons: string[]
  reportBody: string
}
interface IComment {
  id: string
  timeCreated: string
  owner: IUser
  commentedToEntity: IPost | IComment
  text?: string
  image?: string
  video?: string
  audio?: string
}
interface IActivity {
  id: string
  timeCreated: string
  owner: IUser
  affectedEntity: IPost | IComment
  reaction?: IReaction
  comment?: IComment
}
interface IUserSettings {}

export { IReport, IComment, IActivity, IReaction, IUserSettings, IToken }
