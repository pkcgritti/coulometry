<template lang="pug">
  v-data-table.elevation-5(
    light
    :headers="headers"
    :items="items"
    hide-actions
  )
    span(slot="no-data") Não há dados
    template(slot="items" slot-scope="props")
      td.dense-row {{ props.item.time }}
      td.dense-row {{ props.item.potential }}
      td.dense-row {{ props.item.current }}
</template>

<style lang="stylus" scoped>
  .dense-row
    height 25px
</style>

<script>
export default {
  props: ['items'],
  data: () => ({
    headers: [
      { text: 'Amostra', align: 'left', value: 'time' },
      { text: 'Diferença de Potencial', value: 'potential' },
      { text: 'Corrente', value: 'current' }
    ]
  })
};
</script>
