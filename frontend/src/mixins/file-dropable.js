function preventDefault (event) {
  event.preventDefault();
}

export default {
  data: () => ({
    isFileDropable: false,
    droppedFiles: []
  }),
  methods: {
    attachEventListeners () {
      this.$el.addEventListener('drop', this.dropEvent, false);
      this.$el.addEventListener('dragover', preventDefault, false);
    },
    disattachEventListeners () {
      console.log('Disattaching event listeners from', this.$el);
      this.$el.removeEventListener('drop', this.dropEvent, false);
      this.$el.removeEventListener('dragover', preventDefault, false);
    },
    removeDragData (event) {
      console.log('Removing drag data');
      if (event.dataTransfer.items) event.dataTransfer.items.clear();
      else event.dataTransfer.clearData();
    },
    dropEvent (ev) {
      Array.prototype.forEach.call(ev.dataTransfer.items, item => {
        this.droppedFiles.push(item.getAsFile());
      });
      // this.removeDragData()
      ev.preventDefault();
    }
  },
  created () {
    // TODO: Check browser compatibility in here. If browser does not
    // support drag events, isFileDropable must be setted to false.
    this.isFileDropable = true;
  },
  mounted () {
    this.attachEventListeners();
    setTimeout(() => {
      console.log(this.droppedFiles);
      window.files = this.droppedFiles;
    }, 5000);
  },
  beforeDestroy () {
    this.disattachEventListeners();
  }
};
