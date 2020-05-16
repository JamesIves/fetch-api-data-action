import {retrieveData, generateExport} from '../src/fetch'
import nock from 'nock'

jest.setTimeout(60000)

describe('fetch', () => {
  describe('retrieveData', () => {
    afterEach(nock.cleanAll)
    afterAll(nock.restore)

    it('should return some data', async () => {
      nock('https://jamesiv.es').get('/').reply(200, {
        data: '12345'
      })

      const data = await retrieveData({
        endpoint: 'https://jamesiv.es'
      })

      expect(data).toEqual({data: '12345'})
    })

    it('should handle the triple bracket replacements ', async () => {
      nock('https://jives.dev/')
        .post('/', {
          bestCat: 'Montezuma'
        })
        .reply(200, {
          data: '12345'
        })

      const data = await retrieveData({
        endpoint: 'https://jives.dev/',
        configuration: JSON.stringify({
          method: 'POST',
          body: {
            bestCat: '{{{ cat }}}'
          }
        }),
        auth: {cat: 'Montezuma'}
      })

      expect(data).toEqual({data: '12345'})
    })

    it('should error if improperly formatted json is passed in', async () => {
      try {
        nock('https://jamesiv.es').get('/').reply(200)

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
      nock('https://jamesiv.es').post('/').reply(404, {
        a: 1
      })

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

    it('should error if the response is not ok after several retrys', async () => {
      jest.setTimeout(1000000)

      try {
        nock('https://jives.dev').get('/').once().replyWithError({
          message: 'This is catastrophic'
        })

        nock('https://jives.dev').get('/').reply(200, {
          data: '12345'
        })

        await retrieveData({
          endpoint: 'https://jives.dev',
          retry: true
        })
      } catch (error) {
        expect(error.message).toBe(
          'There was an error fetching from the API: FetchError: invalid json response body at https://jives.dev/ reason: Unexpected token < in JSON at position 0'
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
