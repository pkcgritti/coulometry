<template lang="pug">
  async-dialog(ref="dialog" :payload="payload" title="Atualização de conjunto de dados")
    v-flex(xs6)
      v-text-field(v-model="payload.name" light clearable label="Nome do arquivo")
    v-flex(xs6)
      v-text-field(v-model="payload.area" light type="number" label="Área (cm²)")
    v-flex(xs6)
      v-text-field(v-model="payload.current" light type="number" label="Corrente (mA)")
    v-flex(xs6)
      v-select(
        light
        v-model="payload.material"
        :items="items"
        label="Material")
    v-flex(xs12)
      v-text-field(v-model="payload.expositionTime" light type="number" label="Tempo de exposição em campo (dias)")
</template>

<script>
import AsyncDialog from '../async-dialog';

function initialState () {
  return {
    name: '',
    current: 23,
    area: 2.6,
    material: '',
    expositionTime: 45
  };
}

export default {
  data: () => ({
    payload: initialState(),
    items: []
  }),
  components: { AsyncDialog },
  methods: {
    open (curr) {
      this.payload = initialState();
      return this.$axios.get('dataset/' + curr._id)
        .then(data => {
          const dataset = data.payload;
          this.payload.name = dataset.name;
          this.payload.area = dataset.area || 2.6;
          this.payload.current = dataset.current || 23;
          this.payload.material = dataset.material;
          this.payload.expositionTime = dataset.expositionTime || 45;
          console.log('Current payload is', this.payload);
          return this.$axios.get('material')
            .then(data => {
              this.items = data.payload.map(material => ({
                value: material._id,
                text: material.name
              }));
              return this.$refs.dialog.open();
            });
        });
    }
  }
};
</script>
