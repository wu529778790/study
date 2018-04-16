/*
 * 顶栏
 */
<template>
  <div class="navbar"
    mode="horizontal">
    <hamburger class="hamburger-container"
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened" />
    <levelbar/>
    <tabs-view/>
    <screenfull class="screenfull" />
    <el-dropdown class="avatar-container"
      trigger="click">
      <div class="avatar-wrapper">
        <!-- <img class="user-avatar" :src="user.faceImg"> -->
        <span>{{ user.name }}</span>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu class="user-dropdown"
        slot="dropdown">
        <router-link class="inline-block"
          to="/">
          <el-dropdown-item>
            首页
          </el-dropdown-item>
        </router-link>
        <router-link class="inline-block"
          to="/user">
          <el-dropdown-item>
            用户信息
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item divided>
          <span @click="logout"
            style="display:block;">退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Levelbar from './Levelbar';
import TabsView from './TabsView';
import { Hamburger, Screenfull } from '@/components/';

export default {
  name: 'navbar',
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    Screenfull
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['sidebar', 'user'])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar');
    },
    logout() {
      // this.axios.posting('service/loginOut').then(() => {
      this.$store.dispatch('logout');
      this.$router.push({
        path: '/login',
        query: { redirect: this.$route.fullPath }
      });
      // });
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-bottom: solid 1px #e6e6e6;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 5px;
      position: relative;
      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>



