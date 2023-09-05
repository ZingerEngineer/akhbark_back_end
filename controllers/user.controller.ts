import { Request, Response } from 'express'
import {
  getUserProfile,
  getUserSettings,
  getUserPosts,
  getUserFollowers,
  getUserRecentActivity
} from '../actions/user'

export const Profile = async (req: Request, res: Response) => {
  let token = req.headers.token
  if (!token || typeof token !== 'string') throw new Error('Error happened')
  try {
    const { userName, email, avatar, coverImage, posts, recentActivity } =
      await getUserProfile(token)
    res.status(200).json({ message: 'user profile loaded successfully' })
  } catch (error) {
    res.status(400).json({ message: 'user profile load failed' })
  }
}

export const Settings = async (req: Request, res: Response) => {
  let token = req.headers.token
  if (!token || typeof token !== 'string') throw new Error('Error happened')
  try {
    await getUserSettings(token)
    res.status(200).json({ message: 'user settings loaded successfully' })
  } catch (error) {
    res.status(400).json({ message: 'user settings load failed' })
  }
}

export const Posts = async (req: Request, res: Response) => {
  let token = req.headers.token
  if (!token || typeof token !== 'string') throw new Error('Error happened')
  try {
    await getUserPosts(token)
    res.status(200).json({ message: 'user posts loaded successfully' })
  } catch (error) {
    res.status(400).json({ message: 'user posts load failed' })
  }
}

export const Followers = async (req: Request, res: Response) => {
  let token = req.headers.token
  if (!token || typeof token !== 'string') throw new Error('Error happened')
  try {
    await getUserFollowers(token)
    res.status(200).json({ message: 'user followers loaded successfully' })
  } catch (error) {
    res.status(400).json({ message: 'user followers load failed' })
  }
}

export const RecentActivity = async (req: Request, res: Response) => {
  let token = req.headers.token
  if (!token || typeof token !== 'string') throw new Error('Error happened')
  try {
    await getUserRecentActivity(token)
    res
      .status(200)
      .json({ message: 'user recent activity loaded successfully' })
  } catch (error) {
    res.status(400).json({ message: 'user recent activity load failed' })
  }
}
