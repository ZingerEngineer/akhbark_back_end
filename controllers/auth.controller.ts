import { Request, Response } from 'express'
import {
  userLogin,
  userRegister,
  sendMail,
  validateResetPasswordTokenFn,
  createNewPasswordFn,
  deleteResetPasswordTokenFn,
  deleteAccessTokenFn,
  validateAccessTokenFn
} from '../actions/auth'

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body

  try {
    const { access_token_body, userData } = await userLogin(email, password)
    res.setHeader('Authorization', access_token_body).status(200).json({
      message: 'success',
      userData
    })
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(400)
        .json({ message: 'login failed', reason: error.message })
    }
    return res.status(400).json({ message: 'login failed' })
  }
}

export const register = async (req: Request, res: Response) => {
  const { email, password, userName } = req.body

  try {
    const { newUser, access_token_body } = await userRegister(
      email,
      password,
      userName
    )
    res
      .setHeader('Authorization', access_token_body)
      .status(200)
      .json({ message: 'register success.', newUser })
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

export const createNewPassword = async (req: Request, res: Response) => {
  const { password, email } = req.body
  const { reset_password_token } = req.headers
  if (!reset_password_token)
    return res.status(400).json({
      message: 'password change failed.',
      reason: "user doesn't have reset token"
    })
  try {
    if (typeof reset_password_token !== 'string')
      return res.status(400).json({
        message: 'password change failed.',
        reason: 'invalid token type'
      })
    const { response } = await validateResetPasswordTokenFn(
      reset_password_token,
      false
    )
    if (response) createNewPasswordFn(password, email)
    res.status(200).json({ message: 'password changed successfully.' })
  } catch (error) {
    if (error instanceof Error) {
      res
        .status(400)
        .json({ message: 'password change failed.', reason: error.message })
    }
    res.status(400).json({ message: 'password change failed.' })
  }
}

export const validateResetPasswordToken = async (
  req: Request,
  res: Response
) => {
  const { reset_password_token } = req.headers
  if (!reset_password_token || typeof reset_password_token !== 'string') {
    return res.status(400).json({
      message: 'invalide token type',
      location: '/login'
    })
  }

  try {
    const { response, data } = await validateResetPasswordTokenFn(
      reset_password_token,
      true
    )
    response
      ? res.status(200).json({
          message: 'token validation success',
          isValidReset: response,
          userEmail: data?.email
        })
      : res.status(200).json({
          message: 'token validation failed',
          isValidReset: response,
          location: '/login'
        })
  } catch (error) {
    res.status(400).json({
      message: 'error happened',
      location: '/login'
    })
  }
}

export const validateAccessToken = async (req: Request, res: Response) => {
  const { authorization } = req.headers
  if (!authorization || typeof authorization !== 'string')
    throw new Error('invalid access token.')
  try {
    const { id, userName, email, role, avatar } = await validateAccessTokenFn(
      authorization
    )
    res.status(200).json({
      message: 'token validation success',
      userData: { id, userName, email, role, avatar }
    })
  } catch (error) {
    error instanceof Error
      ? res.status(400).json({
          message: 'Error happened.',
          reason: error.message
        })
      : res.status(400).json({
          message: 'Error happened.'
        })
  }
}

export const deleteResetPasswordToken = async (req: Request, res: Response) => {
  const { reset_password_token } = req.headers
  if (!reset_password_token || typeof reset_password_token !== 'string') {
    return res.status(400).json({
      message: 'invalide token type',
      isDeleted: false
    })
  }

  try {
    await deleteResetPasswordTokenFn(reset_password_token)
    res.status(200).json({
      message: 'token deleted successfully',
      isDeleted: true
    })
  } catch (error) {
    error instanceof Error
      ? res.status(400).json({
          message: 'error happened',
          reason: error.message,
          isDeleted: false
        })
      : res.status(400).json({
          message: 'error happened',
          isDeleted: false
        })
  }
}

export const deleteAccessToken = async (req: Request, res: Response) => {
  const { authorization } = req.headers
  if (!authorization || typeof authorization !== 'string') {
    return res.status(400).json({
      message: 'invalide token type',
      isDeleted: false
    })
  }

  try {
    await deleteAccessTokenFn(authorization)
    res.status(200).json({
      message: 'token deleted successfully',
      isDeleted: true
    })
  } catch (error) {
    error instanceof Error
      ? res.status(400).json({
          message: 'error happened',
          reason: error.message,
          isDeleted: false
        })
      : res.status(400).json({
          message: 'error happened',
          isDeleted: false
        })
  }
}
