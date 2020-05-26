<template>
	<view class="content">
		<view class="balance_title">
			<view class="balance_key">余额(元)</view>
			<view class="balance_val">3432.00</view>
			<view class="strip_box"><view class="long"></view><view class="short"></view></view>
			<view class="balance_list">
				<view class="balance">
					<view class="balance_name">可提现余额(元)</view>
					<view class="balance_num num">3332.00</view>
				</view>
				<view class="balance">
					<view class="balance_name">在途金额(元)</view>
					<view class="balance_num num">100.00</view>
				</view>
			</view>
			<navigator class="balance_btn" open-type="navigate" url="withdrawal">提现</navigator>
		</view>
		<view class="reward_list">
			<view class="reward">
				<view class="reward_title">推荐奖励</view>
				<view class="reward_txt_box">
					<view class="reward_txt">
						<text class="reward_key">添米粉</text><text class="reward_val">蒋劲夫</text>
					</view>
					<view class="reward_txt">
						<text class="reward_key">奖励金额</text><text class="reward_val num">¥10</text>
					</view>
					<view class="reward_txt">
						<text class="reward_key">添小米</text><text class="reward_val">彭于晏</text>
					</view>
					<view class="reward_txt">
						<text class="reward_key">添米粉</text><text class="reward_val">吴彦祖</text>
					</view>
					<view class="reward_txt">
						<text class="reward_key">到账时间</text><text class="reward_val num">2020-05-01  12:12:12</text>
					</view>
				</view>
			</view>
			
			<view class="reward">
				<view class="reward_title">推荐奖励</view>
				<view class="reward_txt_box">
					<view class="reward_txt">
						<text class="reward_key">添米粉</text><text class="reward_val">蒋劲夫</text>
					</view>
					<view class="reward_txt">
						<text class="reward_key">奖励金额</text><text class="reward_val num">¥10</text>
					</view>
					<view class="reward_txt">
						<text class="reward_key">添小米</text><text class="reward_val">彭于晏</text>
					</view>
					<view class="reward_txt">
						<text class="reward_key">添米粉</text><text class="reward_val">吴彦祖</text>
					</view>
					<view class="reward_txt">
						<text class="reward_key">到账时间</text><text class="reward_val num">2020-05-01  12:12:12</text>
					</view>
				</view>
			</view>
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
				margin-bottom: 28rpx;
				.long{
					flex: 1;
					background:linear-gradient(135deg,rgba(255,209,202,1) 0%,rgba(255,232,194,1) 100%);
					height: 100%;
				}
				.short{
					width: 194rpx;
					height: 100%;
					background:linear-gradient(135deg,rgba(210,204,255,1) 0%,rgba(207,229,255,1) 100%);
				}
			}
			.balance_list{
				display: flex;
				justify-content: space-between;
				margin-bottom: 40rpx;
				.balance{
					.balance_name{
						font-size: 24rpx;
						line-height: 34rpx;
						color: #AEAEAE;
						margin-bottom: 10rpx;
					}
					.balance_num{
						font-size: 30rpx;
						line-height: 38rpx;
						color: #FE7956;
						text-align: center;
					}
				}
			}
			.balance_btn{
				display: block;
				width: 660rpx;
				height: 80rpx;
				border-radius: 12rpx;
				border: 1rpx #FE7956 solid;
				font-size: 32rpx;
				text-align: center;
				line-height: 80rpx;
				color: #FE7956;
				margin: 0 auto;
			}
		}
		.reward{
			background-color: #FFFFFF;
			margin-bottom: 12rpx;
			.reward_title{
				padding: 34rpx 38rpx 24rpx 36rpx;
				font-size: 32rpx;
				line-height: 44rpx;
				border-bottom: 1rpx #DBDBDB solid;
			}
			.reward_txt_box{
				padding: 30rpx 38rpx 18rpx 36rpx;
				.reward_txt{
					display: flex;
					justify-content: space-between;
					align-items: center;
					color: #AEAEAE;
					margin-bottom: 24rpx;
					.reward_key{
						font-size: 28rpx;
						line-height: 40rpx;
					}
					.reward_val{
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}
			}
		}
	}
</style>
