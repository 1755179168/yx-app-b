import axios from './Interceptor';

export default async function getProductAll(category) {
  const rep = await axios.get('/products/all', {
    params: {
      category,
      appkey: '1755179168_1639361355771',
    },
  });

  return rep;
}
