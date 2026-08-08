import {
  extractErrorMessage,
  hasRequiredParameters,
  isNullOrUndefined,
  parseData
} from '../src/util'

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

  describe('hasRequiredParameters', () => {
    it('throws when endpoint is missing', () => {
      expect(() =>
        hasRequiredParameters({
          endpoint: '',
          configuration: '',
          setOutput: false
        })
      ).toThrow(
        'You must provide the action with at least an endpoint to retrieve data from.'
      )
    })

    it('does not throw when endpoint is provided', () => {
      expect(() =>
        hasRequiredParameters({
          endpoint: 'https://example.com',
          configuration: '',
          setOutput: false
        })
      ).not.toThrow()
    })
  })

  describe('parseData', () => {
    it('parses valid JSON', () => {
      expect(parseData('{"cat":"montezuma"}')).toEqual({cat: 'montezuma'})
    })

    it('returns null for invalid JSON', () => {
      expect(parseData('{cat: montezuma}')).toBeNull()
    })

    it('returns null for an empty string', () => {
      expect(parseData('')).toBeNull()
    })
  })
})
