export default ({ app }, inject) => {
  const setCurrentFile = (file) => {
    let directory = file.directory.replace('.', '')
    directory = directory.replaceAll('//', '/').split('/')

    const dir = []

    directory.forEach((d) => {
      if (d) {
        dir.push({
          text: d,
          disabled: false,
        })
      }
    })

    app.store.commit('SET_CURRENT_FILE', {
      content: file.content,
      directory: dir,
    })

    return app.store.commit('SET_MAIN', 'Code')
  }
  inject('setCurrentFile', setCurrentFile)
}
