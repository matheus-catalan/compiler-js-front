export const state = () => ({
  showMain: 'Nothing',
  titleDrawer: 'Explorer',
  workspace: '',
  files: [],
  currentFile: {
    content: '',
    directory: [],
  },
  createFileOrFolder: false,
  fileNotSave: [],
})

export const mutations = {
  SET_MAIN(state, showMain) {
    state.showMain = showMain
  },
  SET_CURRENT_FILE(state, currentFile) {
    state.currentFile = currentFile
  },
  SET_FILES(state, files) {
    state.files = files
  },
  SET_CREATE_FILE_OR_FOLDER(state, createFileOrFolder) {
    state.createFileOrFolder = createFileOrFolder
  },
  SET_FILE_NOT_SAVE(state, fileNotSave) {
    state.fileNotSave.includes(fileNotSave) ||
      state.fileNotSave.push(fileNotSave)
  },
  REMOVE_FILE_NOT_SAVE(state, fileNotSave) {
    console.log(state.fileNotSave.splice(fileNotSave))
  },
}

export const getters = {
  GET_CURRENT_FILE(state) {
    return state.currentFile
  },
}

export const actions = {
  nuxtServerInit({ commit, dispatch }, { req }, vuexContext, context) {
    this.commit('SET_FILES', this.$readWorkspace())
  },
}
