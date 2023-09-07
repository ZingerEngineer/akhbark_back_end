import { Request, Response, NextFunction } from 'express'
import { decode } from 'jsonwebtoken'
const roleGaurd = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token
  if (!token || typeof token !== 'string')
    return res.status(401).json({ message: 'Unauthorized access' })
  const data = decode(token)
}
export default roleGaurd
