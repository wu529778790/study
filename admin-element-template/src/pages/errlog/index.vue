/*
 * 错误日志页
 * @Date: 2018-04-13 17:54:09 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:54:09 
 */
<template>
  <div class="errPage-container">
    <el-table :data="logsList">
      <el-table-column label="message">
        <template slot-scope="scope">
          <div>msg:{{ scope.row.err.message }}</div>
          <br>
          <div>url: {{ scope.row.url }}</div>
        </template>
      </el-table-column>
      <el-table-column label="stack">
        <template slot-scope="scope">
          {{ scope.row.err.stack }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logsList: this.$store.getters.errLog
    };
  }
};
</script>

<style lang="scss" scoped>
.errPage-container {
  padding: 30px;
}
</style>
