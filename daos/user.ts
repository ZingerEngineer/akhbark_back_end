import axios from 'axios'
import jwt from 'jsonwebtoken'
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
  return user.toJSON()
}

export const findOneUserByUserName = async (userName: string) => {
  const user = await User.findOne({ userName: userName })
  if (user) return user.toJSON()
}

export const getUserPosts = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toJSON()
  return userObject.posts
}

export const getUserRecentActivity = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toJSON()
  return userObject.recentActivity
}

export const getUserFollowers = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toJSON()
  return userObject.followers
}

export const getUserReports = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toJSON()
  return userObject.reports
}

export const getUserComments = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toJSON()
  return userObject.comments
}

export const getUserReaction = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toJSON()
  return userObject.reactions
}

export const getUserAvatar = async (userId: string) => {
  const user = await User.findById(userId)
  if (!user) throw new Error("User doesn't exist")
  const userObject = user.toJSON()
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
  if (newAccessToken === undefined) {
    access_token = await getUserToken(userEmail, 'access_token')
    if (!access_token) access_token = null
  } else if (newAccessToken === null) {
    access_token = null
  } else {
    access_token = newAccessToken
  }
  if (newResetPasswordToken === undefined) {
    let reset_password_token = await getUserToken(
      userEmail,
      'reset_password_token'
    )
    if (!reset_password_token) reset_password_token = null
  } else if (newResetPasswordToken === null) {
    reset_password_token = null
  } else {
    reset_password_token = newResetPasswordToken
  }
  const newUserTokensArray = [access_token, reset_password_token]
  return user.updateOne({ tokens: newUserTokensArray })
}

export const getGoogleOAuthTokens = async ({ code }: { code: string }) => {
  const url = 'https:/oauth2.googleapis.com/token'
  const values = {
    code: code,
    client_id: process.env.CLIENT_ID as string,
    client_secret: process.env.CLIENT_SECRET as string,
    redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT_URL as string,
    grant_type: 'authorization_code'
  }
  try {
    const params = new URLSearchParams(values)
    const res = await axios.post(url, params)
    return res.data
  } catch (error) {
    console.log(error, 'Failed to fetch Google OAuth')
  }
}

export const getGoogleUserInfo = async ({
  access_token
}: {
  access_token: string
}) => {
  try {
    const userData = await axios.get(
      'https://www.googleapis.com/oauth2/v1/userinfo',
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    return userData
  } catch (error) {
    console.log(error, 'Failed to fetch google user info')
  }
}

export const getGoogleUserProfile = async ({
  access_token
}: {
  access_token: string
}) => {
  try {
    const res = await axios.get('https://www.googleapis.com/auth/userprofile', {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    })
    return res.data
  } catch (error) {
    console.log(error, 'Failed to fetch google user info')
  }
}
