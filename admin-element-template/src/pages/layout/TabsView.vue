/*
 * 历史视图
 */
<template>
  <div class="tabs-view-container">
    <router-link class="tabs-view"
      v-for="tag in Array.from(visitedViews)"
      v-if="!$utils.isEmpty(tag.meta.title)"
      :to="tag.meta.fullPath || tag.path"
      :key="tag.meta.fullPath || tag.path">
      <el-tag :closable="true"
        :type="isActive(tag.meta.fullPath || tag.path)?'primary':''"
        @close="closeViewTabs(tag,$event)">
        {{ tag.meta.title }}
      </el-tag>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    visitedViews() {
      return this.$store.getters.visitedViews.slice(-6);
    }
  },
  methods: {
    closeViewTabs(view, $event) {
      this.$store.dispatch('delVisitedViews', view).then(views => {
        if (this.isActive(view.path)) {
          const latestView = views.slice(-1)[0];
          if (latestView) {
            this.$router.push(latestView.path);
          } else {
            this.$router.push('/');
          }
        }
      });
      $event.preventDefault();
    },
    generateRoute() {
      let lastMatch = this.$route.matched[this.$route.matched.length - 1];
      if (lastMatch.meta.title) {
        lastMatch.meta.fullPath = this.$route.fullPath;
        return lastMatch;
      }
      this.$route.matched[0].path = '/';
      return this.$route.matched[0];
    },
    addViewTabs() {
      this.$store.dispatch('addVisitedViews', this.generateRoute());
    },
    isActive(path) {
      return path === this.$route.path || path === this.$route.fullPath;
    }
  },
  watch: {
    $route() {
      setTimeout(() => {
        this.addViewTabs();
      }, 0);
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.tabs-view-container {
  display: inline-block;
  vertical-align: top;
  margin-left: 10px;
  .tabs-view {
    margin-left: 10px;
  }
}
</style>
