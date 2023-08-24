import express from 'express'
import { login, register } from '../controllers/auth.controller'
import { userLoginSchema, userRegisterSchema } from '../schemas/User'
import {validate}
const authRouter = express.Router()

authRouter.post('/login', userLoginSchema.validate({user}), login)
authRouter.post('/register', validateRegisterInput, register)

export { authRouter }
