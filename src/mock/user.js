import Mock from 'mockjs';

export default Mock.mock('/api', 'get', {
  //
  columns: ['日期', '用户访问', '下单用户', '下单率'],
  'rows|10': [{
    '日期|+1': 0,
    用户访问: '@NATURAL(10002, 30000)',
    下单用户: '@NATURAL(5000, 30000)',
    '下单率|0.2-3': 1,
  }],
});
