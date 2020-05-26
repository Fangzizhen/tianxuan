<template>
	<view class="content">
		<view class="balance_title">
			<view class="balance_key">添米宝(元)</view>
			<view class="balance_val">3432.00</view>
			<view class="strip_box"></view>
		</view>
		<view class="reward_box">
			<view class="reward_key">推荐奖励</view>
			<view class="reward_val num">¥10</view>
		</view>
		<view class="reward_box">
			<view class="reward_key">管道奖励</view>
			<view class="reward_val num">¥10</view>
		</view>
		<view class="reward_box">
			<view class="reward_key">提现</view>
			<view class="reward_val num">¥10</view>
		</view>
		
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		onLoad() {
			
		},
		methods:{
			
		}
	}
</script>

<style scoped lang="less">
	.txt{
		font-family: SourceHanSansCN-Regular;
	}
	.num{
		font-family: Akrobat-Regular;
	}
	.content{
		border-top: 1rpx solid #DBDBDB;
		font-family: SourceHanSansCN-Regular;
		.balance_title{
			padding: 52rpx 36rpx;
			padding-bottom: 70rpx;
			background-color: #FFFFFF;
			margin-bottom: 12rpx;
			.balance_key{
				text-align: center;
				font-size: 32rpx;
				line-height: 42rpx;
				margin-bottom: 24rpx;
			}
			.balance_val{
				text-align: center;
				font-size:80rpx;
				font-family: Akrobat-Regular;
				color:rgba(254,121,86,1);
				line-height:98rpx;
				margin-bottom: 74rpx;
			}
			.strip_box{
				width: 100%;
				border-radius: 82rpx;
				display: flex;
				height: 20rpx;
				overflow: hidden;
				opacity: 0.7;
				background:linear-gradient(135deg,rgba(255,209,202,1) 0%,rgba(255,232,194,1) 100%);
			}
			
			
		}
		.reward_box{
			background-color: #FFFFFF;
			padding: 28rpx 38rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx #DBDBDB solid;
			.reward_key{
				color: #555555;
				font-size: 32rpx;
				line-height: 44rpx;
			}
			.reward_val{
				color: #AEAEAE;
				font-size: 32rpx;
				line-height: 44rpx;
			}
		}
		
	
	}
</style>
