import { IReaction, IPost } from './Post'
import { IUser } from './User'

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

export { IReport, IComment, IActivity }
