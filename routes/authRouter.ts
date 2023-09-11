import express from 'express'
import {
  login,
  register,
  forgotPassword,
  createNewPassword
} from '../controllers/auth.controller'
import {
  userLoginSchema,
  userRegisterSchema,
  emailSchema,
  passwordSchema
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

export { authRouter }
