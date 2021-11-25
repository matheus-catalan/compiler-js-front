<template>
  <client-only>
    <div
      class="example d-flex align-center justify-center flex-column"
      style="background-color: #282a36"
    >
      <v-breadcrumbs :items="items" class="m-0 p-0" style="width: 100%">
        <template #divider>
          <v-icon>mdi-chevron-right</v-icon>
        </template>
      </v-breadcrumbs>

      <codemirror
        ref="cmEditor"
        v-model="code"
        class="codemirror"
        :options="cmOption"
        @cursorActivity="onCmCursorActivity"
        @ready="onCmReady"
        @focus="onCmFocus"
        @blur="onCmBlur"
      />
    </div>
  </client-only>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      dialog: true,
      code: '',
      cmOption: {
        tabSize: 4,
        styleActiveLine: true,
        lineNumbers: true,
        line: true,
        matchBrackets: true,
        mode: 'text/x-c++src',
        theme: 'dracula',
      },
      items: [],
    }
  },
  computed: {
    ...mapState({
      GET_CURRENT_FILE(state) {
        return state.currentFile
      },
    }),
  },
  watch: {
    GET_CURRENT_FILE(current) {
      this.code = current.content
      this.items = current.directory
    },
    code() {
      this.$store.commit('SET_CURRENT_FILE', {
        content: this.code,
        directory: this.items,
      })
    },
  },
  mounted() {
    this.code = this.$store.state.currentFile.content
    this.items = this.$store.state.currentFile.directory
  },
  methods: {
    onCmCursorActivity(cm) {
      cm.on('keypress', () => {
        this.$store.commit(
          'SET_FILE_NOT_SAVE',
          this.items[this.items.length - 1].text
        )
      })
      // console.log('onCmCursorActivity', cm)
    },
    onCmReady(cm) {
      cm.setSize('100%', '100vh')
      cm.on('keypress', () => {
        // cm.showHint({ completeSingle: false })
      })
    },
    onCmFocus(codemirror) {
      // console.log('onCmFocus', codemirror)
    },
    onCmBlur(codemirror) {
      // console.log('onCmBlur', codemirror)
    },
  },
}
</script>

<style scoped>
div.CodeMirror {
  height: 100vh !important;
}
</style>

<style lang="scss" scoped>
.example {
  margin-top: 48px;
  display: flex;
  height: 90vh;
  width: 100%;
  position: absolute;
  .codemirror {
    width: 100%;
    height: 100%;
    margin: 0;
    overflow: auto;
    font-size: 14px;
  }
}
</style>
