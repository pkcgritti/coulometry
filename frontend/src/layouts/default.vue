<template lang="pug">
  v-app(dark)
    v-toolbar(app flat dense)
      v-toolbar-title {{ $route.name }}
      v-spacer
      v-toolbar-items
        v-btn(flat @click="$router.push('/')" :color="$route.name === 'Gerenciamento de arquivos' ? 'blue' : undefined")
          v-icon attach_file
        v-btn(flat @click="$router.push('/analysis')" :color="$route.name === 'Analise de dados' ? 'blue' : undefined")
          v-icon trending_up
        v-btn(flat @click="$router.push('/settings')" :color="$route.name === 'Configurações' ? 'blue' : undefined")
          v-icon settings
    v-content
      v-container(fluid)
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

}
</script>
