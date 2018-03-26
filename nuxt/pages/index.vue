<template>
  <div>
    <ul>
      <li>
        <nuxt-link :to="{name:'index'}">HOME</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name:'about'}">ABOUT</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name:'news',params:{newsId:3306}}">NEWS</nuxt-link>
      </li>
    </ul>
    <div>
      <img src="~static/logo.jpg" alt="">
      <br/>
      背景图片的引入
      background-image: url('~static/logo.png')
    </div>
  </div>
</template>