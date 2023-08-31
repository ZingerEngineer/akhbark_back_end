import express from 'express'
import privateRouter from './privateRoutes'
import publicRouter from './publicRoutes'
import authGaurd from '../middlewares/authGaurd'

const router = express.Router()

//public routes
router.use('/', publicRouter)
//
//private routes
router.use('/', authGaurd, privateRouter)
