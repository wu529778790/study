/*
 * 右侧布局
 * @Date: 2018-04-13 17:45:56 
 * @Last Modified by: liangzc
 * @Last Modified time: 2018-04-16 10:30:15
 */
<template>
  <div class="app-wrapper"
    :class="{hideSidebar:!sidebar.opened}">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar/>
      <app-main/>
    </div>
  </div>
</template>

<script>
import Navbar from '@/pages/layout/Navbar';
import Sidebar from '@/pages/layout/Sidebar';
import AppMain from '@/pages/layout/AppMain';

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar() {
      return this.$store.getters.sidebar;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import 'src/styles/mixin.scss';
.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.hideSidebar {
    .sidebar-container {
      width: 64px;
      overflow: hidden;
    }
    .main-container {
      margin-left: 64px;
    }
  }
  .sidebar-container {
    width: 200px;
    height: 100%;
    min-height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
  .main-container {
    min-height: 100%;
    transition: margin-left 0.28s ease-out;
    margin-left: 200px;
  }
}
</style>
