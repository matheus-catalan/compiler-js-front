<template>
  <v-dialog
    v-model="show"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-card-title>
        <v-btn icon dark @click="$emit('closeModalCompiler')">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Compilador</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-menu bottom right offset-y>
          <template #activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
        </v-menu>
      </v-card-title>
      <v-card-text>
        <v-stepper v-model="step" vertical loading>
          <v-stepper-step :complete="step > 1" step="1" editable>
            Analise lexica
            <small>Clique em continuar para fazer a analise lexica</small>
          </v-stepper-step>
          <v-stepper-content step="1">
            <v-data-table
              v-if="tokens.length > 0"
              :headers="headerTokens"
              :items="tokens"
              :items-per-page="5"
              class="elevation-1 mb-5"
            ></v-data-table>

            <v-btn v-if="!proccess.lexical" color="primary" @click="lexical">
              Analisar tokens
            </v-btn>
            <v-btn v-if="proccess.lexical" color="success" @click="nextStep">
              Próxima etapa
            </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2" editable>
            Análise Sintática
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-data-table
              :headers="headerSintatic"
              :items="parsed.body"
              :items-per-page="5"
              class="elevation-1 mb-5"
            ></v-data-table>

            <v-btn color="primary" @click="sintatic">
              Analisar Sintaticamente
            </v-btn>
            <v-btn v-if="proccess.sintatic" color="success" @click="nextStep">
              Próxima etapa
            </v-btn>
          </v-stepper-content>
        </v-stepper>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: { openDialogCompiler: { type: Boolean, default: false } },

  data() {
    return {
      step: 1,
      show: this.openDialogCompiler,
      tokens: [],
      proccess: {
        lexical: false,
        sintatic: false,
      },
      headerTokens: [
        {
          text: 'Tipo',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        { text: 'valor', value: 'value' },
      ],
      headerSintatic: [
        {
          text: 'Tipo',
          align: 'start',
          sortable: false,
          value: 'type',
        },
        { text: 'valor', value: 'value' },
      ],
      parsed: [],
    }
  },
  watch: {
    openDialogCompiler(newValue) {
      this.show = newValue
    },
  },
  methods: {
    async lexical() {
      await this.$axios
        .post('/compiler/lexical', {
          content: this.$store.state.currentFile.content,
        })
        .then(({ data }) => {
          if (typeof data.tokens === 'string') {
            this.$toast.error(data.tokens)
          } else {
            this.tokens = data.tokens
            this.proccess.lexical = true
          }
        })
        .catch((err) => {
          console.log(err, 'errr')
        })
    },
    async sintatic() {
      await this.$axios
        .post('/compiler/sintatic', {
          content: this.$store.state.currentFile.content,
        })
        .then(({ data }) => {
          console.log(data.parsed)
          this.parsed = data.parsed
          console.log(this.parsed.body)
          this.proccess.sintatic = true
        })
        .catch((err) => {
          console.log(err)
        })
    },
    nextStep() {
      this.step++
    },
  },
}
</script>

<style>
</style>
