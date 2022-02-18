import axios from './Interceptor';

export default function removeProduct(url) {
  return axios.delete(url, {
    params: {
      appkey: '1755179168_1639361355771',
    },
  });
}
