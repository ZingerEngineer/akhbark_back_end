import { IUser } from '../interfaces/User'
import { User } from '../models/User'

export const createUser = (data: IUser) => {
  const user = new User(data)
  return user.save()
}

export const findOneUserByEmail = (email: string) => {
  const user = User.findOne({ email })
  return user
}
