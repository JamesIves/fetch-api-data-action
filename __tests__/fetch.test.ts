import {retrieveData, generateExport} from '../src/fetch'
import nock from 'nock'

jest.setTimeout(1000000)
nock.enableNetConnect()

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

      expect(data).toEqual('{"data":"12345"}')
    })

    it('should handle the triple bracket replacements', async () => {
      nock('https://jives.dev/')
        .post('/', '{"bestCat":"montezuma"}')
        .reply(200, {
          data: '12345'
        })

      const data = await retrieveData({
        debug: true,
        endpoint: 'https://jives.dev/',
        configuration: JSON.stringify({
          method: 'POST',
          body: {
            bestCat: '{{{ cat }}}'
          }
        }),
        auth: '{"cat": "montezuma"}'
      })

      expect(data).toEqual('{"data":"12345"}')
    })

    it('should error if improperly formatted json is passed in', async () => {
      try {
        nock('https://jamesiv.es').get('/').reply(200)

        await retrieveData({
          debug: true,
          endpoint: 'https://example.com',
          configuration: '"{"method:"POST","body":{"bestCat":"{{{ cat }}}"}}"',
          auth: '{"cat: "montezuma"}'
        })
      } catch (error) {
        expect(error instanceof Error && error.message).toBe(
          "There was an error fetching from the API: TypeError: Cannot read properties of null (reading 'cat') ❌"
        )
      }
    })

    it('should error if the response is not ok', async () => {
      nock('https://jamesiv.es').post('/').reply(404, {
        a: 1
      })

      try {
        await retrieveData({
          debug: true,
          endpoint: 'https://jamesiv.es',
          configuration: JSON.stringify({
            method: 'POST',
            body: {
              bestCat: 'Montezuma'
            }
          })
        })
      } catch (error) {
        expect(error instanceof Error && error.message).toBe(
          'There was an error fetching from the API: Error: {"a":1} ❌'
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
          debug: true,
          endpoint: 'https://jives.dev',
          retry: true
        })
      } catch (error) {
        expect(error instanceof Error && error.message).toBe(
          'There was an error fetching from the API: FetchError: invalid json response body at https://jives.dev/ reason: Unexpected token < in JSON at position 0 ❌'
        )
      }
    })
  })

  describe('generateExport', () => {
    it('should save the file', async () => {
      await generateExport({
        data: '{"bestCat":"montezuma"}',
        setOutput: true
      })
      expect(process.env['fetchApiData']).toBe('{"bestCat":"montezuma"}')
    })

    it('should save non standard file types', async () => {
      await generateExport({
        data: 'hello',
        format: 'txt',
        saveLocation: 'fetch-api-data-custom',
        saveName: 'montezuma',
        setOutput: true
      })
      expect(process.env['fetchApiData']).toBe('hello')
    })

    it('should save the file with customized file location/names', async () => {
      await generateExport({
        data: '{"bestCat":"montezuma"}',
        saveLocation: 'fetch-api-data-custom',
        saveName: 'montezuma',
        setOutput: true
      })
      expect(process.env['fetchApiData']).toBe('{"bestCat":"montezuma"}')
    })

    it('should save file with custom encoding', async () => {
      await generateExport({
        data: '68656C6C6F21',
        encoding: 'hex',
        format: 'txt',
        saveName: 'hex-data',
        setOutput: true
      })
      expect(process.env['fetchApiData']).toBe('68656C6C6F21')
    })

    it('should fail if invalid encoding is used', async () => {
      try {
        await generateExport({
          data: '68656C6C6F21',
          encoding: 'hexxxxx' as BufferEncoding,
          format: 'txt',
          saveName: 'hex-data',
          setOutput: true
        })
      } catch (error) {
        expect(error instanceof Error && error.message).toBe(
          "There was an error generating the export file: TypeError [ERR_INVALID_ARG_VALUE]: The argument 'hexxxxx' is invalid encoding. Received 'encoding' ❌"
        )
      }
    })
  })
})
