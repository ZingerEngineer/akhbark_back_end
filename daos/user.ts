import { IUser } from '../interfaces/User'
import { User } from '../models/User'

export const createUser = async (data: IUser) => {
  const user = new User(data)
  return await user.save()
}

export const findOneUserByEmail = async (email: string) => {
  const user = await User.findOne({ email: email })
  if (user) return user.toObject()
}
export const findOneUserByToken = async (token: string) => {
  const user = await User.findOne({ token: token })
  if (!user) throw new Error("User doesn't exist")
  return user.toObject()
}
export const findOneUserByUserName = async (userName: string) => {
  const user = await User.findOne({ userName: userName })
  if (user) return user.toObject()
}

export const getUserPosts = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toObject()
  return userObject.posts
}

export const getUserRecentActivity = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toObject()
  return userObject.recentActivity
}

export const getUserFollowers = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toObject()
  return userObject.followers
}

export const getUserReports = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toObject()
  return userObject.reports
}

export const getUserComments = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toObject()
  return userObject.comments
}

export const getUserReaction = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toObject()
  return userObject.reactions
}

export const getUserAvatar = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toObject()
  return userObject.avatar
}
