<template lang="pug">
  v-dialog(:value="visible" persistent max-width="500px")
    v-card(light)
      v-card-title
        span.headline {{ title }}
      v-card-text
        v-container.grid-list-md
          v-layout(wrap)
            slot
      v-card-actions
        v-spacer
        v-btn(flat light @click.native="resolve(false)") Cancelar
        v-btn(color="primary" @click.native="resolve(true)") Enviar
</template>

<script>
export default {
  props: ['payload', 'title'],
  data: () => ({
    resolver: null,
    visible: false
  }),
  methods: {
    open () {
      return new Promise(resolve => {
        this.resolver = resolve;
        this.visible = true;
      });
    },
    resolve (choice) {
      if (this.resolver) {
        this.resolver({
          choice,
          payload: this.payload
        });
        this.visible = false;
        this.resolver = null;
      }
    }
  }
};
</script>
