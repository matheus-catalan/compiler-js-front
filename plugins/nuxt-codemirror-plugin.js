import Vue from 'vue'
import VueCodemirror from 'vue-codemirror'
// codemirror language
// import 'codemirror/mode/vue/vue.js'
import 'codemirror/mode/clike/clike'
// codemirror active-line.js
import 'codemirror/addon/selection/active-line.js'
// more codemirror resource...

// .setSize('100%', '100vh')

Vue.use(VueCodemirror)
