<template lang="pug">
  async-dialog(ref="dialog" :payload="payload" title="Importação de dados")
    v-flex(v-show="payload.potential.length === 0" xs12)
      v-text-field(v-model="payload.text" multi-line textarea light label="Copie o conteúdo do arquivo aqui (Ctrl + V)" @input="parse" @keypress.prevent="")
    v-flex(xs12)
      v-text-field(v-model="payload.name" light clearable label="Nome do arquivo")
    v-flex(xs6)
      v-text-field(v-model="payload.current" light type="number" label="Corrente (mA)")
    v-flex(xs6)
      v-text-field(v-model="payload.samplingInterval" light type="number" step="0.5" label="Intervalo entre medições")
    v-flex(xs6)
      v-text-field(:value="payload.potential.length" light type="number" readonly label="Número de amostras")
    v-flex(xs6)
      v-select(
        light
        v-model="payload.material"
        :items="['Cu', 'Alumínio', 'Ouro', 'Prata']"
        label="Material")
</template>

<script>
import AsyncDialog from '../async-dialog';

function diff (vector) {
  const ret = Array(vector.length - 1);
  for (let i = 0; i < vector.length - 1; i++) {
    ret[i] = vector[i + 1] - vector[i];
  }
  return ret;
}

function mean (vector) {
  return vector.reduce((sum, val) => {
    return sum + val;
  }) / vector.length;
}

function initialState () {
  return {
    text: '',
    potential: [],
    name: '',
    current: 23,
    samplingInterval: 0.5,
    material: ''
  };
}

export default {
  data: () => ({
    payload: initialState()
  }),
  components: { AsyncDialog },
  methods: {
    open () {
      this.payload = initialState();
      return this.$refs.dialog.open();
    },
    isSoftwareFile (text) {
      return /^Title: Title/.test(text);
    },
    parseSoftwareFile () {
      const splited = this.payload.text.split('\n').slice(1);
      const label = splited[0].replace('Label: E vs t ', '').replace(/\(|\)/g, '');
      const potential = Array(splited.length - 1);
      const time = Array(splited.length - 1);
      splited.slice(1).forEach((d, i) => {
        const s = d.split(' ');
        time[i] = Number.parseFloat(s[0]);
        potential[i] = Number.parseFloat(s[1]);
      });
      const samplingInterval = Math.round(mean(diff(time)) * 100) / 100;
      return {
        samplingInterval,
        potential,
        label,
        size: potential.length
      };
    },
    parseXlmFile () {
      const potential = this.payload.text
        .replace(/,/g, '.')
        .split('\n')
        .map(s => Number.parseFloat(s))
        .filter(v => !isNaN(v));
      return {
        potential
      };
    },
    onKeyPress (evt) {
      evt.preventDefault();
      console.log(evt);
    },
    parse () {
      let parsed;
      if (this.payload.text === '') return;
      if (this.isSoftwareFile(this.payload.text)) {
        parsed = this.parseSoftwareFile();
      } else {
        parsed = this.parseXlmFile();
      }
      if (parsed.label) this.payload.name = parsed.label;
      if (parsed.potential) this.payload.potential = parsed.potential;
      if (parsed.samplingInterval) this.payload.samplingInterval = parsed.samplingInterval;
    }
  }
};
</script>
