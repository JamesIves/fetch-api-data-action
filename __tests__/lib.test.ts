import {exportVariable, setFailed} from '@actions/core'
import fetchMock, {enableFetchMocks} from 'jest-fetch-mock'
import {action} from '../src/constants'
import run from '../src/lib'
import '../src/main'
enableFetchMocks()

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
    fetchMock.mockResponseOnce(JSON.stringify({data: '12345'}))
    Object.assign(action, {
      endpoint: 'https://jamesiv.es'
    })
    await run(action)

    expect(exportVariable).toBeCalled()
  })

  it('should throw an error if no endpoint is provided', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({data: '12345'}))
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
    fetchMock.mockResponseOnce(JSON.stringify({data: '12345'}))
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
