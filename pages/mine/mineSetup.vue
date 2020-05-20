<template>
	<view class="content ">
			<navigator  class="navto" url="../address/addressList" open-type="navigate">
				<text>个人信息</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
			</navigator>
			<navigator  class="navto" url="../address/addressList" open-type="navigate">
				<text>地址管理</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
			</navigator>
			<navigator  class="navto" url="../address/addressList" open-type="navigate">
				<text>银行卡管理</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
			</navigator>
			<navigator  class="navto" url="../address/addressList" open-type="navigate">
				<text>账号与安全</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
			</navigator>
			<navigator  class="navto" url="../address/addressList" open-type="navigate">
				<text>关于添选</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
			</navigator>
			
		</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
	export default {
		data() {
			return {
				
			}
		},
		onLoad(option) {
			this.res()
		},
		methods: {
			res() {
				var data = {
					pid:0
				};
				request.post('region/index', data).then(res => {
					console.log(res)
				})
			},
		}
	}
</script>

<style lang="less">
.content{
	border-top: 1rpx solid #DBDBDB;
	.navto{
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 38rpx;
		height: 112rpx;
		border-bottom: 1rpx solid #DBDBDB;
		text{
			font-size: 28rpx;
		}
		image{
			width: 28rpx;
			height: 28rpx;
		}
	}
}
</style>
