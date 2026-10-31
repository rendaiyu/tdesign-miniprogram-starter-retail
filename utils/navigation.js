// 分类和购物车不再是底部导航项，保留原页面并以普通页面打开。
export function navigateRetail(url) {
  if (url === '/pages/home/home' || url === '/pages/usercenter/index') wx.switchTab({ url });
  else wx.navigateTo({ url });
}
