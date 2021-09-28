// import path from 'path'
// import fs from 'fs'

// const iconFiles = {
//   '.html': 'mdi-language-html5',
//   '.js': 'mdi-nodejs',
//   '.json': 'mdi-code-json',
//   '.md': 'mdi-language-markdown',
//   '.pdf': 'mdi-file-pdf',
//   '.png': 'mdi-file-image',
//   '.txt': 'mdi-file-document-outline',
//   '.xls': 'mdi-file-excel',
//   '.cpp': 'mdi-language-cpp',
// }

// const readFolder = (folder, fullDirectory) => {
//   const filelist = []

//   fs.readdirSync(folder).forEach((file) => {
//     if (fs.statSync(folder + path.sep + file).isDirectory()) {
//       filelist.push({
//         name: file,
//         children: readFolder(
//           `${folder}${path.sep}${file}${path.sep}`,
//           `${folder}${path.sep}${file}${path.sep}`
//         ),
//       })
//     } else {
//       filelist.push({
//         name: file,
//         icon: iconFiles[path.extname(file)],
//         directory: `${fullDirectory}${path.sep}${file}`,
//         content: fs.readFileSync(`${fullDirectory}${path.sep}${file}`, 'utf-8'),
//       })
//     }
//   })

//   return filelist
// }

import axios from 'axios'

export default ({ app }, inject) => {
  const readWorkspace = () => {
    // const workspaceDirectory = `.${path.sep}workspace${path.sep}`
    const filelist = axios.get('file/workspace').then((res) => {})

    return filelist
  }

  const createFileOrFolder = () => {
    app.store.commit(
      'SET_CREATE_FILE_OR_FOLDER',
      !app.store.state.createFileOrFolder
    )
  }

  const isSaved = (fileName) => {
    return app.store.state.fileNotSave.includes(fileName)
  }

  inject('readWorkspace', readWorkspace)
  inject('createFileOrFolder', createFileOrFolder)
  inject('isSaved', isSaved)
}
