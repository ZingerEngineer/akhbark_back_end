// credentials coming in requests --> new user
/* new user = {
userName: 'username',
email: 'email@example.com',
password: '******we246' *bcrypted*
}
- user doesn't have id yet --> new user
- user doesn't have image.
- 
*/
// body parser handles request body converts to json.
//
import express from 'express'
import { Request, Response, NextFunction } from 'express'
import mongoose from 'mongoose'
import { userSchema } from '../../db/schemas/userSchema'
const login = express.Router()
login.post('/login', (req: Request, res: Response, next: NextFunction) => {
  mongoose.model(req.body.userName, userSchema)
})
