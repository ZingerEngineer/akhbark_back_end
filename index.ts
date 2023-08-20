import main from './mongoose'
import express, { Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv'
import bodyParser = require('body-parser')
dotenv.config()

const app = express()
const port = process.env.PORT
main()
app.use(bodyParser.json())
app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Express + TypeScript Server')
  console.log('Hey from app')
  console.log(req.body)
  next()
})
app.post('/post', (req: Request, res: Response, next: NextFunction) => {
  req.body = { name: 'kosomok' }
  res.send(req.body)
  next()
})
app.get('/user', (req: Request, res: Response, next: NextFunction) => {
  console.log('Hey from app/users')
  next()
})
app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})
