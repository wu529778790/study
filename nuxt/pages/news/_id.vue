<template>
  <div>
      <h2>
          news-content [{{$route.params.id}}]
      </h2>
      <ul>
          <li><a href="/">home</a></li>
      </ul>
  </div>
</template>

<script>
export default {
  validate ({params}) {
      return /^\d+$/.test(params.id)
  }
}
</script>
