import {exportVariable, setFailed} from '@actions/core'
import nock from 'nock'
import {action} from '../src/constants'
import run from '../src/lib'
import '../src/main'

const originalAction = JSON.stringify(action)

jest.mock('@actions/core', () => ({
  info: jest.fn(),
  setFailed: jest.fn(),
  getInput: jest.fn(),
  exportVariable: jest.fn()
}))

describe('lib', () => {
  beforeEach(() => {
    nock('https://jamesiv.es').get('/').reply(200, {
      data: '12345'
    })
  })

  afterEach(() => {
    nock.restore()
    Object.assign(action, JSON.parse(originalAction))
  })

  afterEach(nock.cleanAll)

  it('should run through the commands', async () => {
    Object.assign(action, {
      debug: true,
      endpoint: 'https://jamesiv.es',
      setOutput: true
    })
    await run(action)

    expect(exportVariable).toHaveBeenCalled()
  })

  it('should run through the commands but not save output', async () => {
    Object.assign(action, {
      debug: true,
      endpoint: 'https://jamesiv.es',
      setOutput: false
    })
    await run(action)

    expect(exportVariable).toHaveBeenCalledTimes(0)
  })

  it('should throw an error if no endpoint is provided', async () => {
    Object.assign(action, {
      debug: true,
      endpoint: null
    })

    try {
      await run(action)
    } catch (error) {
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
      expect(setFailed).toHaveBeenCalled()
    }
  })
})
