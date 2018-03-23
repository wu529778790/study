<template>
  <div>
      <h1 v-if="error.statusCode==404">404 not found</h1>
      <h2 v-else>500服务器错误</h2>
      <ul>
          <li>
              <nuxt-link to="/">
                  home
              </nuxt-link>
          </li>
      </ul>
  </div>
</template>

<script>
export default {
  props: ['error']
}
</script>

