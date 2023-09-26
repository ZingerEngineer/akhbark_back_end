import { Request, Response, NextFunction } from 'express'
import { Maybe, ObjectSchema, StringSchema } from 'yup'

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

export const validateStringFn = <T extends Maybe<string>>(
  schema: StringSchema<T>,
  data: T
) => {
  try {
    schema.validateSync(data)
    return true
  } catch (error) {
    return error instanceof Error ? error.message : error
  }
}
export const validateTokenStringFn = <T extends Maybe<string>>(
  schema: StringSchema<T>,
  data: string
) => {
  try {
    schema.validateSync(data)
    return true
  } catch (error) {
    return error instanceof Error ? error.message : error
  }
}

export const validate =
  <T extends Object>(schema: ObjectSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req.body

    if (validateFn(schema, data)) return next()

    return res.status(422).json({ message: 'Validation error' })
  }

export const validateString =
  <T extends Maybe<string>>(schema: StringSchema<T>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const stringData = req.body

    if (validateStringFn(schema, stringData)) return next()

    return res.status(422).json({ message: 'Validation error' })
  }

export const validateTokenString =
  <T extends Maybe<string>>(schema: StringSchema<T>, tokenType: string) =>
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers[tokenType]
    if (typeof token !== 'string') throw new Error('nonstring')
    if (!token) throw new Error('undefined token')

    if (validateTokenStringFn(schema, token)) return next()

    return res.status(422).json({ message: 'Validation error' })
  }

export const validateResetPasswordDataFn = <
  T1 extends Object,
  T2 extends Object,
  T3 extends Maybe<string>
>(
  schema1: ObjectSchema<T1>,
  property1: T1,
  schema2: ObjectSchema<T2>,
  property2: T2,
  schema3: StringSchema<T3>,
  property3: string
) => {
  try {
    schema1.validateSync(property1)
    schema2.validateSync(property2)
    schema3.validateSync(property3)
    return true
  } catch (error) {
    return error instanceof Error ? error.message : error
  }
}

export const validateResetPasswordData =
  <T1 extends Object, T2 extends Object, T3 extends Maybe<string>>(
    schema1: ObjectSchema<T1>,
    schema2: ObjectSchema<T2>,
    schema3: StringSchema<T3>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { userEmail, password } = req.body
    const { reset_password_token } = req.headers
    if (!reset_password_token || typeof reset_password_token !== 'string')
      return res.status(400).json({ message: 'request headers are not valid' })
    const isValidCreateNewPassword = validateResetPasswordDataFn(
      schema1,
      userEmail,
      schema2,
      password,
      schema3,
      reset_password_token
    )
    if (isValidCreateNewPassword) return next()

    return res.status(422).json({ message: 'Validation error' })
  }
