<template>
  <!-- eslint-disable-next-line vue/no-mutating-props -->
  <v-dialog v-model="show" width="500" persistent>
    <v-card>
      <v-card-title class="text-h5"> Adicionar nova pasta </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="folderName"
          class="mt-5"
          filled
          label="ex: /folder_name/folder_name"
          clearable
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red darken-1" text @click="$emit('closeModalFolder')">
          Cancelar
        </v-btn>
        <v-btn color="green darken-1" text @click="createFolder">
          Salvar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: { openDialogFolder: { type: Boolean, default: false } },
  data() {
    return {
      folderName: '',
      show: this.openDialogFolder,
    }
  },
  watch: {
    openDialogFolder(newValue) {
      this.show = newValue
    },
  },
  methods: {
    async createFolder() {
      await this.$axios
        .post('folder', { folder_name: this.folderName })
        .then(() => {
          this.$createFileOrFolder()
          this.$emit('closeModalFolder')
        })
        .catch(() => {
          this.$toast.error('Pasta ja existe')
        })
    },
  },
}
</script>

<style>
</style>
