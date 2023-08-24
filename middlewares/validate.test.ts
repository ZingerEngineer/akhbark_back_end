import { object, string } from 'yup'
import { validateFn } from './validate'

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
})
