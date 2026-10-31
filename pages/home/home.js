import { fetchCampusHome, arrangeWaterfall, selectCampusGoods } from '../../services/home/campus';
Page({
  data: {
    statusBarHeight: 24,
    categories: [],
    category: 'all',
    keyword: '',
    columns: [[], []],
    visibleCount: 0,
    totalCount: 0,
    loading: true,
    failed: false,
    entries: [
      { key: 'market', name: '校园闲置', subtitle: '好物再相遇', icon: 'root-list', tone: 'green' },
      { key: 'wanted', name: '求购广场', subtitle: '找到你想要', icon: 'chat', tone: 'blue' },
      { key: 'student', name: '学生小店', subtitle: '发现小创意', icon: 'shop', tone: 'sand' },
      { key: 'business', name: '校园商家', subtitle: '便利在身边', icon: 'location', tone: 'mint' },
    ],
  },
  onLoad() {
    const system = wx.getWindowInfo ? wx.getWindowInfo() : wx.getSystemInfoSync();
    this.setData({ statusBarHeight: system.statusBarHeight || 24 });
    this.loadHome();
  },
  onShow() {
    const bar = this.getTabBar && this.getTabBar();
    if (bar) bar.init();
  },
  onPullDownRefresh() {
    this.loadHome();
  },
  onReachBottom() {
    if (!this.data.loading && this.data.visibleCount < this.data.totalCount) {
      this.limit += 4;
      this.updateGoods();
    }
  },
  async loadHome() {
    if (this.loadingRequest) return;
    this.loadingRequest = true;
    this.setData({ loading: true, failed: false });
    try {
      const result = await fetchCampusHome();
      this.goods = result.goods.map((item) => ({ ...item, favorite: !!(this.favorites || {})[item.id] }));
      this.limit = 6;
      this.setData({ categories: result.categories });
      this.updateGoods();
    } catch (error) {
      this.setData({ failed: true });
    } finally {
      this.loadingRequest = false;
      this.setData({ loading: false });
      wx.stopPullDownRefresh();
    }
  },
  updateGoods() {
    const selected = selectCampusGoods(this.goods || [], this.data.category, this.data.keyword);
    const visible = selected.slice(0, this.limit || 6);
    this.setData({ columns: arrangeWaterfall(visible), visibleCount: visible.length, totalCount: selected.length });
  },
  onSearchInput(event) {
    this.limit = 6;
    this.setData({ keyword: event.detail.value });
    this.updateGoods();
  },
  onSearchConfirm() {
    this.scrollToMarket();
  },
  clearSearch() {
    this.limit = 6;
    this.setData({ keyword: '' });
    this.updateGoods();
  },
  onCategoryChange(event) {
    this.limit = 6;
    this.setData({ category: event.currentTarget.dataset.key });
    this.updateGoods();
  },
  resetFilters() {
    this.limit = 6;
    this.setData({ keyword: '', category: 'all' });
    this.updateGoods();
  },
  scrollToMarket() {
    wx.pageScrollTo({ selector: '#campus-market', duration: 200 });
  },
  onEntry(event) {
    const { key } = event.currentTarget.dataset;
    if (key === 'market') {
      wx.navigateTo({ url: '/pages/campus-placeholder/index?kind=market' });
    } else if (key === 'wanted') {
      wx.switchTab({ url: '/pages/wanted/index' });
    } else {
      wx.navigateTo({ url: '/pages/campus-placeholder/index?kind=' + key });
    }
  },
  onActivity() {
    wx.navigateTo({ url: '/pages/campus-placeholder/index?kind=graduation' });
  },
  onGoodsOpen(event) {
    const item = (this.goods || []).find((goods) => goods.id === event.detail.id);
    if (!item) return;
    wx.showModal({
      title: '示例商品预览',
      content:
        item.title +
        '\n展示价格：¥' +
        item.price / 100 +
        '\n商品、价格、成色和卖家均为界面示例，不可购买。校园商品详情将在后续阶段开发。',
      showCancel: false,
      confirmText: '知道了',
      confirmColor: '#167D65',
    });
  },
  onFavorite(event) {
    const { id } = event.detail;
    this.favorites = this.favorites || {};
    this.favorites[id] = !this.favorites[id];
    this.goods = this.goods.map((item) => (item.id === id ? { ...item, favorite: this.favorites[id] } : item));
    this.updateGoods();
    wx.showToast({ title: this.favorites[id] ? '收藏效果预览，不会保存' : '已取消收藏预览', icon: 'none' });
  },
});
