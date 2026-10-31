Component({
  data: { icon: 'cart' },

  properties: {
    count: {
      type: Number,
    },
  },

  methods: {
    goToCart() {
      wx.navigateTo({
        url: '/pages/cart/index',
      });
    },
  },
});
