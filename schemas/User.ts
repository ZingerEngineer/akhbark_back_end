import { object, string, number, date, InferType } from 'yup'

export const userLoginSchema = object({
  email: string().email().required('email is required.'),
  password: string().required('password is required.')
})

export const userRegisterSchema = object({
  userName: string().required(),
  email: string().email().required('email is required.'),
  password: string().min(8).max(15).required('password is required.')
})

export const emailSchema = object({
  email: string().email().required('email is required.')
})
