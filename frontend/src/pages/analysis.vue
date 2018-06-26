<template lang="pug">
  v-layout(wrap)
    v-flex(xs12)
      v-card(light)
        v-card-text
          c-chart(:dataset="dataset" ref="chart")
        v-card-actions
          v-chip.blue.darken-4.white--text(small) {{ points.length }} pontos de inflexão
          v-spacer
          v-btn(small round light flat style="text-transform: none;") Remover ponto
          v-btn(small round color="primary" style="text-transform: none;") Adicionar ponto
    v-flex(xs6 sm4 md3 v-for="(point, idx) in points" :key="idx")
      v-card(light)
        v-card-title
          span {{ idx + 1 }}º ponto - Composto indefinido
        v-card-text
          span Tempo: {{ point.time }} segundos
          br
          span Intervalo: {{ point.interval }} segundos
        v-card-actions
          v-spacer
          v-btn(small style="text-transform: none;") Desabilitar
    v-flex(xs12)
      c-table(:items="dataset.items")
</template>

<script>
import CTable from '@/components/c-table';
import CChart from '@/components/c-chart';
import FileDrop from '@/components/file-drop';
export default {
  components: { CTable, CChart, FileDrop },
  data: () => ({
    entity: null,
    dataset: {
      items: []
    },
    points: [
      { time: 5.0, interval: 10.0 },
      { time: 15.0, interval: 15.0 },
      { time: 20.0, interval: 30.0 },
      { time: 5.0, interval: 10.0 },
      { time: 15.0, interval: 15.0 },
      { time: 20.0, interval: 30.0 }
    ]
  }),
  mounted () {
    const id = this.$route.params.id;
    if (!id) {
      this.$router.go(-1);
    } else {
      this.$axios.get('/dataset/' + id)
        .then(data => {
          this.entity = data.payload;
          this.dataset.items = this.entity.voltage.map((v, i) => {
            return {
              time: Math.round(i * this.entity.samplingInterval * 10e2) / 10e2,
              potential: Math.round(v * 10e4) / 10e4,
              current: this.entity.current
            };
          });
          this.$refs.chart.updateChart();
        })
        .catch(err => {
          console.error(err.name, err.message);
          this.$router.go(-1);
        });
    }
  }
};
</script>
