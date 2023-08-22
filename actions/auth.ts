import { findOneUserByEmail } from '../daos/user'

export const userLogin = async (email: string, password: string) => {
  const user = await findOneUserByEmail(email)
  if (!user) throw new Error('User not found')
  const comaprePassword = ''

  if (!comparePassword) throw new Error("Password doesn't match")

  const userData = ''
  const token = ''

  return { userData, token }
}
