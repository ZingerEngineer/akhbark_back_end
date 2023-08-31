import { findOneUserByToken } from '../daos/user'

export const getUserProfile = async (token: string) => {
  const { userName, email, avatar, coverImage, posts, recentActivity } =
    await findOneUserByToken(token)
  return { userName, email, avatar, coverImage, posts, recentActivity }
}
export const getUserSettings = async (token: string) => {
  const { settings } = await findOneUserByToken(token)
  return settings
}
export const getUserPosts = async (token: string) => {
  const { posts } = await findOneUserByToken(token)
  return posts
}
export const getUserFollowers = async (token: string) => {
  const { followers } = await findOneUserByToken(token)
  return followers
}
export const getUserRecentActivity = async (token: string) => {
  const { recentActivity } = await findOneUserByToken(token)
  return recentActivity
}
