import {extractErrorMessage, isNullOrUndefined} from '../src/util'

describe('util', () => {
  describe('isNullOrUndefined', () => {
    it('should return true if the value is null', async () => {
      const value = null
      expect(isNullOrUndefined(value)).toBeTruthy()
    })

    it('should return true if the value is undefined', async () => {
      const value = undefined
      expect(isNullOrUndefined(value)).toBeTruthy()
    })

    it('should return false if the value is defined', async () => {
      const value = 'montezuma'
      expect(isNullOrUndefined(value)).toBeFalsy()
    })
  })

  describe('extractErrorMessage', () => {
    it('gets the message of a Error', () => {
      expect(extractErrorMessage(new Error('a error message'))).toBe(
        'a error message'
      )
    })

    it('gets the message of a string', () => {
      expect(extractErrorMessage('a error message')).toBe('a error message')
    })

    it('gets the message of a object', () => {
      expect(extractErrorMessage({special: 'a error message'})).toBe(
        `{"special":"a error message"}`
      )
    })
  })
})
