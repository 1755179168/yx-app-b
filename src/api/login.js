import interceptor from './Interceptor';

export default async function login(url, data) {
  const response = await interceptor.post(url, data);
  return response;
}
