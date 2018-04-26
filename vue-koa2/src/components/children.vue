<template>
  <div>
    子组件 {{this.data}}
    <button @click="click">button</button>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String
    }
  },
  methods: {
    click () {
      this.data = '6666666666'
    }
  }
}
</script>
