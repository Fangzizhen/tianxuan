<template>
	<view class="page">
		<view class="order">
			<view class="title">
				<text class="pinlei">{{ordrt.pinlei}}</text>
				<text class="zhuangtai">{{ordrt.zhuangtai}}</text>
			</view>
			<view class="content">
				<image class="img" :src="ordrt.img"></image>
				<view class="category">
					<view class="name">{{ordrt.name}}</view>
					<text class="guige">{{ordrt.guige}}</text>
				</view>
				<view class="number">
					<view class="danjia"><text class="symbol">￥</text>{{ordrt.danjia}}</view>
					<view class="shuliang">x{{ordrt.shuliang}}</view>
				</view>
			</view>
			<view class="statistics">总价<text class="symbol">￥</text><text class="nur">{{ordrt.zongjia}}</text>，优惠<text class="symbol">￥</text><text
				 class="nur">{{ordrt.youhui}}</text>，实付款<text class="symbol">￥</text><text class="nur">{{ordrt.shiji}}</text></view>
			<view class="logisticsList">
				<view class="logistics">
					<text class="name">订单编号</text>
					<text class="logistics_content num">{{ordrt.orderNum}}</text>
					<text class="btn" @click="copy(ordrt.orderNum)">复制单号</text>
				</view>
				<view class="logistics">
					<text class="name">国内承运人</text>
					<text class="logistics_content" style="font-size: 24rpx;">{{ordrt.carrierName}}</text>
				</view>
				<view class="logistics">
					<text class="name">国内承运人电话</text>
					<text class="logistics_content num txtcolor">{{ordrt.carrierPhone}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	// h5复制插件
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		data() {
			return {
				ordrt: {
					goods_id: 1,
					pinlei: "时令鲜果",
					zhuangtai: "卖家已发货",
					name: "四川眉山9号橙一个长长的名字的展示形式",
					danjia: "45",
					shuliang: "2",
					guige: "#5g 1支装",
					zongjia: 90,
					youhui: "0",
					shiji: 90,
					img: "../../static/images/touxiang.jpg",
					orderNum: '110000000000',
					carrierName: "圆通快递",
					carrierPhone: "95166666666"
				}
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			console.log(option)

		},
		methods: {
			// 触发方法
			copy(orderNum) {
				let content = orderNum // 复制内容，必须字符串，数字需要转换为字符串
				const result = h5Copy(content)
				if (result === false) {
					uni.showToast({
						title: '不支持',
					})
				} else {
					uni.showToast({
						title: '复制成功',
						icon: 'none'
					})
				}

			}
		}
	}
</script>

<style scoped lang="less">
	.page {
		border-top: 1rpx #F7F3F1 solid;

		.order {
			background-color: #fff;
			padding: 38rpx 24rpx 6rpx 32rpx;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 18rpx;

				.pinlei {
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.zhuangtai {
					font-size: 24rpx;
					line-height: 34rpx;
					color: #FF9377;
				}
			}

			.content {
				display: flex;
				justify-content: space-between;

				.img {
					width: 180rpx;
					height: 180rpx;
				}

				.category {
					width: 410rpx;

					.name {
						font-size: 28rpx;
						line-height: 40rpx;
						min-height: 80rpx;
					}

					.guige {
						height: 33rpx;
						padding: 4rpx 8rpx;
						border-radius: 6rpx;
						background-color: #D8D8D8;
						font-size: 20rpx;
						line-height: 33rpx;
						text-align: center;
						color: #999999;
					}
				}

				.number {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					font-family: Akrobat-Regular;

					.danjia {
						font-size: 28rpx;
						line-height: 34rpx;
						margin-bottom: 8rpx;

						.symbol {
							font-size: 24rpx;
						}
					}

					.shuliang {
						font-size: 22rpx;
						line-height: 26rpx;
						color: #969696;
					}
				}
			}

			.statistics {
				text-align: right;
				font-size: 28rpx;
				margin-bottom: 66rpx;

				.symbol {
					font-family: Akrobat-Regular;
					font-size: 22rpx;
				}

				.nur {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
				}
			}

			.logisticsList {
				.logistics {
					display: flex;
					align-items: center;
					color: #333333;
					justify-content: space-between;
					margin-bottom: 36rpx;

					.num {
						font-family: Akrobat-Regular;
					}

					.txtcolor {
						color: #FE7956;
					}

					.name {
						font-size: 24rpx;
						margin-right: 32rpx;
					}

					.logistics_content {
						flex: 1;
						font-size: 36rpx;
					}

					.btn {
						width: 123rpx;
						padding: 4rpx;
						font-size: 22rpx;
						line-height: 32rpx;
						background-color: #F7F3F1;
						text-align: center;
						border-radius: 12rpx;
					}
				}
			}
		}
	}
</style>
