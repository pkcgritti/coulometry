<template lang="pug">
  async-dialog(ref="dialog" :payload="'marcos'" title="Atualização de conjunto de dados")
    v-flex(xs6)
      v-text-field(v-model="payload.name" light clearable label="Nome do arquivo")
    v-flex(xs6)
      v-text-field(v-model="payload.area" light type="number" label="Área (cm²)")
    v-flex(xs6)
      v-text-field(v-model="payload.current" light type="number" label="Corrente (mA)")
    v-flex(xs6)
      v-text-field(v-model="payload.samplingInterval" light type="number" step="0.5" label="Intervalo entre medições")
    v-flex(xs6)
      v-text-field(:value="payload.potential.length" light type="number" readonly label="Número de amostras")
    v-flex(xs6)
      v-select(
        light
        v-model="payload.material"
        :items="items"
        label="Material")
</template>

<script>
import AsyncDialog from '../async-dialog';

function initialState () {
  return {
    text: '',
    potential: [],
    name: '',
    current: 23,
    area: 2.6,
    samplingInterval: 0.5,
    material: '',
    startTime: 0
  };
}

export default {
  components: { AsyncDialog },
  methods: {
    open () {
      return this.$refs.dialog.open();
    }
  }
};
</script>
