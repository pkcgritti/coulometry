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
    createChart (time, potential, points) {
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
              borderWidth: 1,
              pointDotRadius: 0,
              pointStrokeColor: 'none'
            },
            {
              label: 'Ponto de inflexão',
              fill: false,
              pointRadius: 5,
              pointStyle: 'circle',
              hitRadius: 8,
              hitBackground: 'black',
              hoverRadius: 10,
              hoverBorderWidth: 0,
              backgroundColor: 'rgba(0, 23, 200, 0.6)',
              borderColor: 'none',
              showLine: false,
              lineWidth: 0,
              data: points
            }
          ]
        },
        options: {
          animation: false,
          responsive: true,
          maintainAspectRatio: false,
          hover: {
            display: false,
            intersect: false
          },
          title: {
            display: false
          },
          legend: {
            display: false
          },
          tooltips: {
            intersect: false,
            mode: 'x',
            filter: function (item) {
              return item.datasetIndex >= 1;
            },
            callbacks: {
              title: (tooltipItem) => {
                const item = tooltipItem[0];
                if (!item) return null;
                let timepoint = (item.datasetIndex)
                  ? this.dataset.points[item.index].x
                  : item.xLabel;

                return 'Tempo: ' + timepoint + ' segundos';
              }
            }
          },
          scales: {
            xAxes: [{
              display: true,
              distribution: 'linear',
              beginAtZero: true,
              stepSize: 0.5,
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
        this.chart.data.datasets[1].data = data.points;
        this.chart.update();
      } else {
        this.createChart(data.time, data.potential, data.points);
      }
    },
    unrollData () {
      const time = Array(this.dataset.items.length);
      const potential = Array(this.dataset.items.length);
      const points = this.dataset.points;
      this.dataset.items.forEach((d, i) => {
        time[i] = d.time;
        potential[i] = d.potential;
      });
      return { time, potential, points };
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
