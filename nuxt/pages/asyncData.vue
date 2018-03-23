<template>

    <div>
        <h1>
            姓名：{{ info.name }}
        </h1>
        <h2>年龄：{{info.age}}</h2>
        <h2>兴趣：{{info.interest}}</h2>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      name: 'hello world'
    };
  },
  async asyncData() {
    let {data} = await axios.get('https://api.myjson.com/bins/iik7n')
    return {
        info: data
    }
  }
};
</script>
