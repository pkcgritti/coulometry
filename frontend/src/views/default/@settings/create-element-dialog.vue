<template lang="pug">
  async-dialog(ref="dialog" :payload="payload" :title="title")
    v-flex(xs12)
      v-text-field(v-model="payload.name" light clearable label="Nome do elemento")
    v-flex(xs12)
      v-text-field(v-model="payload.molarMass" light type="number" label="Massa molar (g/mol)")
    v-flex(xs12)
      v-text-field(v-model="payload.density" light type="number" label="Massa específica (g/cm³)")
</template>

<script>
import AsyncDialog from '@/components/async-dialog';

function initialState () {
  return {
    name: '',
    molarMass: 0,
    density: 0
  };
}

export default {
  data: () => ({
    payload: initialState(),
    title: 'Criar elemento'
  }),
  components: { AsyncDialog },
  methods: {
    open (name) {
      this.title = (name && name !== '')
        ? 'Editar elemento'
        : 'Criar elemento';
      this.payload = initialState();
      if (typeof name === 'string') this.payload.name = name;
      return this.$refs.dialog.open();
    }
  }
};
</script>
