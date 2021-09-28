import fs from 'fs'
import path from 'path'
// const fs = (process.server ? require(‘fs-extra’) : null)

export default ({ app }, inject) => {
  const createFile = (fileName) => {
    const workspaceDirectory = `.${path.sep}workspace${path.sep}`

    fs.writeFile(
      `${workspaceDirectory}${fileName}`,
      'Hello content!',
      function (err) {
        if (err) throw err
      }
    )
  }

  inject('createFile', createFile)
}
