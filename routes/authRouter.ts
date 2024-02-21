import express from 'express'
import {
  login,
  register,
  forgotPassword,
  createNewPassword,
  validateResetPasswordToken,
  deleteResetPasswordToken,
  validateAccessToken,
  deleteAccessToken,
  googleOAuthHandler
} from '../controllers/auth.controller'
import {
  userLoginSchema,
  userRegisterSchema,
  emailSchema,
  passwordSchema,
  tokenSchema
} from '../schemas/User'
import {
  validate,
  validateResetPasswordData,
  validateTokenString
} from '../middlewares/validate'
const authRouter = express.Router()

authRouter.post('/login', validate(userLoginSchema), login)
authRouter.post('/register', validate(userRegisterSchema), register)
authRouter.post('/forgot-password', validate(emailSchema), forgotPassword)
authRouter.post(
  '/create-new-password',
  validateResetPasswordData(emailSchema, passwordSchema, tokenSchema),
  createNewPassword
)
authRouter.post(
  '/validate-reset-password-token',
  validateTokenString(tokenSchema, 'reset_password_token'),
  validateResetPasswordToken
)
authRouter.post(
  '/validate-access-token',
  validateTokenString(tokenSchema, 'authorization'),
  validateAccessToken
)
authRouter.delete(
  '/delete-reset-password-token',
  validateTokenString(tokenSchema, 'reset_password_token'),
  deleteResetPasswordToken
)

authRouter.get('/sessions/oauth/google', googleOAuthHandler)
authRouter.delete(
  '/logout',
  validateTokenString(tokenSchema, 'authorization'),
  deleteAccessToken
)

export { authRouter }
