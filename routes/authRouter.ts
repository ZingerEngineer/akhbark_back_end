import express from 'express'
import {
  login,
  register,
  forgotPassword,
  createNewPassword,
  validateResetPasswordToken
} from '../controllers/auth.controller'
import {
  userLoginSchema,
  userRegisterSchema,
  emailSchema,
  passwordSchema,
  tokenSchema
} from '../schemas/User'
import { validate } from '../middlewares/validate'
const authRouter = express.Router()

authRouter.post('/login', validate(userLoginSchema), login)
authRouter.post('/register', validate(userRegisterSchema), register)
authRouter.post('/forgot-password', validate(emailSchema), forgotPassword)
authRouter.post(
  '/create-new-password',
  validate(passwordSchema),
  createNewPassword
)
authRouter.post(
  '/validate-reset-password-token',
  validate(tokenSchema),
  validateResetPasswordToken
)

export { authRouter }
