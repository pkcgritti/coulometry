<template lang="pug">
  v-layout(column)
    file-table(:items="items")
</template>

<script>
import FileTable from '@/components/file-table'
export default {
  components: { FileTable },
  data: () => ({
    items: [
      { _id: 1, name: 'analise_210_53.csv', processed: false, uploadedAt: 123123123 },
      { _id: 2, name: 'analise_321_40.csv', processed: true, uploadedAt: 133123123 },
      { _id: 3, name: 'cobre.csv', processed: true, uploadedAt: 1231341234 }
    ]
  })
}
</script>
