<template>
	<!-- 贡献值 -->
	<view class="content">
		<view class="balance_title">
			<view class="balance_key">贡献值(元)</view>
			<view class="balance_val">3432.00</view>
			<view class="strip_box"></view>
		</view>
		<view class="text">您成为添大米后，可获得年度贡献值，</br>并享受年度贡献值奖励。</view>
		<view class="text">您与您推荐的添米粉们所有认购的订单，</br> 均可为您增加贡献值。</view>
		
		
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
	page{
		background-color: #FFFFFF;
	}
	.txt{
		font-family: SourceHanSansCN-Regular;
	}
	.num{
		font-family: Akrobat-Regular;
	}
	.content{
		
		height: 100%;
		border-top: 1rpx solid #DBDBDB;
		font-family: SourceHanSansCN-Regular;
		.balance_title{
			padding: 52rpx 36rpx;
			padding-bottom: 70rpx;
			margin-bottom: 64rpx;
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
		.text{
			text-align: center;
			font-size:32rpx;
			color:rgba(254,121,86,1);
			line-height:70rpx;
			letter-spacing:2rpx;
			margin-bottom: 16rpx;
		}
	}
</style>
