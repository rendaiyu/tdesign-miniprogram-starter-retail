Component({
  properties: { title: String, description: String, icon: String, legacy: Boolean },
  methods: {
    goHome() {
      wx.switchTab({ url: '/pages/home/home' });
    },
    openCategory() {
      wx.navigateTo({ url: '/pages/category/index' });
    },
    openCart() {
      wx.navigateTo({ url: '/pages/cart/index' });
    },
  },
});
