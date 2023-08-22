import { object, string, number, date, InferType } from 'yup'

export const userLoginSchema = object({
  email: string().email().required(),
  password: string().required()
})

export const userRegisterSchema = object({
  userName: string().required(),
  email: string().email().required(),
  password: string().required()
})
