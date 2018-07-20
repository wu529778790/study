class Vue {
  constructor(options) {
    this.$el = options.el; // 挂载
    this.$data = options.data;

    // 如果有需要编译的就开始编译
    if (this.$el) {
      // 用数据和元素进行编译
      new Compile(this.$el, this);
    }
  }
}
