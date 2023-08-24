import express from 'express'
import { login, register } from '../controllers/auth.controller'
import { userLoginSchema, userRegisterSchema } from '../schemas/User'
import { validate } from '../middlewares/validate'
const authRouter = express.Router()

authRouter.post('/login', validate(userLoginSchema), login)
authRouter.post('/register', validate(userRegisterSchema), register)

export { authRouter }
