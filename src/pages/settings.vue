<template lang="pug">
  v-layout(column)
    v-flex
      file-drop
    v-flex
      span Nenhum arquivo selecionado
      v-tooltip(bottom)
        span Enviar um arquivo xlsm
        v-btn(icon slot="activator")
          v-icon cloud_upload
    v-flex
      c-table(:items="items")
</template>

<script>
import CTable from '@/components/c-table'
import FileDrop from '@/components/file-drop'
export default {
  components: { CTable, FileDrop },
  data: () => ({
    items: [
      { sample: 1, potential: 0, current: 0 },
      { sample: 2, potential: 1, current: 2 }
    ]
  })
}
</script>
