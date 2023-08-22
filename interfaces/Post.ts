import { IUser } from './User'
import { IReport, IComment } from './global'

interface IReaction {
  id: string
  timeCreated: string
  icon: string
  label: string
  owner: IUser
  reactedToEntity: IPost | IComment
}

interface IPost {
  id: string
  timeCreated: string
  owner: IUser
  title: string
  image: string
  video: string
  privacy: string
  reactions: {
    totalNumber: number
    reactionTypes: IReaction[]
  }
  reportStatus: {
    reportsNumber: number
    reportsArray: Report[]
  }
  comments: Comment[]
}

export { IReport, IReaction, IPost }
