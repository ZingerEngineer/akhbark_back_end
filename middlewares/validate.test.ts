import { object, string } from 'yup'
import {
  validateFn,
  validateResetPasswordDataFn,
  validateString,
  validateStringFn,
  validateTokenStringFn
} from './validate'

describe('Validate Middleware', () => {
  it('should work', () => {
    const testSchema = object({
      email: string().required()
    })
    const testData = {
      email: 'ramy@gg.com'
    }
    const res = validateFn(testSchema, testData)

    expect(res).toBe(true)
  })

  it('should work', () => {
    const testSchema = object({
      email: string().email().required()
    })
    const testData = {
      email: 'ramy@gg.com'
    }
    const res = validateFn(testSchema, testData)

    expect(res).toBe(true)
  })

  it('should fail', () => {
    const testSchema = object({
      email: string().required(),
      password: string().required()
    })
    const testData = {
      email: 'ramy@gg.com'
    }
    const res = validateFn(testSchema, testData)

    expect(res).toBe(false)
  })
  it('should work', () => {
    const testSchema1 = object({
      email: string().email().required()
    })

    const testSchema2 = object({
      password: string().required()
    })
    const testSchema3 = string()
    const email = {
      email: 'ramy@gg.com'
    }
    const passwordObj = {
      password: '131231331123'
    }
    const token = 'eeee'
    const res = validateResetPasswordDataFn(
      testSchema1,
      email,
      testSchema2,
      passwordObj,
      testSchema3,
      token
    )

    expect(res).toBe(true)
  })
  it('should work', () => {
    const testSchema1 = string()

    const stringWord = 'eeee'
    const res = validateStringFn(testSchema1, stringWord)

    expect(res).toBe(true)
  })
  it('should work', () => {
    const testSchema1 = string()

    const stringWord = 'eeee'
    const res = validateTokenStringFn(testSchema1, stringWord)

    expect(res).toBe(true)
  })
})
