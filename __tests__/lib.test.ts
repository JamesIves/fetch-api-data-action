import {jest, describe, it, expect, beforeEach, afterEach} from '@jest/globals'
import type {Mock} from 'jest-mock'

jest.unstable_mockModule('@actions/core', () => ({
  info: jest.fn(),
  setFailed: jest.fn(),
  getInput: jest.fn(),
  exportVariable: jest.fn(),
  debug: jest.fn(),
  setOutput: jest.fn()
}))

const {exportVariable: mockExportVariable, setFailed: mockSetFailed} =
  (await import('@actions/core')) as {
    exportVariable: Mock
    setFailed: Mock
  }
const {action} = await import('../src/constants.js')
const {default: run} = await import('../src/lib.js')
await import('../src/main.js')

const originalAction = JSON.stringify(action)

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

    expect(mockExportVariable).toHaveBeenCalledTimes(1)
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

    expect(mockExportVariable).toHaveBeenCalledTimes(0)
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
      expect(mockSetFailed).toHaveBeenCalled()
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
      expect(mockSetFailed).toHaveBeenCalled()
    }
  })
})
