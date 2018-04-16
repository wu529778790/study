/*
 * 快捷导航
 * @Date: 2018-04-13 17:46:06 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:46:06 
 */
<template>
  <el-breadcrumb class="app-levelbar"
    separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList"
      :key="item.path">
      <span v-if="noRedirect(item,index)"
        class="none-redirect">{{ item.meta.title }}</span>
      <router-link v-else
        :to="item.redirect || item.path">{{ item.meta.title }}</router-link>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'levelbar',
  created() {
    this.getBreadcrumb();
  },
  data() {
    return {
      levelList: null
    };
  },
  methods: {
    noRedirect(item, index) {
      return (
        item.redirect === 'noredirect' || index === this.levelList.length - 1
      );
    },
    getBreadcrumb() {
      let matched = this.$route.matched.filter(item => item.meta.title);
      const first = matched[0];
      if (first && (first.name !== 'homePage' || first.path !== '')) {
        matched = [{ meta: { title: '首页' }, path: '/' }].concat(matched);
      }
      this.levelList = matched;
    }
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-levelbar.el-breadcrumb {
  display: inline-block;
  line-height: 50px;
  margin-left: 10px;
  .none-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
