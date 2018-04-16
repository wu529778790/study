/*
 * 封装远程数据过滤组件
 * @Author: liangzc 
 * @Date: 2018-04-13 17:48:35 
 * @Last Modified by: liangzc
 * @Last Modified time: 2018-04-13 17:49:02
 */
<template>
  <el-select v-model="selected"
    filterable
    clearable
    :placeholder="placeholder"
    @change="change">
    <el-option v-for="item in dataArray"
      :key="item.code"
      :label="getLabel(item)"
      :value="getValue(item)">
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'filter-select',
  props: {
    /**
     * v-model
     */
    value: {
      type: String
    },
    placeholder: {
      type: String
    },
    /**
     * 数据源
     */
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    /**
     * 通过接口获取数据源
     */
    dataUrl: {
      type: String
    },
    /**
     * 请求接口需要的参数
     */
    urlParam: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 要展示的label对应的key值
     */
    labelKey: {
      type: String,
      default: 'value'
    },
    /**
     * 要展示的value对应的key值
     */
    valueKey: {
      type: String,
      default: 'code'
    }
  },
  data() {
    return {
      selected: '',
      dataArray: this.data
    };
  },
  mounted() {
    !this.$utils.isEmpty(this.dataUrl) && this.getSelectData();
  },
  watch: {
    selected(val) {
      this.$emit('input', val);
    },
    value(val) {
      this.selected = val;
    }
  },
  methods: {
    /**
     * 获取数据
     */
    getSelectData() {
      this.axios({
        url: this.dataUrl,
        silence: true,
        data: this.urlParam
      }).then(resp => {
        this.dataArray = Array.isArray(resp.data) ? resp.data : [];
      });
    },
    /**
     * 获取value
     */
    getValue(item) {
      return item[this.valueKey];
    },
    /**
     * 获取label
     */
    getLabel(item) {
      return item[this.labelKey];
    },
    /**
     * 选中值改变监听
     */
    change(val) {
      this.$emit('change', val);
    }
  }
};
</script>


