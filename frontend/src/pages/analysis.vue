<template lang="pug">
  v-layout(wrap)
    v-flex(xs12 sm12 md6)
      v-card(light)
        v-card-text
          c-chart(:dataset="dataset" ref="chart")
    v-flex(xs12 sm12 md6)
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
    }
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
