import { IUser } from '../interfaces/User'
import { User } from '../models/User'
import { IToken, tokenTypes } from '../interfaces/global'

export const createUser = async (data: IUser) => {
  const user = new User(data)
  await user.save()
  return user
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
  const user = await User.findOne({ email: userEmail })
  if (!user) throw new Error("user doesn't exist")
  if (!user.tokens) throw new Error('Empty tokens array')
  user.tokens[tokenTypes.reset_password_token] = {
    timeCreated: new Date(Date.now()).toString(),
    owner: {
      email: user.email,
      userName: user.userName,
      userId: user._id.toString()
    },
    body: tokenBody,
    type: tokenTypes.reset_password_token
  }
  return user.save()
}

export const createUserAccessToken = async (
  tokenBody: string,
  userEmail: string
) => {
  const user = await User.findOne({ email: userEmail })
  if (!user) throw new Error("user doesn't exist")
  if (!user.tokens) throw new Error('Empty tokens array')
  user.tokens[tokenTypes.access_token] = {
    timeCreated: new Date(Date.now()).toString(),
    owner: {
      email: user.email,
      userName: user.userName,
      userId: user._id.toString()
    },
    body: tokenBody,
    type: tokenTypes.access_token
  }
  return user.save()
}

export const getUserToken = async (userEmail: string, tokenType: string) => {
  const user = await User.findOne({ email: userEmail })
  if (!user) throw new Error("User doesn't exist")
  if (!user.tokens) throw new Error("User doesn't have tokens")
  const wantedToken = user.tokens
    .filter((token) => token !== null)
    .find(
      (token) => token.type === tokenTypes[tokenType as keyof typeof tokenTypes]
    )
  if (!wantedToken) return null
  return wantedToken
}

export const updateUserTokensArray = async (
  userEmail: string,
  newAccessToken?: IToken | null,
  newResetPasswordToken?: IToken | null
) => {
  let access_token = null
  let reset_password_token = null
  const user = await findOneUserByEmail(userEmail)
  if (!user) throw new Error("User doesn't exist")
  if (!newAccessToken) {
    access_token = await getUserToken(userEmail, 'access_token')
    if (!access_token) access_token = null
  } else {
    access_token = newAccessToken
  }
  if (newResetPasswordToken === undefined) {
    let reset_password_token = await getUserToken(
      userEmail,
      'reset_password_token'
    )
    if (!reset_password_token) reset_password_token = null
  } else {
    reset_password_token = newResetPasswordToken
  }
  const newUserTokensArray = [access_token, reset_password_token]
  return user.updateOne({ tokens: newUserTokensArray })
}
