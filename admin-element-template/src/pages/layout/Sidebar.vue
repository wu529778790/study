/*
 * 外层侧边栏
 * @Date: 2018-04-13 17:46:44 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:46:44 
 */
<template>
  <el-menu router
    unique-opened
    :default-active="$route.path"
    :collapse="isCollapse">
    <sidebar-item :routes="navRoutes" />
  </el-menu>
</template>


<script>
import { mapGetters } from 'vuex';
import SidebarItem from './SidebarItem';
export default {
  name: 'sidebar',
  components: { SidebarItem },
  computed: {
    ...mapGetters(['routes', 'sidebar']),
    navRoutes() {
      let layoutRoute = this.routes.find(route => route.path === '/');
      return layoutRoute ? layoutRoute.children : [];
    },
    isCollapse() {
      return !this.sidebar.opened;
    }
  },
  watch: {
    $route() {
      console.log(this.$route.path);
    }
  }
};
</script>
