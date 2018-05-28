export default {
  data: () => ({
    isFileDropable: false,
    droppedFiles: []
  }),
  methods: {
    attachEventListeners () {
      ['drop', 'dragover'].forEach(event => {
        this.$el.addEventListener(event, e => {
          e.preventDefault()
        })
      })
      console.log('Attaching event listeners to', this.$el)
    },
    disattachEventListeners () {
      console.log('Disattaching event listeners from', this.$el)
    }
  },
  created () {
    // TODO: Check browser compatibility in here. If browser does not
    // support drag events, isFileDropable must be setted to false.
    this.isFileDropable = true
  },
  mounted () {
    this.attachEventListeners()
  },
  beforeDestroy () {
    this.disattachEventListeners()
  }
}
