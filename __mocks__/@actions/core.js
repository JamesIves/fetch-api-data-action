module.exports = {
  debug: jest.fn(),
  exportVariable: jest.fn((name, val) => {
    process.env[name] = val
  }),
  getInput: jest.fn(),
  info: jest.fn(),
  setFailed: jest.fn(),
  setOutput: jest.fn()
}
