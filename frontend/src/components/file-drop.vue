<template lang="pug">
  .drop-area
    span Arraste os arquivos aqui
</template>

<style lang="stylus" scoped>
  .drop-area
    border 2px dashed white
    border-radius 5px
    background rgba(255, 255, 255, .1)
    padding 25px
</style>

<script>
import FileDropable from '@/mixins/file-dropable'
export default {
  mixins: [FileDropable]
}
</script>
