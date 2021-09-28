<template>
  <div>
    <v-treeview
      v-model="tree"
      :items="files"
      item-key="name"
      open-on-click
      expand-icon="mdi-chevron-down"
      class="m-0 p-0"
      activatable
      color="#191A20"
    >
      <template #prepend="{ item, open }">
        <v-icon v-if="!item.icon" small>
          {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
        </v-icon>
        <v-icon v-else small>
          {{ item.icon }}
        </v-icon>
      </template>

      <template slot="label" slot-scope="{ item }">
        <div class="d-flex align-center justify-center">
          <a
            class="white--text d-flex align-center"
            style="width: 100%"
            @click="handle_file(item)"
          >
            {{ item.name }}
            <v-badge
              color="pink"
              center
              dot
              v-if="$isSaved(item.name)"
              class="pl-2"
            ></v-badge>
          </a>
          <v-btn text small @click="delete_file(item)">
            <v-icon small>mdi-delete</v-icon>
          </v-btn>
        </div>
      </template>
    </v-treeview>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [],
      tree: [],
      drawer_explorer: false,
    }
  },
  mounted() {
    this.getFiles()
  },
  methods: {
    async getFiles() {
      await this.$axios.get('file/workspace').then(({ data }) => {
        this.files = data
      })
    },
    handle_file(file) {
      if (file.content !== undefined) {
        this.$setCurrentFile(file)
      }
    },
    async delete_file(file) {
      console.log(file)
      await this.$axios
        .post('file/delete', {
          directory: file.directory === undefined ? file.name : file.directory,
        })
        .then(() => {
          this.$createFileOrFolder()
        })
        .catch((err) => {
          console.log(err)
        })
    },
  },
  watch: {
    '$store.state.createFileOrFolder'() {
      this.getFiles()
    },
  },
}
</script>

<style>
</style>
