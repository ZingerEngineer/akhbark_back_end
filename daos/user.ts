import { IUser } from '../interfaces/User'
import { User } from '../models/User'
import { tokenTypes } from '../interfaces/global'

export const createUser = async (data: IUser) => {
  const user = new User(data)
  return await user.save()
}
export const findOneUserDocumentByEmail = async (email: string) => {
  const user = await User.findOne({ email: email })
  if (user) return user
}

export const findOneUserByEmail = async (email: string) => {
  const user = await User.findOne({ email: email })
  if (user) return user
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

export const createUserResetPasswordToken = async (
  tokenBody: string,
  userEmail: string
) => {
  const user = await findOneUserDocumentByEmail(userEmail)
  if (!user) throw new Error("User doesn't exist")
  user.updateOne(() => {
    if (!user.tokens) throw new Error('Empty tokens array')
    const userResetPasswordToken = user.tokens.find(
      (token) => token.type === 'reset_password_token'
    )
    if (!userResetPasswordToken)
      user.tokens.push({
        timeCreated: new Date(Date.now()).toString(),
        owner: {
          email: user.email,
          userName: user.userName,
          userId: user._id.toString()
        },
        body: tokenBody,
        type: tokenTypes.reset_password_token
      })
    else {
      const filteredTokensArray = user.tokens.filter(
        (token) => token.type !== 'reset_password_token'
      )
      user.tokens = filteredTokensArray
      user.tokens.push({
        timeCreated: new Date(Date.now()).toString(),
        owner: {
          email: user.email,
          userName: user.userName,
          userId: user._id.toString()
        },
        body: tokenBody,
        type: tokenTypes.reset_password_token
      })
    }
  })
}

export const getUserResetPasswordToken = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toObject()
  if (!userObject.tokens) throw new Error("User doesn't have tokens")
  const resetPassowrdToken = userObject.tokens.find(
    (token) => token.type === 'reset_password_token'
  )
  if (!resetPassowrdToken) throw new Error("User doesn't have token")
  return resetPassowrdToken
}
