/*
 * 公共占位页
 */
<template>
  <section>
    <transition name="fade"
      mode="out-in"
      v-if="$router.currentRoute.meta.keepAlive">
      <keep-alive>
        <router-view/>
      </keep-alive>
    </transition>
    <transition>
      <router-view v-if="!$router.currentRoute.meta.keepAlive"
        :key="key" />
    </transition>
  </section>
</template>
<script>
export default {
  name: 'index',
  computed: {
    key() {
      return this.$route.name !== undefined ?
        this.$route.name + Number(Date.now()) :
        this.$route + Number(Date.now());
    }
  }
};
</script>