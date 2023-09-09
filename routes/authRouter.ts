import express from 'express'
import { login, register, forgotPassword } from '../controllers/auth.controller'
import {
  userLoginSchema,
  userRegisterSchema,
  emailSchema
} from '../schemas/User'
import { validate } from '../middlewares/validate'
const authRouter = express.Router()

authRouter.post('/login', validate(userLoginSchema), login)
authRouter.post('/register', validate(userRegisterSchema), register)
authRouter.post('/forgot-password', validate(emailSchema), forgotPassword)

export { authRouter }
