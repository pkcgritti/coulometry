<template lang="pug">
  v-layout(wrap)
    v-flex(xs12)
      v-card(light)
        v-card-text
          c-chart(:dataset="dataset" ref="chart")
        v-card-actions
          v-chip.blue.darken-4.white--text(small) {{ dataset.points.length }} pontos de inflexão
          v-spacer
          v-btn(small round light flat style="text-transform: none;" @click="removePoint") Remover ponto
          v-btn(small round color="primary" style="text-transform: none;" @click="addPoint") Adicionar ponto
    v-flex(xs6 sm4 md3 v-for="(point, idx) in entity.results" :key="idx")
      v-card(light style="border-top-right-radius: 0; border-top-left-radius: 0")
        v-card-title.pa-2.primary.white--text
          span {{ idx + 1 }}º ponto de inflexão {{ point.index }}
          v-spacer
          .point-icon(:style="point.style")
        v-card-text.pa-2(v-if="point.ignorable")
          table.param-table
            tbody
              tr
                td.header Tempo
                td.value {{ point.time }} segundos
              tr
                td.header(colspan="2" style="font-size: 1.1em") Ponto de inflexão desabilitado
        v-card-text.pa-2(v-else)
          table.param-table
            tbody
              tr
                td.header Tempo
                td.value {{ Math.round(point.center  * 100) / 100 }} segundos
              tr
                td.header Intervalo
                td.value {{ Math.round(point.interval * 100) / 100 }} segundos
              tr
                td.header Elemento
                td.value Elemento indefinido
        v-card-actions
          v-spacer
          v-btn(small style="text-transform: none;" @click="togglePoint(idx)") {{ point.ignorable ? 'Habilitar' : 'Desabilitar' }}
    v-flex(xs12)
      c-table(:items="dataset.items")
</template>

<script>
import CTable from '@/components/c-table';
import CChart from '@/components/c-chart';
import FileDrop from '@/components/file-drop';

const BACKGROUNDS = ['#F44336', '#9C27B0', '#3F51B5', '#03A9F4', 'black', '#8BC34A', '#FFEB3B', '#FF9800', '#795548', '#009688'];

function pickFrom (array, index) {
  return array[index % array.length];
}

function pickBackground (index) {
  return pickFrom(BACKGROUNDS, index);
}

function generateColor (index) {
  return {
    background: pickBackground(index)
  };
}

export default {
  components: { CTable, CChart, FileDrop },
  data: () => ({
    entity: {
      current: 0,
      name: '',
      samplingInterval: 0.5,
      results: [],
      ignore: []
    },
    dataset: {
      items: [],
      points: []
    }
  }),
  methods: {
    togglePoint (idx) {
      this.$axios.get(`dataset/${this.entity._id}/togglepoint/${idx}`)
        .then(data => {
          if (this.entity.ignore.includes(idx)) {
            this.entity.ignore = this.entity.ignore.filter(v => v !== idx);
          } else {
            this.entity.ignore.push(idx);
          }
          this.updateData();
        });
    },
    addPoint () {
      this.$axios.get(`dataset/${this.entity._id}/addpoint`)
        .then(data => {
          this.entity.results.push(data.payload);
          this.updateData();
        });
    },
    removePoint () {
      this.$axios.get(`dataset/${this.entity._id}/removepoint`)
        .then(data => {
          this.entity.results = this.entity.results.slice(0, this.entity.results.length - 1);
          this.updateData();
        });
    },
    updateData () {
      this.dataset.points = [];
      this.entity.results.map((result, idx) => {
        const leftClosest = this.entity.results
          .filter((_, ridx) => !(this.entity.ignore.includes(ridx) || idx === ridx))
          .reduce((prev, curr) => {
            return (
              curr.center < prev ||
              curr.center > result.center
            ) ? prev
              : curr.center;
          }, 0);
        result.interval = result.center - leftClosest;
        result.ignorable = this.entity.ignore.includes(idx);
        result.style = generateColor(idx);
        if (!result.ignorable) {
          this.dataset.points.push({
            label: `${idx + 1}º ponto de inflexão`,
            pointRadius: 5,
            pointStyle: 'circle',
            pointBorderColor: pickBackground(idx),
            pointBackgroundColor: pickBackground(idx),
            pointHoverBorderColor: pickBackground(idx),
            pointHoverBackgroundColor: pickBackground(idx),
            pointHoverRadius: 5,
            borderColor: 'none',
            showLine: false,
            fill: false,
            data: [{
              x: Math.round(result.center * 100) / 100,
              y: result.reference
            }]
          });
        }
        return result;
      });
      this.$refs.chart.updateChart();
    }
  },
  mounted () {
    const id = this.$route.params.id;
    if (!id) {
      this.$router.go(-1);
    } else {
      this.$axios.get('/dataset/' + id)
        .then(data => {
          console.log(data);
          this.entity = data.payload;
          this.dataset.items = this.entity.voltage.map((v, i) => {
            return {
              time: Math.round((i * this.entity.samplingInterval + this.entity.startTime) * 10e2) / 10e2,
              potential: Math.round(v * 10e4) / 10e4,
              current: this.entity.current
            };
          });
          this.updateData();
        })
        .catch(err => {
          console.error(err.name, err.message);
          this.$router.go(-1);
        });
      console.log(this.entity);
    }
  }
};
</script>
