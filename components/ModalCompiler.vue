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
          <v-stepper-step :complete="step > 1" step="1">
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

            <v-btn color="primary" @click="lexical"> Analisar tokens </v-btn>
            <v-btn color="success" @click="nextStep"> Próxima etapa </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">
            Análise Sintática
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-12" height="200px">
              oi
            </v-card>
            <v-btn color="primary" @click="step = 3"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
          </v-stepper-content>

          <v-stepper-step :complete="step > 2" step="2">
            Análise Semântica
          </v-stepper-step>
          <v-stepper-content step="2">
            <v-card color="grey lighten-1" class="mb-12" height="200px">
              oi
            </v-card>
            <v-btn color="primary" @click="step = 3"> Continue </v-btn>
            <v-btn text> Cancel </v-btn>
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
      headerTokens: [
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
        .post('/compiler', {
          content: this.$store.state.currentFile.content,
        })
        .then(({ data }) => {
          this.tokens = data.tokens
          this.parsed = data.parsed
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    nextStep() {},
  },
}
</script>

<style>
</style>
