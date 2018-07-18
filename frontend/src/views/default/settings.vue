<template lang="pug">
  v-layout(column)
    create-material-dialog(ref="createMaterialDialog")
    create-element-dialog(ref="createElementDialog")
    v-flex(xs12)
      v-card
        v-card-title.pa-2.primary
          span.title Seleção de material
        v-card-text
          v-select.white--text(v-if="materials.length > 0" v-model="material" :items="materials" label="Selecione o material" @input="getElements")
          span(v-else) Não existem materiais registrados na plataforma
        v-card-actions
          v-spacer
          v-btn(v-if="material" style="text-transform: none" color="error" @click="removeMaterial")
            v-icon delete
          v-btn(v-if="material" style="text-transform: none" color="primary" @click="editMaterial")
            v-icon edit
          v-btn(style="text-transform: none" color="success" @click="createMaterial")
            v-icon add
      v-card(v-if="material").mt-3
        v-card-title.pa-2.primary
          span.title Elementos relacionados
        v-card-text
          template(v-if="elementsLoading")
            span Pesquisando elementos relacionados ao material {{ material.name }}
            v-progress-linear(indeterminate)
          template(v-else)
            span(v-if="elements.length === 0") Não existem elementos relacionados a este material
            template(v-else)
              v-layout(wrap)
                v-flex(xs6 sm4 md3 v-for="element in elements" :key="element._id")
                  v-card(light style="border-top-left-radius: 0; border-top-right-radius: 0;")
                    v-card-title.pa-2.primary.white--text
                      span {{ element.name }}
                    v-card-text.pa-2
                      table.param-table
                        tbody
                          tr
                            td.header Massa molar
                            td.value {{ element.molarMass }} (g/mol)
                          tr
                            td.header Densidade
                            td.value {{ element.density }} (g/cm³)
                          tr
                            td.header Pot. médio
                            td.value {{ element.meanPotential }} (V)
                          tr
                            td.header N. elétrons (N)
                            td.value {{ element.nEletrons }}
                          tr
                            td.header Iterativo
                            td.value {{ element.iteractive ? 'Sim' : 'Não' }}
                    v-card-actions
                      v-spacer
                      v-btn(small style="text-transform: none;" color="error" icon @click="removeElement(element)")
                        v-icon delete
                      v-btn(small style="text-transform: none;" color="primary" icon @click="updateElement(element)")
                        v-icon edit
        v-card-actions
          v-spacer
          v-btn(style="text-transform: none" color="success" @click="createElement")
            v-icon add
</template>

<script>
import CreateMaterialDialog from './@settings/create-material-dialog';
import CreateElementDialog from './@settings/create-element-dialog';
export default {
  components: { CreateMaterialDialog, CreateElementDialog },
  data: () => ({
    material: null,
    materials: [
      { value: 'Material 1', text: 'Ae' },
      { value: 'Material 2', text: 'Outro' }
    ],
    elements: [],
    elementsLoading: false
  }),
  methods: {
    createMaterial () {
      this.$refs.createMaterialDialog.open()
        .then(response => {
          if (response.choice) {
            this.$axios.post('material', response.payload)
              .then(data => {
                const material = {
                  value: data.payload,
                  text: data.payload.name
                };
                this.materials.push(material);
                this.$nextTick(() => {
                  this.material = material.value;
                });
              });
          }
        });
    },
    editMaterial () {
      this.$refs.createMaterialDialog.open(this.material.name)
        .then(response => {
          if (response.choice) {
            this.$axios.put('material/' + this.material._id, response.payload)
              .then(data => {
                this.getMaterials()
                  .then(() => {
                    const material = this.materials.find(m => m.value._id === this.material._id);
                    this.$nextTick(() => {
                      this.material = material.value;
                    });
                  });
              });
          }
        });
    },
    removeMaterial () {
      if (window.confirm('Tem certeza que deseja remover o material ' + this.material.name + '?')) {
        this.$axios.delete('material/' + this.material._id)
          .then(() => {
            this.getMaterials();
            this.material = null;
          });
      }
    },
    getMaterials () {
      return this.$axios.get('material')
        .then(data => {
          this.materials = data.payload.map(material => {
            return {
              value: material,
              text: material.name
            };
          });
        });
    },
    createElement () {
      this.$refs.createElementDialog.open()
        .then(response => {
          if (response.choice) {
            response.payload.material = this.material._id;
            this.$axios.post('material/' + this.material._id + '/elements', response.payload)
              .then(data => {
                this.getElements();
                console.log(data);
              })
              .catch(error => {
                console.log(error.response);
              });
          }
        });
    },
    updateElement (element) {
      this.$refs.createElementDialog.open(element)
        .then(response => {
          if (response.choice) {
            this.$axios.put('material/' + this.material._id + '/element/' + element._id, response.payload)
              .then(data => {
                console.log(data);
                this.getElements();
              });
          }
        });
    },
    removeElement (element) {
      if (window.confirm('Tem certeza que deseja remover o elemento ' + element.name + '?')) {
        this.$axios.delete('material/' + this.material._id + '/element/' + element._id)
          .then(() => {
            this.getElements();
          });
      }
    },
    getElements () {
      this.elementsLoading = true;
      return this.$axios.get('material/' + this.material._id + '/elements')
        .then(data => {
          this.elements = data.payload;
          setTimeout(() => {
            this.elementsLoading = false;
          }, 800);
        });
    }
  },
  mounted () {
    this.getMaterials();
  }
};
</script>
