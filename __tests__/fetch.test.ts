import {retrieveData, generateExport} from '../src/fetch'
import fetchMock, {enableFetchMocks} from 'jest-fetch-mock'
enableFetchMocks()

describe('fetch', () => {
  describe('retrieveData', () => {
    it('should return some data', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({data: '12345'}))

      const data = await retrieveData({
        endpoint: 'https://jamesiv.es'
      })

      expect(data).toEqual({data: '12345'})
    })

    it('should stringify settings.body if it exists', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({data: '12345'}))

      const data = await retrieveData({
        endpoint: 'https://jamesiv.es',
        configuration: JSON.stringify({
          method: 'POST',
          body: {
            bestCat: 'Montezuma'
          }
        }),
        isTokenRequest: true
      })

      expect(data).toEqual({data: '12345'})
    })

    it('should handle the triple bracket replacements ', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({data: '12345'}))

      await retrieveData({
        endpoint: 'https://jamesiv.es',
        configuration: JSON.stringify({
          method: 'POST',
          body: {
            bestCat: '{{{ cat }}}'
          }
        }),
        auth: {cat: 'Montezuma'}
      })

      expect(fetchMock).toBeCalledWith('https://jamesiv.es', {
        body: '{"bestCat":"Montezuma"}',
        method: 'POST'
      })
    })

    it('should error if improperly formatted json is passed in', async () => {
      try {
        await retrieveData({
          endpoint: 'https://example.com',
          configuration: '"{"method:"POST","body":{"bestCat":"{{{ cat }}}"}}"',
          auth: {cat: 'Montezuma'}
        })
      } catch (error) {
        expect(error.message).toBe(
          'There was an error fetching from the API: SyntaxError: Unexpected token m in JSON at position 3'
        )
      }
    })

    it('should error if the response is not ok', async () => {
      fetchMock.mockResponseOnce(JSON.stringify({a: 1}), {status: 404})
      try {
        await retrieveData({
          endpoint: 'https://jamesiv.es',
          configuration: JSON.stringify({
            method: 'POST',
            body: {
              bestCat: 'Montezuma'
            }
          })
        })
      } catch (error) {
        expect(error.message).toBe(
          'There was an error fetching from the API: Error: {"a":1}'
        )
      }
    })
  })

  describe('generateExport', () => {
    it('should save the file', async () => {
      await generateExport({
        data: {
          bestCat: 'montezuma'
        }
      })
      expect(process.env.FETCH_API_DATA).toBe('{"bestCat":"montezuma"}')
    })

    it('should save the file with customized file location/names', async () => {
      await generateExport({
        data: {
          bestCat: 'montezuma'
        },
        saveLocation: 'fetch-api-data-custom',
        saveName: 'montezuma'
      })
      expect(process.env.FETCH_API_DATA).toBe('{"bestCat":"montezuma"}')
    })
  })
})
