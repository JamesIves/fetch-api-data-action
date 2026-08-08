module.exports = {
  mkdirP: jest.fn(dir =>
    require('fs/promises')
      .mkdir(dir, {recursive: true})
      .catch(() => {})
  )
}
