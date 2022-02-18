module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'www.baidu.com',
      },
      '/upload': {
        target: 'https://mallapi.duyiedu.com',
      },
    },
  },
};
