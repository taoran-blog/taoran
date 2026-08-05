// 自动为每篇文章分配纯色背景
// 基于文章标题生成稳定颜色，同篇文章每次显示相同颜色

const crypto = require('crypto');

// 预设的纯色方案（适合做背景的深色）
const colors = [
  '#667eea',
  '#f5576c',
  '#4facfe',
  '#43e97b',
  '#fa709a',
  '#a18cd1',
  '#d57eeb',
  '#8ec5fc',
  '#f2709c',
  '#5ee7df',
  '#b490ca',
  '#d299c2',
  '#30cfd0',
  '#a1c4fd',
  '#fda085',
  '#96fbc4',
  '#6c5ce7',
  '#fd79a8',
  '#00cec9',
  '#0984e3',
];

hexo.extend.filter.register('before_post_render', function (data) {
  if (data.layout !== 'post') return;

  // 如果文章已经手动设置了 top_img，则跳过
  if (data.top_img) return;

  // 根据文章标题生成稳定索引
  const seed = parseInt(crypto.createHash('md5').update(data.title).digest('hex').slice(0, 8), 16);
  const index = seed % colors.length;

  data.top_img = colors[index];

  return data;
});