import { Iinteraction, IPost } from './Post'

interface IReport {
  title: string
  reasons: string[]
  reportBody: string
}
interface IComment {
  text?: string
  image?: string
  video?: string
  audio?: string
}
interface IActivity {
  affectedPost: IPost
  interaction?: Iinteraction
  comment?: IComment
}

export { IReport, IComment, IActivity }
