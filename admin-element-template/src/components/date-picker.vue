/*
 * 封装el-date-picker
 * @Author: liangzc 
 * @Date: 2018-04-13 17:49:44 
 * @Last Modified by:   liangzc 
 * @Last Modified time: 2018-04-13 17:49:44 
 */
<template>
  <el-date-picker v-model="date"
    :type="type"
    :placeholder="placeholder"
    :format="format"
    :picker-options="pickerOptions"
    :range-separator="rangeSeparator"
    :default-value="defaultValue"
    :clearable="clearable"
    :readonly="readonly"
    :disabled="disabled">
  </el-date-picker>
</template>
<script>
export default {
  name: 'date-picker',
  props: {
    /**
     * v-model
     */
    value: {
      type: [String, Date, Number, Array]
    },
    /**
     * 类型
     */
    type: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String
    },
    /**
     * 日期格式化
     */
    format: {
      type: String
    },
    /**
     * 日期结果格式化类型
     */
    valueFormat: {
      type: String
    },
    /**
     * 当前时间日期选择器特有的选项
     */
    pickerOptions: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /**
     * 选择范围时的分隔符
     */
    rangeSeparator: {
      type: String,
      default: ' - '
    },
    /**
     * DatePicker打开时默认显示的时间
     */
    defaultValue: {
      type: Date
    },
    /**
     * 是否只读
     */
    readonly: {
      type: Boolean,
      default: false
    },
    /**
     * 是否禁用
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * 是否显示清楚按钮
     */
    clearable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      date: ''
    };
  },
  watch: {
    date(val) {
      if (Array.isArray(val)) {
        this.$emit(
          'input',
          val.length > 0 && !this.$utils.isEmpty(this.valueFormat)
            ? val.map(vl => this.$utils.formatDateTime(vl, this.valueFormat))
            : val
        );
      } else {
        this.$emit(
          'input',
          !this.$utils.isEmpty(val) && !this.$utils.isEmpty(this.valueFormat)
            ? this.$utils.formatDateTime(val, this.valueFormat)
            : val
        );
      }
    },
    value(val) {
      if (Array.isArray(val) && Array.isArray(this.date)) {
        if (val[0] !== this.date[0] || val[1] !== this.date[1]) this.date = val;
      } else {
        this.date = val;
      }
    }
  }
};
</script>


