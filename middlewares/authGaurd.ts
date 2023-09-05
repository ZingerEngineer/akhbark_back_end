import { Request, Response, NextFunction } from 'express'
const authGaurd = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.token

  if (!token || typeof token !== 'string')
    return res.status(401).json({ message: 'Unauthorized access' })

  return next()
}
export default authGaurd
