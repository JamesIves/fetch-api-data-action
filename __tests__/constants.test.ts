/* eslint-disable @typescript-eslint/no-require-imports -- constants.ts builds
   `action` once at module-load time, so each test needs a fresh, isolated
   require() after mocking @actions/core rather than the static top-level
   import used elsewhere. */

jest.mock('@actions/core')

describe('constants', () => {
  const mockGetInput = (values: Record<string, string>): void => {
    const core = require('@actions/core')
    core.getInput.mockImplementation((name: string) => values[name] ?? '')
  }

  beforeEach(() => {
    jest.resetModules()
  })

  it('parses truthy boolean string inputs and passes through string inputs', () => {
    mockGetInput({
      debug: 'TRUE',
      encoding: 'utf8',
      endpoint: 'https://example.com',
      configuration: '{"method":"GET"}',
      'token-endpoint': 'https://example.com/token',
      retry: 'true',
      'token-configuration': '{"method":"POST"}',
      'save-location': 'custom-location',
      'save-name': 'custom-name',
      'set-output': 'TRUE',
      format: 'txt',
      'variable-name': 'myVar'
    })

    const {action} = require('../src/constants.js')

    expect(action).toEqual({
      debug: true,
      encoding: 'utf8',
      endpoint: 'https://example.com',
      configuration: '{"method":"GET"}',
      tokenEndpoint: 'https://example.com/token',
      retry: true,
      tokenConfiguration: '{"method":"POST"}',
      saveLocation: 'custom-location',
      saveName: 'custom-name',
      setOutput: true,
      format: 'txt',
      variableName: 'myVar'
    })
  })

  it('defaults boolean inputs to false for unset/non-"true" values, case-insensitively', () => {
    mockGetInput({
      endpoint: 'https://example.com',
      debug: 'nope',
      retry: 'FALSE',
      'set-output': ''
    })

    const {action} = require('../src/constants.js')

    expect(action.debug).toBe(false)
    expect(action.retry).toBe(false)
    expect(action.setOutput).toBe(false)
  })

  it('is case-insensitive for truthy boolean values', () => {
    mockGetInput({
      endpoint: 'https://example.com',
      debug: 'True',
      retry: 'TrUe',
      'set-output': 'TRUE'
    })

    const {action} = require('../src/constants.js')

    expect(action.debug).toBe(true)
    expect(action.retry).toBe(true)
    expect(action.setOutput).toBe(true)
  })
})
