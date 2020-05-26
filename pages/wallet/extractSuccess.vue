<template>
	<view class="content">
		<image src="../../static/images/success.png" mode=""></image>
		<text>提现申请已提交，等待银行处理</text>
		<view @tap="navigateBack">返回我的余额</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			navigateBack(){
				uni.navigateBack({
				    delta: 2
				});
			}
		
		}
	}
</script>

<style scoped lang="less">
	page{
		background-color: #FFFFFF;
		.content{
			display: flex;
			flex-direction: column;
			align-items: center;
			image{
				width: 150rpx;
				height: 150rpx;
				margin: 58rpx 0;
				
			}
			text{
				font-size: 32rpx;
				line-height: 44rpx;
				margin-bottom: 74rpx;
			}
			view{
				width:679rpx;
				height:82rpx;
				background:rgba(254,234,229,1);
				border-radius:12rpx;
				border:1rpx solid rgba(254,234,229,1);
				line-height: 82rpx;
				text-align: center;
				font-size: 32rpx;
				color: #FE7956;
			}
		}
	}
	
</style>
