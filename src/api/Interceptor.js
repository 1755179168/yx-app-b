import axios from 'axios';

const interceptor = axios.create({
  baseURL: 'https://mallapi.duyiedu.com',
});
// 请求拦截
// interceptor.interceptors.request.use((config) => {
//   if (config.url.includes('/products')) {
//     return config;
//   }
//   const obj = {
//     ...config,
//     ...config.params,
//     appkey: '1755179168_1639361355771',
//   };
//   return obj;
// }, (error) => Promise.reject(error));
// 响应拦截
interceptor.interceptors.response.use((config) => {
  if (config.status === 200) {
    return config.data;
  }
  return new Error(config.status);
}, (error) => Promise.reject(error));
export default interceptor;
