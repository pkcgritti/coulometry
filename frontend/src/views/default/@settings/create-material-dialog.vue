<template lang="pug">
  async-dialog(ref="dialog" :payload="payload" :title="title")
    v-flex(xs12)
      v-text-field(v-model="payload.name" light clearable label="Nome do material")
</template>

<script>
import AsyncDialog from '@/components/async-dialog';

function initialState () {
  return {
    name: ''
  };
}

export default {
  data: () => ({
    payload: initialState(),
    title: 'Criação de material'
  }),
  components: { AsyncDialog },
  methods: {
    open (name) {
      this.title = (name && name !== '')
        ? 'Editar material'
        : 'Criar material';
      this.payload = initialState();
      if (typeof name === 'string') this.payload.name = name;
      return this.$refs.dialog.open();
    }
  }
};
</script>
