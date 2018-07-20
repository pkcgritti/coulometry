<template lang="pug">
  v-layout(column)
    v-flex
      file-table(:items="items" :materials="materials" @update="refreshTable")
</template>

<script>
import FileTable from '@/components/file-table';
export default {
  components: { FileTable },
  data: () => ({
    items: [
      // { _id: 1, name: 'analise_210_53.csv', material: 'Cu', processed: false, uploadedAt: new Date('2018/06/01') },
      // { _id: 2, name: 'analise_321_40.csv', material: 'Ag', processed: true, uploadedAt: 133123123 },
      // { _id: 3, name: 'cobre.csv', material: 'Ag', processed: true, uploadedAt: 1231341234 }
    ],
    materials: []
  }),
  methods: {
    refreshTable () {
      this.$axios.get('/dataset')
        .then(data => {
          this.items = data.payload;
        });
      this.$axios.get('/material')
        .then(data => {
          this.materials = data.payload;
        });
    }
  },
  mounted () {
    this.refreshTable();
  }
};
</script>
