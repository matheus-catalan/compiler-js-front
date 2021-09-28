<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <v-dialog v-model="show" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5"> Adicionar novo arquivo </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="fileName"
          class="mt-5"
          filled
          label="ex: /folder_name/file_name"
          clearable
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="$emit('closeModalFile')">
          Cancelar
        </v-btn>
        <v-btn color="green darken-1" text @click="createFile"> Salvar </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: { openDialogFile: { type: Boolean, default: false } },
  data() {
    return {
      fileName: '',
      show: this.openDialogFile,
    }
  },
  watch: {
    openDialogFile(newValue) {
      this.show = newValue
    },
  },
  methods: {
    async createFile() {
      await this.$axios
        .post('file', { file_name: this.fileName })
        .then(() => {
          this.$createFileOrFolder()
          this.$emit('closeModalFile')
        })
        .catch(() => {
          this.$toast.error('Arquivo ja existe')
        })
    },
  },
}
</script>

<style>
</style>
