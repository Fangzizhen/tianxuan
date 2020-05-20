<template>
	<view class="page">
		登录
	</view>
</template>

<script>
	export default{
		data() {
			return {
			
			}
		},
		onReady() {
			// 判断是否是微信浏览器打开
			var isWeixin = this.$api.isWeiXin()
		},
		methods:{
			
		},
	}
</script>

<style lang="less">
</style>
