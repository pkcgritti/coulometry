<template lang="pug">
  v-data-table(
    :headers="headers"
    :items="items"
    light)
    template(slot="items" slot-scope="props")
      td
        v-icon(color="green") insert_drive_file
      td {{ props.item.name }}
      td {{ props.item.processed ? 'Sim' : 'Não' }}
      td {{ Date(props.item.uploadedAt).toLocaleString() }}
      td
        v-btn.no-caps(small color="blue" outlin fab)

</template>

<style>
</style>

<script>
export default {
  props: ['items'],
  data: () => ({
    headers: [
      { align: 'left', sortable: false, width: 1 },
      { text: 'Nome do arquivo', align: 'left', sortable: true, value: 'name' },
      { text: 'Processado', align: 'left', sortable: true, value: 'processed', width: 1 },
      { text: 'Adicionado em', align: 'left', sortable: true, value: 'uploadedAt', width: 1 },
      { align: 'right', sortable: false, width: 1 }
    ]
  })
}
</script>
