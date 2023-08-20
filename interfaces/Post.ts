import { IUser } from './User'
import { IReport } from './global'

interface Iinteraction {
  icon: string
  label: string
}

interface IPost {
  owner: IUser
  id: string
  title: string
  image: string
  video: string
  privacy: string
  interactions: {
    totalNumber: number
    interactionTypes: Iinteraction[]
  }
  reportStatus: {
    reportsNumber: number
    reportsArray: Report[]
  }
  comments: Comment[]
}

export { IReport, Iinteraction, IPost }
