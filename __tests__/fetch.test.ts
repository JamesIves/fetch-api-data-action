import {retrieveData, generateExport} from '../src/fetch'

jest.mock('@actions/core')
jest.mock('@actions/io')

jest.setTimeout(1000000)

describe('fetch', () => {
  describe('retrieveData', () => {
    afterEach(() => {
      jest.clearAllMocks()
    })

    it('should return some data', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({data: '12345'}),
        text: jest.fn().mockResolvedValue('{"data":"12345"}')
      })

      const data = await retrieveData({
        endpoint: 'https://jamesiv.es'
      })

      expect(data).toEqual('{"data":"12345"}')
    })

    it('should handle the triple bracket replacements', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue({data: '12345'}),
        text: jest.fn().mockResolvedValue('{"data":"12345"}')
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
      global.fetch = jest.fn().mockResolvedValue({
        ok: false,
        json: jest.fn().mockResolvedValue({a: 1}),
        text: jest.fn().mockResolvedValue('{"a":1}')
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

    it('should error if the response is not ok after several retries', async () => {
      jest.setTimeout(1000000)
      global.fetch = jest
        .fn()
        .mockRejectedValueOnce(new Error('This is catastrophic'))
        .mockResolvedValueOnce({
          ok: true,
          json: jest.fn().mockResolvedValue({data: '12345'}),
          text: jest.fn().mockResolvedValue('{"data":"12345"}')
        })

      try {
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

    it('should save non-standard file types', async () => {
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

    it('should export using a custom variable name', async () => {
      await generateExport({
        data: '{"bestCat":"montezuma"}',
        setOutput: true,
        variableName: 'customCatVariable'
      })
      expect(process.env['customCatVariable']).toBe('{"bestCat":"montezuma"}')
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
          "There was an error generating the export file: TypeError [ERR_INVALID_ARG_VALUE]: The argument 'encoding' is invalid encoding. Received 'hexxxxx' ❌"
        )
      }
    })
  })
})
