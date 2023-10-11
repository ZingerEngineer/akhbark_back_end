import {
  findOneUserByEmail,
  createUser,
  findOneUserByUserName,
  createUserResetPasswordToken,
  createUserAccessToken,
  getUserToken,
  updateUserTokensArray
} from '../daos/user'
import { compare } from 'bcrypt'
import { sign, decode } from 'jsonwebtoken'
import { hash } from 'bcrypt'
import nodemailer from 'nodemailer'

const forgotURL = 'http://localhost:3000/create-new-password'
const forgetKey = process.env.PRIVATE_FORGET_KEY
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'akhbarkmailer@gmail.com',
    pass: 'elxfgwssnhmwzwfh'
  },
  tls: { rejectUnauthorized: false }
})

export const userLogin = async (email: string, password: string) => {
  const user = await findOneUserByEmail(email)

  if (!user) throw new Error("User doesn't exist.")

  const passwordCheck = await compare(password, user.password)

  if (!passwordCheck) throw new Error("Password doesn't match")

  const { id, userName, role, avatar } = user
  const access_token_payload = { id, userName, email, role, avatar }
  const secret = process.env.PRIVATE_KEY

  if (!secret) throw new Error('Error occured.')

  const access_token_body = sign(access_token_payload, secret)

  await createUserAccessToken(access_token_body, email)

  return { userData: user, access_token_body }
}

export const userRegister = async (
  email: string,
  password: string,
  userName: string
) => {
  const userEmailExists = await findOneUserByEmail(email)
  if (userEmailExists) throw new Error('Email already exists.')
  const userNameExists = await findOneUserByUserName(userName)
  if (userNameExists) throw new Error('User name already used.')
  const hashedPassword = await hash(password, 10)

  const newUser = await createUser({
    userName,
    email,
    password: hashedPassword
  })
  const {
    id: newUserId,
    userName: newUserName,
    role: newUserRole,
    email: newUserEmail,
    avatar: newUserAvata
  } = newUser
  const access_token_payload = {
    newUserId,
    newUserName,
    newUserRole,
    newUserAvata,
    newUserEmail
  }
  const secret = process.env.PRIVATE_KEY
  if (!secret) throw new Error('Error occured.')
  const access_token_body = sign(access_token_payload, secret)
  await createUserAccessToken(access_token_body, email)
  return { newUser, access_token_body }
}

export const sendMail = async (email: string) => {
  if (!forgetKey) throw new Error('email sending failed.')
  else {
    const emailPayload = {
      email: email,
      date: Date.now()
    }
    const emailToken = sign(emailPayload, forgetKey, {
      expiresIn: '600000'
    })
    const forgotURLWithToken = `${forgotURL}/${emailToken}`
    await createUserResetPasswordToken(emailToken, email)
    const info = await transporter.sendMail({
      from: 'akhbarkmailer@gmail.com', // sender address
      to: email, // list of receivers
      subject: 'Passowrd Reset', // Subject line
      text: `Use this url to create a new password: ${forgotURLWithToken}` // plain text body
    })
    return info
  }
}

export const validateResetPasswordTokenFn = async (
  token: string,
  returnData: boolean
) => {
  const payload = decode(token)
  if (!payload) throw new Error('empty token')
  if (!(payload instanceof Object)) throw new Error('invalid token data type')
  const { email } = payload
  const { exp } = payload
  if (!exp) throw new Error('token has no expiration time')
  if (Date.now() >= exp * 1000) {
    return { response: false }
  }
  const dbResetToken = await getUserToken(email, 'reset_password_token')
  if (!dbResetToken) throw new Error("user isn't authorized to reset password.")
  if (!returnData) {
    return dbResetToken.body !== token
      ? { response: false }
      : { response: true }
  }
  return dbResetToken.body !== token
    ? { response: false, data: { email } }
    : { response: true, data: { email } }
}

export const createNewPasswordFn = async (
  password: string,
  userEmail: string
) => {
  const user = await findOneUserByEmail(userEmail)
  if (!user) throw new Error("user doesn't exist")
  const encryptedPassword = await hash(password, 10)
  return user.updateOne({ password: encryptedPassword })
}

export const deleteResetPasswordTokenFn = async (toBeDeletedToken: string) => {
  const payload = decode(toBeDeletedToken)
  if (!payload) throw new Error('empty token')
  if (!(payload instanceof Object)) throw new Error('invalid token data type')
  const { email } = payload
  await updateUserTokensArray(email, undefined, null)
}

export const deleteAccessTokenFn = async (toBeDeletedToken: string) => {
  const payload = decode(toBeDeletedToken)
  if (!payload) throw new Error('empty token')
  if (!(payload instanceof Object)) throw new Error('invalid token data type')
  const { email } = payload
  await updateUserTokensArray(email, null, undefined)
}

export const validateAccessTokenFn = async (access_token: string) => {
  const payload = decode(access_token)
  if (!payload) throw new Error('empty token')
  if (!(payload instanceof Object)) throw new Error('invalid token data type')
  const { id, userName, email, role, avatar } = payload
  return { userData: { id, userName, email, role, avatar } }
}
