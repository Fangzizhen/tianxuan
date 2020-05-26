<template>
	<view class="content">
		<view class="list">
			<view class="millet">
				<view class="title">
					<view class="name">贡献值</view>
					<view class="money num">¥3000</view>
				</view>
				<view class="millet_content">
					<view class="key">添小米</view>
					<view class="val">蒋劲夫</view>
				</view>
				<view class="millet_content">
					<view class="key">总订单数</view>
					<view class="val num">10</view>
				</view>
				<view class="millet_content">
					<view class="key">联系方式</view>
					<view class="val num">17777777777</view>
				</view>
				<view class="millet_content">
					<view class="key">注册时间</view>
					<view class="val num">2020-05-01 </view>
				</view>
				<view class="millet_content">
					<view class="key">备注</view>
					<view class="val">蒋劲夫</view>
				</view>
			</view>
			<view class="millet">
				<view class="title">
					<view class="name">贡献值</view>
					<view class="money num">¥3000</view>
				</view>
				<view class="millet_content">
					<view class="key">添小米</view>
					<view class="val">蒋劲夫</view>
				</view>
				<view class="millet_content">
					<view class="key">总订单数</view>
					<view class="val num">10</view>
				</view>
				<view class="millet_content">
					<view class="key">联系方式</view>
					<view class="val num">17777777777</view>
				</view>
				<view class="millet_content">
					<view class="key">注册时间</view>
					<view class="val num">2020-05-01 </view>
				</view>
				<view class="millet_content">
					<view class="key">备注</view>
					<view class="val">蒋劲夫</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style scoped lang="less">
	.content {
		border-top: 1rpx solid #DBDBDB;

		.millet {
			background-color: #FFFFFF;
			padding: 34rpx 36rpx 38rpx 34rpx;
			margin-bottom: 12rpx;
			.title{
				padding-bottom: 22rpx;
				border-bottom: 1rpx #DBDBDB solid;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name{
					font-size: 32rpx;
					line-height: 44rpx;
					color: #555555;
				}
				.money{
					font-size: 32rpx;
					line-height: 40rpx;
					color: #FE7569;
				}
			}
			.millet_content{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #AEAEAE;
				margin-top: 25rpx;
				.key{
					font-size: 28rpx;
					line-height: 40rpx;
				}
				.val{
					font-size: 24rpx;
					line-height: 34rpx;
				}
				.num{
					font-size: 32rpx;
				}
				&:first-child{
					margin-top: 28rpx;
				}
			}
		}
	}
</style>
