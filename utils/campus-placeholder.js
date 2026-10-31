const features = {
  wanted: { title: '求购广场', icon: 'chat', description: '把想找的好物告诉同学。求购发布和联系功能将在后续开放。' },
  publish: {
    title: '让闲置遇见新主人',
    icon: 'add',
    description: '商品发布功能正在准备。当前不能提交商品，也不会收取任何费用。',
  },
  messages: {
    title: '消息',
    icon: 'notification',
    description: '未来在这里与同学沟通商品。当前没有真实会话，暂不支持发送消息。',
  },
  student: { title: '学生小店', icon: 'shop', description: '为同学的创意和好物留一个小天地。学生店铺将在后续开放。' },
  business: {
    title: '校园商家',
    icon: 'location',
    description: '打印、生活服务等校园便利将在这里相遇。商家申请暂未开放。',
  },
  market: {
    title: '校园闲置',
    icon: 'root-list',
    description: '校园商品市场正在准备。你可以回首页查看示例好物，或继续体验原商城模板。',
    legacy: true,
  },
  graduation: {
    title: '毕业季 · 闲置不闲',
    icon: 'gift',
    description: '让好物遇见下一个景院人。这是活动视觉预览，当前尚未开始征集或报名。',
  },
};
export function createPlaceholder(kind) {
  return {
    data: { feature: features[kind] || features.market },
    onLoad(options) {
      const key = kind || options.kind;
      const feature = features[key] || features.market;
      this.setData({ feature });
      wx.setNavigationBarTitle({ title: feature.title });
    },
    onShow() {
      const bar = this.getTabBar && this.getTabBar();
      if (bar) bar.init();
    },
  };
}
