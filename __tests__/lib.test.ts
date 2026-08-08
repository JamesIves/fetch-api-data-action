import {exportVariable, setFailed} from '@actions/core'
import {action} from '../src/constants'
import run from '../src/lib'
import '../src/main'

const originalAction = JSON.stringify(action)

jest.mock('@actions/core')

describe('lib', () => {
  beforeEach(() => {
    jest.clearAllMocks()

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({data: '12345'}),
      text: jest.fn().mockResolvedValue('{"data":"12345"}'),
      ok: true
    })
  })

  afterEach(() => {
    Object.assign(action, JSON.parse(originalAction))
  })

  it('should run through the commands', async () => {
    Object.assign(action, {
      debug: true,
      endpoint: 'https://jives.dev',
      setOutput: true
    })

    await run(action)

    expect(exportVariable).toHaveBeenCalledTimes(1)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jives.dev',
      expect.any(Object)
    )
  })

  it('should run through the commands but not save output', async () => {
    Object.assign(action, {
      debug: true,
      endpoint: 'https://jives.dev',
      setOutput: false
    })

    await run(action)

    expect(exportVariable).toHaveBeenCalledTimes(0)
    expect(global.fetch).toHaveBeenCalledWith(
      'https://jives.dev',
      expect.any(Object)
    )
  })

  it('should throw an error if no endpoint is provided', async () => {
    Object.assign(action, {
      debug: true,
      endpoint: null
    })

    try {
      await run(action)
    } catch (error) {
      console.error(error)
      expect(setFailed).toHaveBeenCalled()
    }
  })

  it('should fetch data if a token endpoint is provided', async () => {
    Object.assign(action, {
      debug: true,
      endpoint: 'https://jamesiv.es',
      tokenEndpoint: 'https://jamesiv.es',
      tokenConfiguration: JSON.stringify({method: 'GET'})
    })

    try {
      await run(action)
    } catch (error) {
      console.error(error)
      expect(setFailed).toHaveBeenCalled()
    }
  })
})
