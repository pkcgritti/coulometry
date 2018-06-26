<template lang="pug">
  v-layout(column)
    create-dialog(ref="createDialog")
    update-dialog(ref="updateDialog")
    v-flex
      v-alert(v-model="alert" :type="alertType" dismissible transition="scale-transition") {{ alertMessage }}
    v-flex
      v-data-table.elevation-1(
        :headers="headers"
        :items="items"
        :pagination.sync="pagination"
        item-key="_id"
        hide-actions
        light)
        template(slot="no-data")
          tr
            td(colspan="6")
              h5 Nenhum arquivo encontrado na base de dados
        template(slot="headers" slot-scope="props")
          tr
            th.pa-0.ma-0(style="width: 2px;")
              form(ref="inputForm")
                input(v-show="false" type="file" ref="fileInput" :accept="{ type: String, default: '*' }")
              v-tooltip(bottom)
                span Enviar um arquivo csv
                v-btn.pa-0.secondary(icon slot="activator" @click="importFile")
                  v-icon cloud_upload
            th.text-sm-left(v-for="header in props.headers"
              :key="header.text"
              :class="['column sortable', pagination.descending ? 'desc' : 'asc', header.value === pagination.sortBy ? 'active' : '']"
              @click="changeSort(header.value)") {{ header.text }}
            th
        template(slot="items" slot-scope="props")
          td
            v-icon(color="green") insert_drive_file
          td {{ props.item.name }}
          td {{ props.item.material }}
          td {{ props.item.processed ? 'Sim' : 'Não' }}
          td {{ formatDate(props.item.uploaded) }}
          td.ma-0.pa-0.button-center(style="width: 150px")
            v-btn.ma-1.pa-0(icon color="red" @click="remove(props.item)")
              v-icon delete
            v-btn.ma-1.pa-0(icon color="green" @click="edit(props.item)")
              v-icon edit
            v-btn.ma-1.pa-0(icon color="blue" @click="open(props.item)")
              v-icon play_arrow

</template>

<style lang="stylus">
.button-center
  text-align center
  .no-caps
    margin 0 auto
    text-transform none
</style>

<script>
import moment from 'moment';
import CreateDialog from './create-dialog';
import UpdateDialog from './update-dialog';

export default {
  components: { CreateDialog, UpdateDialog },
  props: ['items'],
  data: () => ({
    alert: false,
    alertType: 'success',
    alertMessage: 'Sucesso',
    timeout: null,
    pagination: {
      sortBy: 'uploaded',
      descending: true
    },
    headers: [
      { text: 'Nome do arquivo', align: 'left', sortable: true, value: 'name' },
      { text: 'Material', align: 'left', sortable: true, value: 'material', width: 1 },
      { text: 'Processado', align: 'left', sortable: true, value: 'processed', width: 1 },
      { text: 'Adicionado em', align: 'left', sortable: true, value: 'uploaded', width: 1 }
    ]
  }),
  methods: {
    triggerFileInput () {
      this.$refs.fileInput.click();
    },
    isValidName (name) {
      const item = this.items.find(item => item.name === name);
      const uniqueName = item === undefined || item === null;
      const notNull = name !== undefined && name !== null && name !== '';
      if (!uniqueName) this.alertDelayed(`Já existe um conjunto de dados nomeado "${name}", escolha outro nome.`, 'error', 10000);
      if (!notNull) this.alertDelayed('Você deve especificar um nome para o conjunto de dados', 'error', 10000);
      return (uniqueName && notNull);
    },
    importFile () {
      this.$refs.createDialog.open()
        .then(data => {
          if (data.choice) {
            const obj = {
              name: data.payload.name,
              voltage: data.payload.potential,
              current: data.payload.current * 0.001,
              material: data.payload.material || undefined,
              samplingInterval: data.payload.samplingInterval
            };
            if (obj.voltage.length === 0) {
              return this.alertDelayed('Nenhum dado fornecido para importação', 'error', 10000);
            }
            if (this.isValidName(obj.name)) {
              this.$axios.post('/dataset', obj)
                .then(res => {
                  console.log(res.data);
                  this.alertDelayed(`Conjunto de dados "${obj.name}" enviado com sucesso`, 'success', 10000);
                  this.$emit('update');
                }).catch(err => {
                  console.log(err.response);
                  this.alertDelayed(`Não foi possível enviar o arquivo ao servidor`, 'error', 10000);
                });
            }
          }
        });
    },
    remove (obj) {
      if (window.confirm(`Tem certeza que deseja remover o arquivo "${obj.name}"?`)) {
        this.$axios.delete('/dataset/' + obj._id)
          .then(data => {
            this.alertDelayed(`Arquivo "${obj.name}" removido com sucesso`, 'success', 10000);
            this.$emit('update');
          })
          .catch(err => {
            this.alertDelayed(`Erro ao remover arquivo "${obj.name}": ${err.name}`, 'error', 10000);
          });
      }
    },
    open (obj) {
      this.$router.push({ name: 'Analise de dados', params: { id: obj._id } });
    },
    edit (obj) {
      this.$refs.updateDialog.open()
        .then(data => {
          console.log(data);
        });
    },
    alertDelayed (message, type, delay) {
      this.alertMessage = message;
      this.alertType = type;
      this.alert = true;
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.timeout = setTimeout(() => { this.alert = false; }, delay);
      this.$refs.inputForm.reset();
    },
    openDialog () {
      return new Promise(resolve => {
        this.resolver = resolve;
        this.dialogVisible = true;
      });
    },
    formatDate (date) {
      const d = moment(date);
      return d.format('Y/MM/DD') + ' às ' + d.format('h:mm:ss a');
    },
    changeSort (column) {
      if (this.pagination.sortBy === column) {
        this.pagination.descending = !this.pagination.descending;
      } else {
        this.pagination.sortBy = column;
        this.pagination.descending = false;
      }
    }
  }
};
</script>
