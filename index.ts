import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response, NextFunction } from 'express'
import bodyParser = require('body-parser')
import { dbConnection } from './services/dbConnection'
import router from './routes/index'

const app = express()
const port = process.env.PORT

app.use(bodyParser.json())
app.use('/', router)
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  dbConnection()
})
