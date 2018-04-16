/*
 * 用户信息
 */
<template>
  <el-form :inline="true"
    class="page-container format-form"
    label-width="82px">
    <el-form-item label="登录名">
      <el-input v-model="user.id"
        readonly/>
    </el-form-item>
    <el-form-item label="姓名">
      <el-input v-model="user.name"
        readonly/>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="user.email"
        readonly/>
    </el-form-item>
    <el-form-item label="手机">
      <el-input v-model="user.mobile"
        readonly/>
    </el-form-item>
    <el-form-item label="用户类型">
      <el-input v-model="user.type"
        readonly/>
    </el-form-item>
    <el-form-item label="联系地址">
      <el-input v-model="user.address"
        readonly/>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: 'baseinfo',
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['user'])
  }
};
</script>