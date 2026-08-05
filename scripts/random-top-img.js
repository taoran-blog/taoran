// 自动为每篇文章分配随机背景图
// 使用 picsum.photos 的高清图片
// 基于文章标题生成稳定种子，同篇文章每次显示相同图片

const crypto = require('crypto');

hexo.extend.filter.register('before_post_render', function (data) {
  if (data.layout !== 'post') return;

  // 如果文章已经手动设置了 top_img，则跳过
  if (data.top_img) return;

  // 根据文章标题生成稳定 seed
  const seed = crypto.createHash('md5').update(data.title).digest('hex').slice(0, 8);
  const seedNum = parseInt(seed, 16) % 1000;

  // 好看的科技感图片风格
  const styles = [
    `https://picsum.photos/seed/${seed}/1200/600`,
    `https://picsum.photos/seed/${seed}/1600/900`,
  ];

  data.top_img = styles[0];
  data.top_img = styles[0];

  return data;
});