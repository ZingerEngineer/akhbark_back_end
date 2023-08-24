import { Request, Response } from 'express'
import { userLogin } from '../actions/auth'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const { token, userData } = await userLogin(email, password)
    res.status(200).json({ message: 'login success.' })
  } catch (error) {
    res.status(400).json({ message: 'login failed.' })
  }
}
