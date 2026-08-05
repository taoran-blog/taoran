// 自动为每篇文章分配渐变色背景
// 基于文章标题生成稳定颜色，同篇文章每次显示相同颜色

const crypto = require('crypto');

// 预设的渐变色方案（不依赖外部图片）
const gradients = [
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #f2709c 0%, #ff9472 100%)',
  'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
  'linear-gradient(135deg, #5ee7df 0%, #b490ca 100%)',
  'linear-gradient(135deg, #d299c2 0%, #fef9d7 100%)',
  'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
  'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
  'linear-gradient(135deg, #96fbc4 0%, #f9f586 100%)',
];

hexo.extend.filter.register('before_post_render', function (data) {
  if (data.layout !== 'post') return;

  // 如果文章已经手动设置了 top_img，则跳过
  if (data.top_img) return;

  // 根据文章标题生成稳定索引
  const seed = parseInt(crypto.createHash('md5').update(data.title).digest('hex').slice(0, 8), 16);
  const index = seed % gradients.length;

  // 使用渐变色作为背景
  data.top_img = gradients[index];

  return data;
});