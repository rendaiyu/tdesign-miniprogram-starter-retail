import { campusCategories, campusGoods } from '../../model/campus-home';
export function fetchCampusHome() {
  return Promise.resolve({ categories: campusCategories, goods: campusGoods.map((item) => ({ ...item })) });
}
// 图片高度已知，按累计高度加入较短列；不使用按行对齐的双列网格。
export function arrangeWaterfall(goods) {
  const columns = [[], []],
    heights = [0, 0];
  goods.forEach((item) => {
    const index = heights[0] <= heights[1] ? 0 : 1;
    columns[index].push(item);
    heights[index] += item.imageHeight + 204;
  });
  return columns;
}
export function selectCampusGoods(goods, category, keyword) {
  const query = keyword.trim().toLowerCase();
  const selected = goods.filter(
    (item) =>
      (category === 'all' || category === 'latest' || item.category === category) &&
      (!query || (item.title + ' ' + item.seller).toLowerCase().includes(query)),
  );
  return category === 'latest' ? selected.sort((a, b) => b.order - a.order) : selected;
}
