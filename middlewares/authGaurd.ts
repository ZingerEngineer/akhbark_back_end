import { Request, Response, NextFunction } from 'express'
import { IUser } from '../interfaces/User'
const authGaurd =
  (user: IUser) => (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.body

    if (token) return next()

    return res.status(401).json({ message: 'Unauthorized access' })
  }
export default authGaurd
