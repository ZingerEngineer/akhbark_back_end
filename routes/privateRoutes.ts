import express from 'express'
import userRouter from './userRoutes'
import authGaurd from '../middlewares/authGaurd'
const privateRouter = express.Router()

privateRouter.use('/user', authGaurd, userRouter)

export default privateRouter
