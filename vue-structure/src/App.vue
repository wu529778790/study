<template>
  <div class="example">
  <div>
    {{ msg }}
  </div>
  <div class="img">
    <img src="./assets/logo.jpg">
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  }
}
</script>

<style lang="stylus" scoped>
.example
  color: red
  img
    width: 100%
</style>
