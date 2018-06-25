<template lang="pug">
  v-dialog(:value="openned" persistent max-width="500px")
    v-card
      v-card-title
        span.headline Informações adicionais
      v-card-text
        v-container.grid-list-md
          v-layout(wrap)
            v-flex(xs12 sm6 md4)
              v-text-field(color="success" label="Nome do arquivo")
            v-flex(xs12 sm6 md4)
              v-text-field(color="success" label="Corrente (mA)")
            v-flex(xs12 sm6 md4)
              v-text-field(color="success" label="Nome do arquivo")
            v-flex(xs12 sm6 md6)
              v-text-field(color="success" label="Corrente (mA)")
            v-flex(xs12 sm6 md6)
              v-select(
                color="success"
                :items="['Cu', 'Alumínio', 'Ouro', 'Prata']"
                label="Age"
                required)
      v-card-actions
        v-spacer
        v-btn(flat @click.native="resolve(false)") Cancelar
        v-btn(color="primary" @click.native="resolve(true)") Enviar
</template>

<script>
export default {
  props: ['openned', 'resolver'],
  methods: {
    resolve (value) {
      this.resolver(value);
    }
  }
};
</script>
