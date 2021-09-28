<template>
  <v-app
    dark
    style="background-color: #282a36; overflow: hidden; max-height: 100vh"
  >
    <v-navigation-drawer
      v-model="drawer"
      stateless
      clipped
      fixed
      app
      color="#343747"
      class="py-2"
    >
      <Explorer />
    </v-navigation-drawer>

    <v-app-bar
      clipped-left
      fixed
      app
      color="#191A21"
      dense
      flat
      style="magin: 0px important; padding: 0px !important"
    >
      <v-btn text class="m-0 p-0" small @click="drawer = !drawer">
        <v-icon color="#8CE9FE"> mdi-menu </v-icon>
      </v-btn>
      <p style="margin: 0" class="mx-3">
        {{ title_drawer }}
      </p>
      <v-btn text small @click="createFolder">
        <v-icon>mdi-folder-plus</v-icon>
      </v-btn>
      <v-btn text small @click="createFile">
        <v-icon>mdi-file-plus</v-icon>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon @click="compiler">
        <v-icon color="#8CE9FE" small>mdi-play-circle</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="#8CE9FE" small @click="$emit('drawer_bottom')">
          mdi-console
        </v-icon>
      </v-btn>

      <v-btn text @click="save_file">
        <v-icon color="#8CE9FE" small>mdi-content-save</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon color="#8CE9FE" small>mdi-code-tags-check</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main app>
      <v-speed-dial
        v-model="fab"
        :top="false"
        :bottom="true"
        :right="true"
        :left="false"
        direction="left"
        transition="scale"
        style="position: absolute"
      >
        <template #activator>
          <v-btn v-model="fab" color="#353747" dark fab>
            <v-icon v-if="fab"> mdi-close </v-icon>
            <v-icon v-else> mdi-dots-vertical </v-icon>
          </v-btn>
        </template>
        <v-btn fab dark small color="#191A20">
          <v-icon>mdi-file-multiple-outline</v-icon>
        </v-btn>
        <v-btn fab dark small color="#191A20">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn fab dark small color="#191A20">
          <v-icon>mdi-bug-check</v-icon>
        </v-btn>
      </v-speed-dial>

      <Nuxt />
      <ModalFile
        :open-dialog-file="openDialogFileCreate"
        @closeModalFile="openDialogFileCreate = !openDialogFileCreate"
      />
      <ModalFolder
        :open-dialog-folder="openDialogFolderCreate"
        @closeModalFolder="openDialogFolderCreate = !openDialogFolderCreate"
      />

      <ModalCompiler
        :open-dialog-compiler="openDialogCompiler"
        @closeModalCompiler="openDialogCompiler = !openDialogCompiler"
      />
    </v-main>

    <v-footer
      absolute
      app
      style="z-index: 999999"
      color="#191A21"
      height="25"
      class="text-center"
    >
      <span style="font-size: 10px">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer_explorer: true,
      title_drawer: '',
      drawer: true,
      fab: false,
      openDialogFileCreate: false,
      openDialogFolderCreate: false,
      openDialogCompiler: false,
    }
  },
  mounted() {
    this.title_drawer = this.$store.state.titleDrawer
  },
  methods: {
    closeModalFolder() {
      console.log('teste')
    },
    createFile() {
      this.openDialogFileCreate = !this.openDialogFileCreate
    },
    createFolder() {
      this.openDialogFolderCreate = !this.openDialogFolderCreate
    },
    compiler() {
      if (this.$store.state.currentFile.content !== '') {
        this.openDialogCompiler = !this.openDialogCompiler
        return
      }

      this.$toast.error('Nenhum arquivo selecionado!')
    },
    async save_file() {
      this.$store.commit(
        'REMOVE_FILE_NOT_SAVE',
        this.$store.state.currentFile.directory[
          this.$store.state.currentFile.directory.length - 1
        ].text
      )

      await this.$axios
        .post('file/write', { file: this.$store.state.currentFile })
        .then(({ data }) => {
          console.log(data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handle_main(explorer) {
      // this.$store.commit('SET_MAIN', 'Code')
      // console.log(this.$store.state.show_main)
      // this.$store.state.show_main = explorer
      // this.componentExplorer = explorer
    },
  },
}
</script>

<style scoped>
.v-btn--floating {
  position: relative;
}
.v-toolbar__content {
  margin: 0px !important;
  padding: 0px !important;
}
</style>
