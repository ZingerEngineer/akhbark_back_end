import express from 'express'
import userRouter from './userRoutes'
// import adminRouter from './adminRouter'

import authGaurd from '../middlewares/authGaurd'
const privateRouter = express.Router()

privateRouter.use('/user', authGaurd, userRouter)
// privateRouter.use('/admin', authGaurd, adminRouter)

export default privateRouter
