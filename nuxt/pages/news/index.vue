<template>
	<div>
		<h2>news index page</h2>
		<p>NEWSID: {{$route.params.newsId}}</p>
		<ul>
			<li>
				<a href="/">home</a>
			</li>
			<li>
				<nuxt-link :to="{name:'news-id',params:{id:123, title:'神族九帝1'}}">News-1</nuxt-link>
			</li>
			<li>
				<a href="/news/456">News-2</a>
			</li>
		</ul>
	</div>
</template>
