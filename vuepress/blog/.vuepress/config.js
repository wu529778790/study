module.exports = {
  title: '神族九帝',
  description: '永不言弃',
  dest: 'dist',
  base: '/study/vuepress/',
  themeConfig: {
    repo: 'https://github.com/wu529778790/blog'
  },
  configureWebpack: {
    // webpack别名设计
    resolve: {
      alias: {
        '@alias': 'path/to/some/dir'
      }
    }
  }
};
