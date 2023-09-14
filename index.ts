import dotenv from 'dotenv'
dotenv.config()
import express, { Request, Response, NextFunction } from 'express'
import bodyParser = require('body-parser')
import { dbConnection } from './services/dbConnection'
import router from './routes/index'
import cors from 'cors'
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204
}

const app = express()
const port = process.env.PORT

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.use('/', router)
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Connected')
  next()
})
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
  dbConnection()
})
