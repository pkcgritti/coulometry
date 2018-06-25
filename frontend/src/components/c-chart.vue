<template lang="pug">
  canvas(width="300" height="300")
</template>

<script>
import Chart from 'chart.js';
export default {
  props: ['dataset'],
  data: () => ({
    chart: null
  }),
  methods: {
    createChart (time, potential) {
      this.chart = new Chart(this.$el.getContext('2d'), {
        type: 'line',
        data: {
          labels: time,
          datasets: [
            {
              label: 'Diferença de Potencial',
              data: potential,
              backgroundColor: 'rgba(230, 80, 80, .8)',
              borderColor: 'rgba(230, 80, 80, 1)',
              fill: false,
              lineTension: 0,
              pointRadius: 0,
              borderWidth: 1
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltips: {
            intersect: false,
            callbacks: {
              title: function (tooltipItem) {
                return 'Tempo: ' + tooltipItem[0].xLabel + ' segundos';
              }
            }
          },
          scales: {
            xAxes: [{
              display: true,
              distribution: 'linear',
              beginAtZero: true,
              stepSize: 0.1,
              scaleLabel: {
                display: true,
                labelString: 'Tempo (segundos)'
              }
            }],
            yAxes: [{
              display: true,
              scaleLabel: {
                display: true,
                labelString: 'Diferença de Potencial'
              }
            }]
          }
        }
      });
    },
    updateChart () {
      const data = this.unrollData();
      if (this.chart) {
        this.chart.data.labels = data.time;
        this.chart.data.datasets[0].data = data.potential;
        this.chart.update();
      } else {
        this.createChart(data.time, data.potential);
      }
    },
    unrollData () {
      const time = Array(this.dataset.items.length);
      const potential = Array(this.dataset.items.length);
      this.dataset.items.forEach((d, i) => {
        time[i] = d.time;
        potential[i] = d.potential;
      });
      return { time, potential };
    }
  },
  mounted () {
    if (this.dataset.items.length) this.updateChart();
  },
  beforeDestroy () {
    if (this.chart) this.chart.destroy();
  }
};
</script>
