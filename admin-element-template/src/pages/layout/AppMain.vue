/*
 * 内容窗口
 * @Date: 2018-04-13 17:45:40 
 * @Last Modified by: liangzc
 * @Last Modified time: 2018-04-16 10:16:27
 */
<template>
  <section class="app-main"
    style="min-height: 100%">
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
  name: 'app-main',
  computed: {
    key() {
      return this.$route.name !== undefined ?
        this.$route.name + Number(Date.now()) :
        this.$route + Number(Date.now());
    }
  }
};
</script>
