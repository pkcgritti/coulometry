<template lang="pug">
  v-app(dark)
    v-toolbar(app flat dense)
      v-toolbar-title {{ routeName }}
      v-spacer
      v-toolbar-items
        v-btn(flat @click="$router.push('/')" :color="$route.name === 'Gerenciamento de arquivos' ? 'blue' : undefined")
          v-icon attach_file
        v-btn(flat @click="$router.push({ name: 'Default/Settings' })" :color="$route.name === 'Configurações' ? 'blue' : undefined")
          v-icon settings
    v-content
      v-container.grid-list-lg(fluid)
        router-view
</template>

<style lang="stylus">
.toolbar__content
  .toolbar__items
    .btn
      .btn--flat
        .active
          background red
</style>

<script>
export default {
  computed: {
    routeName () {
      switch (this.$route.name) {
        case 'Default/Index': return 'Gerenciamento de arquivos';
        case 'Default/Analysis': return 'Análise';
        case 'Default/Settings': return 'Configurações';
      }
    }
  }
};
</script>
