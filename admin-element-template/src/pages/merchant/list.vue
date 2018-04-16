/*
 * 商户列表
 * @Author: liangzc 
 * @Date: 2018-04-13 17:55:04 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:55:04 
 */
<template>
  <div class="page-container">
    <el-form :inline="true"
      :model="query">
      <el-form-item label="关键字">
        <el-input v-model="query.keywords"
          placeholder="商户名称、联系地址、联系电话" />
      </el-form-item>
      <el-form-item label="商户类型">
        <el-select v-model="query.type">
          <el-option label="全部"
            value=""
            selected/>
          <el-option label="场库商户"
            value="01" />
          <el-option label="商圈商户"
            value="02" />
        </el-select>
      </el-form-item>
      <el-form-item label="商户状态">
        <el-select v-model="query.status">
          <el-option label="全部"
            value=""
            selected/>
          <el-option label="待审核"
            value="01" />
          <el-option label="启用"
            value="02" />
          <el-option label="注销"
            value="03" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">新增</el-button>
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <!-- 查询结果 -->
    <el-table ref="resultTable"
      :data="resultData"
      border
      show-overflow-tooltip>
      <el-table-column prop="name"
        label="商户名称" />
      <el-table-column prop="type"
        label="类型" />
      <el-table-column prop="telphone"
        label="固定电话" />
      <el-table-column width="180"
        prop="address"
        label="联系地址" />
      <el-table-column prop="status"
        label="状态" />
      <el-table-column width="120"
        label="操作选项">
        <template slot-scope="scope">
          <el-button type="text"
            size="small">详情</el-button>
          <el-button type="text"
            size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="mt-20"
      ref="paginations"
      :page-size="query.rows"
      :current-page="query.page"
      layout="total, prev, pager, next"
      :total="total" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      query: {
        keywords: '',
        type: '',
        status: '',
        rows: 20,
        page: 1
      },
      total: 0, //总条数
      resultData: []
    };
  }
};
</script>