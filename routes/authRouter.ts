import express from 'express'
import { login, register } from '../controllers/auth.controller'
import { userLoginSchema, userRegisterSchema } from '../schemas/User'
const authRouter = express.Router()

authRouter.post('/login', validateLoginInput, login)
authRouter.post('/register', validateRegisterInput, register)

export { authRouter }
