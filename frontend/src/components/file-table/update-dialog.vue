<template lang="pug">
  async-dialog(ref="dialog" :payload="'marcos'" title="Atualização de conjunto de dados")
    v-flex(xs12) Hello
    v-flex(xs12) World
</template>

<script>
import AsyncDialog from '../async-dialog';
export default {
  components: { AsyncDialog },
  methods: {
    open () {
      return this.$refs.dialog.open();
    }
  }
};
</script>
