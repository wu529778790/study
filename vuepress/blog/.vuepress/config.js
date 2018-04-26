module.exports = {
  title: '神族九帝',
  description: '永不言弃',
  themeConfig: {},
  configureWebpack: {
    // webpack别名设计
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
};
