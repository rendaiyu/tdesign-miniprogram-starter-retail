import TabMenu from './data';
Component({
  data: { active: 0, list: TabMenu },
  lifetimes: {
    attached() {
      this.init();
    },
  },
  methods: {
    onChange(event) {
      const index = Number(event.currentTarget.dataset.index);
      const item = this.data.list[index];
      if (!item) return;
      wx.switchTab({
        url: '/' + item.url,
        success: () => this.setData({ active: index }),
        fail: () => wx.showToast({ title: '页面暂时无法打开，请重试', icon: 'none' }),
      });
    },
    init() {
      const page = getCurrentPages().pop();
      const route = page ? page.route.split('?')[0] : '';
      this.setData({ active: this.data.list.findIndex((item) => item.url === route) });
    },
  },
});
