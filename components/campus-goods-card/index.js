Component({
  properties: { goods: Object },
  data: { imageFailed: false },
  observers: {
    'goods.id': function () {
      this.setData({ imageFailed: false });
    },
  },
  methods: {
    open() {
      this.triggerEvent('open', { id: this.properties.goods.id });
    },
    favorite() {
      this.triggerEvent('favorite', { id: this.properties.goods.id });
    },
    onImageError() {
      this.setData({ imageFailed: true });
    },
  },
});
