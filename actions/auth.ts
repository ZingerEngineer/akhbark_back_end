import { findOneUserByEmail, createUser } from '../daos/user'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { hash } from 'bcrypt'

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
  const hashedPassword = await hash(password, 10)
  createUser({
    userName,
    email,
    password: hashedPassword
  })
}
