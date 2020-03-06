import '../src/main'
import {action} from '../src/constants'
import run from '../src/lib'
import {exportVariable, setFailed} from '@actions/core'

const originalAction = JSON.stringify(action)

jest.mock('@actions/core', () => ({
  setFailed: jest.fn(),
  getInput: jest.fn(),
  exportVariable: jest.fn()
}))

describe('lib', () => {
  afterEach(() => {
    Object.assign(action, JSON.parse(originalAction))
  })

  it('should run through the commands', async () => {
    Object.assign(action, {
      endpoint: 'https://jamesiv.es'
    })
    await run(action)

    expect(exportVariable).toBeCalled()
  })

  it('should throw an error if no endpoint is provided', async () => {
    Object.assign(action, {
      endpoint: null
    })

    try {
      await run(action)
    } catch (error) {
      expect(setFailed).toBeCalled()
    }
  })

  it('should fetch data if a token endpoint is provided', async () => {
    Object.assign(action, {
      endpoint: 'https://jamesiv.es',
      tokenEndpoint: 'https://jamesiv.es',
      tokenConfiguration: JSON.stringify({method: 'GET'})
    })

    try {
      await run(action)
    } catch (error) {
      expect(setFailed).toBeCalled()
    }
  })
})
