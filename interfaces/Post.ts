import { IUser } from './User'
import { IReport, IReaction } from './global'

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
