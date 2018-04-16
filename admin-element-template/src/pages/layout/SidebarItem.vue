/*
 * 内层侧边栏（具体菜单）
 */
<template>
  <div class="menu-wrapper">
    <template v-for="item in routes">
      <el-menu-item v-if="isMenuItem(item)"
        :index="`${parentPath}/${item.path}`"
        :key="item.path">
        <i v-if="item.meta.icon"
          :class="item.meta.icon" />
        <span slot="title">{{ item.meta.title }}</span>
      </el-menu-item>
      <el-submenu :index="item.meta.title"
        v-if="isMenu(item)"
        :key="item.meta.title">
        <template slot="title">
          <i v-if="item.meta.icon"
            :class="item.meta.icon" />
          <span slot="title">{{ item.meta.title }}</span>
        </template>
        <template v-for="child in item.children"
          v-if="child.meta.menu">
          <sidebar-item v-if="child.children && child.children.length > 0"
            :routes="[child]"
            :key="child.path"
            :parent-path="`${parentPath}/${item.path}`" />
          <el-menu-item v-else
            :index="`${parentPath}/${item.path}/${child.path}`"
            :key="child.path">
            <i v-if="child.meta.icon"
              :class="child.meta.icon" />
            <span slot="title">{{ child.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'sidebar-item',
  props: {
    routes: {
      type: Array
    },
    parentPath: {
      type: String,
      default: ''
    }
  },
  methods: {
    isMenuItem(item) {
      return (
        item.meta.menu &&
        (!item.children || item.children && item.children.length === 0)
      );
    },
    isMenu(item) {
      return item.meta.menu && item.children && item.children.length > 0;
    }
  }
};
</script>

