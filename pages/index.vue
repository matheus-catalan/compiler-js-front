<template>
  <v-row
    justify="center"
    align="center"
    style="height: 90vh; margin: 0px"
    class="m-0 p-0"
  >
    <client-only placeholder="Loading...">
      <component :is="$store.state.showMain" />
    </client-only>
  </v-row>
</template>

<script>
export default {
  mounted() {},
}
</script>
