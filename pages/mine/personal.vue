<template>
	<view class="page">
		<view class="uni-form-item uni-column">
			<view class="title">昵称</view>
			<input class="uni-input" placeholder-class="placeholder" placeholder="微信昵称" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">手机号</view>
			<input class="uni-input" placeholder-class="placeholder" placeholder="手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">头像</view>
			<!-- <input class="uni-input" focus placeholder="" /> -->
		</view>
		<view class="btn" style="">提交</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.page {
		// background: #F7F3F1;
	}
	.btn {
		width: 700rpx;
		height: 82rpx;
		line-height: 82rpx;
		background: #FEEAE5;
		color: #FE7956;
		margin: 100rpx auto;
		text-align: center;
	}
	.uni-form-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 114rpx;
		width: 100%;
		border-bottom: 1px #DBDBDB solid;

		.title {
			width: 150rpx;
			text-align: center;
			font-size: 28rpx;
			color: #AEAEAE;
			margin: 0 10rpx;
		}

		.uni-input {
			flex: 1;
			height: 114rpx;
			line-height: 114rpx;
			align-items: center;
			font-size: 28rpx;
			color: #AEAEAE;
		}

		.placeholder {
			font-size: 28rpx;
			color: #AEAEAE;
		}

		

	}
</style>
