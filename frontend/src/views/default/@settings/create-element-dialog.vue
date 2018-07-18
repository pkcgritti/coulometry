<template lang="pug">
  async-dialog(ref="dialog" :payload="payload" :title="title")
    v-flex(xs12)
      v-text-field(v-model="payload.name" light clearable label="Nome do elemento")
    v-flex(xs12)
      v-text-field(v-model="payload.molarMass" light type="number" label="Massa molar (g/mol)")
    v-flex(xs12)
      v-text-field(v-model="payload.density" light type="number" label="Massa específica (g/cm³)")
    v-flex(xs12)
      v-text-field(v-model="payload.nEletrons" light type="number" label="Número de elétrons (N)")
    v-flex(xs12)
      v-text-field(v-model="payload.meanPotential" light type="number" label="Potencial médio")
    v-flex(xs12)
      v-checkbox(v-model="payload.iteractive" light label="Utiliza rotina iterativa")
</template>

<script>
import AsyncDialog from '@/components/async-dialog';

function initialState () {
  return {
    name: '',
    molarMass: 0,
    density: 0,
    nEletrons: 1,
    meanPotential: 0,
    iteractive: false
  };
}

export default {
  data: () => ({
    payload: initialState(),
    title: 'Criar elemento'
  }),
  components: { AsyncDialog },
  methods: {
    open (element) {
      this.payload = initialState();
      if (typeof element === 'object') {
        this.title = 'Editar elemento';
        this.payload.name = element.name;
        this.payload.molarMass = element.molarMass;
        this.payload.density = element.density;
        this.payload.nEletrons = element.nEletrons;
        this.payload.meanPotential = element.meanPotential;
        this.payload.iteractive = element.iteractive;
      } else {
        this.title = 'Criar elemento';
      }
      return this.$refs.dialog.open();
    }
  }
};
</script>
