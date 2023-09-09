import { Request, Response } from 'express'
import { userLogin, userRegister, sendMail } from '../actions/auth'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const { token, userData } = await userLogin(email, password)
    res.status(200).json({
      message: 'login success',
      receivedData: {
        token,
        userData
      }
    })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: 'login failed', reason: error.message })
    }
    res.status(400).json({ message: 'login failed' })
  }
}

export const register = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body

  try {
    await userRegister(email, password, userName)
    res.status(200).json({ message: 'register success.' })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    }
    res.status(400).json({ message: 'register failed.' })
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  const { email } = req.body
  try {
    const info = await sendMail(email)
    res.status(200).json({ message: 'verification mail sent.', info })
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message })
    }
    res.status(400).json({ message: 'verification failed.' })
  }
}
