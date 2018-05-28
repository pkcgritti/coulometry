<template lang="pug">
  v-layout(column)
    v-flex
      span Nenhum arquivo selecionado
      v-tooltip(bottom)
        span Enviar um arquivo xlsm
        v-btn(icon slot="activator")
          v-icon cloud_upload
    v-layout(row)
      v-flex
        c-table(:items="items")
</template>

<script>
import CTable from '@/components/c-table'
export default {
  components: { CTable },
  data: () => ({
    items: [
      { sample: 1, potential: 0, current: 0 },
      { sample: 2, potential: 1, current: 2 }
    ]
  })
}
</script>
