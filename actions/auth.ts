import {
  findOneUserByEmail,
  createUser,
  findOneUserByUserName,
  createUserResetPasswordToken
} from '../daos/user'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'
import nodemailer from 'nodemailer'
import { IToken } from '../interfaces/global'

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
  if (!user) throw new Error('User not found.')
  const passwordCheck = await compare(password, user.password)
  if (!passwordCheck) throw new Error("Password doesn't match")
  const { id, userName, role } = user
  const payload = { id, userName, email, role }
  const secret = process.env.PRIVATE_KEY
  if (!secret) throw new Error('Error occured.')
  const token = sign(payload, secret)
  const userData = user
  return { userData, token }
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
  createUser({
    userName,
    email,
    password: hashedPassword
  })
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

export const validateResetPasswordTokenFn = async (token: IToken) => {
  const { owner } = token
  const userEmail = owner.email
  const user = await findOneUserByEmail(userEmail)
  if (!user) throw new Error("User doesn't exist")
  const userResetPasswordToken = user.tokens?.find(
    (token) => token.type === 'reset_password_token'
  )
  if (!userResetPasswordToken) throw new Error("User doesn't have reset token")
  return token.body !== userResetPasswordToken?.body ? false : true
}
