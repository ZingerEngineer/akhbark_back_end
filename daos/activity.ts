import { IActivity } from '../interfaces/global'
import { Activity } from '../models/Activity'

export const createActivity = (data: IActivity) => {
  const activity = new Activity(data)
  return activity.save()
}
