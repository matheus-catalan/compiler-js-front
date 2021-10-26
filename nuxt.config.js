import colors from 'vuetify/es5/util/colors'
import { POSITION } from 'vue-toastification'

export default {
  head: {
    titleTemplate: '%s - compiler-web',
    title: 'compiler-web',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  css: ['codemirror/lib/codemirror.css', 'codemirror/theme/dracula.css'],
  plugins: [
    '~/plugins/readWorkspace.js',
    '~/plugins/setCurrentFile.js',
    '~/plugins/file_handle.js',
    { src: '~plugins/nuxt-codemirror-plugin', ssr: false },
  ],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],
  modules: [
    '@nuxtjs/axios',
    [
      'vue-toastification/nuxt',
      {
        position: POSITION.TOP_CENTER,
        'z-index': '99999999999999999',
      },
    ],
  ],
  axios: {
    baseURL: 'https://compiler-js.herokuapp.com/',
  },
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty',
      }
    },
  },
}
