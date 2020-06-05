<template>
	<!-- 设置 -->
	<view class="content ">
		<navigator  class="navto" url="" open-type="navigate">
				<text>个人信息</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
			</navigator>
		<navigator class="navto" url="../address/addressList" open-type="navigate">
			<text>地址管理</text>
			<image src="../../static/images/icon-gengduo.png" mode=""></image>
		</navigator>
		<navigator  class="navto" url="" open-type="navigate">
				<text>银行卡管理</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
			</navigator>
		<navigator  class="navto" url="" open-type="navigate">
				<text>账号与安全</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
			</navigator>
		<navigator class="navto" url="" open-type="navigate">
			<text>关于添选</text>
			<image src="../../static/images/icon-gengduo.png" mode=""></image>
		</navigator>
		<view class="outBtn" @click="userOut">退出登录</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {},
		methods: {
			userOut(){
				try {
					
					uni.showModal({
						title: '提示',
						content: '确认退出登录吗？',
						success: function(res) {
							if (res.confirm) {
								uni.clearStorageSync();
								uni.showToast({
									icon:"none",
								    title: '退出成功',
										duration: 2000,
										success() {
											setTimeout(() => {
												uni.switchTab({ url: "../index/index"});
											}, 2000);
											
										}
								});
								
								
							}
						}
					});
					
					
					
				    
				} catch (e) {
				    // error
				}
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		border-top: 1rpx solid #DBDBDB;

		.navto {
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 0 38rpx;
			height: 112rpx;
			border-bottom: 1rpx solid #DBDBDB;

			text {
				font-size: 28rpx;
			}

			image {
				width: 28rpx;
				height: 28rpx;
			}
		}

		.outBtn {
			position: fixed;
			left: 30rpx;
			right: 30rpx;
			bottom: 16rpx;
			z-index: 95;
			display: flex;
			align-items: center;
			justify-content: center;
			width: 679rpx;
			height: 82rpx;
			font-size: 32rpx;
			color: #FE7956;
			border-radius: 10rpx;
			border: none;
			background-color: #FEEAE5;
		}
	}
</style>
