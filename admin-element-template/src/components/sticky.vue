/*
 * 滚动悬停组件
 * @Date: 2018-04-13 17:51:53 
 * @Last Modified by: liangzc
 * @Last Modified time: 2018-04-13 17:53:09
 */
<template>
  <div :style="{height:height+'px',zIndex:zIndex}">
    <div :class="className"
      :style="stickyStyle">
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sticky',
  props: {
    stickyTop: {
      type: Number,
      default: 0
    },
    stickyHeight: {
      type: Number,
      default: 0
    },
    zIndex: {
      type: Number,
      default: 1
    },
    className: {
      type: String
    }
  },
  data() {
    return {
      active: false,
      position: '',
      currentTop: '',
      width: undefined,
      height: undefined,
      child: null
    };
  },
  computed: {
    stickyStyle() {
      return {
        top: this.stickyTop + 'px',
        zIndex: this.zIndex,
        position: this.position,
        width: this.width,
        height: this.height + 'px'
      };
    }
  },
  methods: {
    sticky() {
      if (this.active) {
        return;
      }
      this.position = 'fixed';
      this.active = true;
      this.width = this.width + 'px';
    },
    reset() {
      if (!this.active) {
        return;
      }
      this.position = '';
      this.width = 'auto';
      this.active = false;
    },
    handleScroll() {
      this.width = this.$el.getBoundingClientRect().width;
      const offsetTop = this.$el.getBoundingClientRect().top;
      if (offsetTop <= this.stickyTop) {
        this.sticky();
        return;
      }
      this.reset();
    }
  },
  mounted() {
    this.height = this.$el.getBoundingClientRect().height + this.stickyHeight;
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>
