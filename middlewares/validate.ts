import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'yup'

export const validateFn = <T extends Object>(
  schema: ObjectSchema<T>,
  data: T
) => {
  try {
    schema.validateSync(data)
    return true
  } catch {
    return false
  }
}

export const validate =
  <T extends Object>(schema: ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req.body

    if (validateFn(schema, data)) return next()

    return res.status(422).json({ message: 'Validation error' })
  }
