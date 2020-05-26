<template>
	<view class="content_box">
		<!-- 收货地址 -->
		<view class="list " @click="checkAddress">
			<view class="wrapper">
				<view v-if="addressList.default" class="default ico">默</view>
				<view v-else class="unDefault  ico">方</view>
				<view class="data-box">
					<view class="u-box">
						<text class="name">{{addressList.name}}</text>
						<text class="mobile">{{addressList.mobile}}</text>
					</view>
					<view class="address-box">
						<text class="address">{{addressList.addressName}} {{addressList.area}}</text>
					</view>
				</view>
			</view>
			<view class="img_box">
				<image class="icon_right" src="../../static/images/icon-gengduo.png"></image>
			</view>
		</view>
		<!-- 商品 -->
		<view class="order_list" v-for="(item,index) in orderData.item" :key="index">
			<view class="order">
				<view class="title">
					<text class="pinlei">{{item.pinlei}}</text>
				</view>
				<view class="content">
					<image class="img" :src="item.image"></image>
					<view class="category">
						<view class="name">{{item.title}}</view>
						<text class="guige">{{item.attr_val}}</text>
					</view>
					<view class="number">
						<view class="danjia"><text class="symbol">￥</text>{{item.price}}</view>
						<view class="shuliang">x{{item.number}}</view>
					</view>
				</view>
				<view class="statistics">总价<text class="symbol">￥</text><text class="nur">100</text>，优惠<text class="symbol">￥</text><text
					 class="nur">6</text>，实付款<text class="symbol">￥</text><text class="nur">77</text></view>
			</view>
			<view class="input_box">
				<text>配送方式</text>
				<input type="text" placeholder="普通配送" disabled="true" />
			</view>
			<view class="input_box">
				<text>订单备注</text>
				<input type="text" placeholder="选填，请先和客服协商一致" />
			</view>
			<view class="statisticsBox">
				<view class="unit">共 <text class="num">2</text>件</view>小计:<view class="subtotalMoney num">￥<text>90</text></view>
			</view>
		</view>
		<view class="payment_list">
			<view class="payment">
				<image class="type_img" src="../../static/images/wechatPayment.png" mode=""></image>
				<text>微信支付</text>
				<image class="tick" src="../../static/images/tick.png" mode=""></image>
			</view>
		</view>
		
		<view class="submit_bar">
			<view class="settlement_box">
				<view class="settlement_txt">合计:<view class="symbol">￥<text class="price">{{orderData.total}}</text><text class="save">（省{{orderData.saveMoney}}）</text></view>
				</view>
				<view class="settlement_btn" >结算</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderData: [], //订单数据
				addressList: {
					name: '方梓臻',
					mobile: '18666666666',
					addressName: '北京市 朝阳区 光华街道 世纪财富中心A座1808',
					address: '北京市东城区',
					area: 'B区',
					default: true
				}
			};
		},
		onLoad(e) {
			this.orderData = JSON.parse(e.data)
			console.log(this.orderData)
		},
		methods: {
			//选择地址
			checkAddress() {
				uni.navigateTo({
					url: "../address/addressList"
				})
			},
		}
	}
</script>

<style lang="less" scoped>
	.content_box{
		padding-bottom: 170rpx;
	}
	.list {
		display: flex;
		align-items: center;
		height: 130rpx;
		padding: 0rpx 38rpx 24rpx 16rpx;
		background: #fff;
		margin-bottom: 12rpx;
		z-index: 100;
		.wrapper {
			display: flex;
			align-items: center;
			flex: 1;
			.data-box {
				flex: 1;
			}
			.ico {
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				font-size: 36rpx;
				line-height: 60rpx;
				color: #fff;
				text-align: center;
				margin-right: 22rpx;
			}

			.default {
				background-color: #FE7956;
			}

			.unDefault {
				background-color: #F5EFEF;
			}
		}

		.address-box {
			.address {
				font-size: 24rpx;
				line-height: 42rpx;
			}
		}

		.u-box {
			.name {
				font-size: 32rpx;
				line-height: 44rpx;
				margin-right: 16rpx;
			}

			.mobile {
				font-size: 28rpx;
				font-family: Akrobat-Regular;
				color: rgba(174, 174, 174, 1);
				line-height: 34rpx;
			}
		}

		.icon-bianji {
			display: flex;
			align-items: center;
			height: 80rpx;
			font-size: 40rpx;
			padding-left: 30rpx;
		}

		.img_box {
			width: 28rpx;
			height: 28rpx;

			.icon_right {
				width: 100%;
				height: 100%;
			}
		}
	}

	.order_list {
		background-color: #fff;
		padding: 38rpx 24rpx 44rpx 32rpx;
		margin-bottom: 12rpx;

		.order {
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
						margin-bottom: 62rpx;

						.symbol {
							font-size: 24rpx;
						}
					}

					.shuliang {
						font-size: 26rpx;
						line-height: 26rpx;
						color: #969696;
					}
				}
			}

			.statistics {
				text-align: right;
				font-size: 28rpx;
				margin-bottom: 24rpx;

				.symbol {
					font-family: Akrobat-Regular;
					font-size: 22rpx;
				}

				.nur {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
				}
			}

			.btn_box {
				display: flex;
				flex-direction: row-reverse;
				text-align: center;
				font-size: 26rpx;
				line-height: 50rpx;

				.receipt {
					width: 170rpx;
					height: 50rpx;
					color: #FF9377;
					border: 1rpx #FF9377 solid;
					border-radius: 6rpx;
					margin-left: 30rpx;
				}

				.logistics {
					width: 170rpx;
					height: 50rpx;
					border: 1rpx #979797 solid;
					color: #979797;
					border-radius: 6rpx;
				}
			}

			.statistics {
				text-align: right;
				font-size: 28rpx;
				margin-bottom: 24rpx;

				.symbol {
					font-family: Akrobat-Regular;
					font-size: 22rpx;
				}

				.nur {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
				}
			}
		}

		.input_box {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			line-height: 34rpx;
			padding: 20rpx 0;

			input {
				flex: 1;
				font-size: 24rpx;
				line-height: 34rpx;
				margin-left: 20rpx;
			}
		}

		.statisticsBox {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			font-size: 22rpx;
			line-height: 32rpx;

			.unit {
				font-size: 22rpx;
				line-height: 32rpx;
				color: #AEAEA0;
				margin-right: 10rpx;

				text {
					font-size: 28rpx;
					line-height: 34rpx;
				}
			}

			.subtotalMoney {
				color: #FE7956;
				font-size: 24rpx;
				line-height: 30rpx;
				margin-left: 10rpx;

				text {
					font-size: 32rpx;
					line-height: 40rpx;
				}
			}
		}

	}
	.submit_bar{
		background-color: #FFFFFF;
		width: 100%;
		padding: 20rpx 24rpx;
		padding-right: 0;
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		.settlement_box {
			margin-right: 34rpx;
			color: #FE7956;
			display: flex;
			line-height: 44rpx;
			.settlement_txt {
				display: flex;
				align-items: center;
				font-size: 32rpx;
				margin-right: 20rpx;
				.symbol {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
					line-height: 34rpx;
		
					.price {
						font-size: 40rpx;
						line-height: 48rpx;
					}
					.save{
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}
			}
		
			.settlement_btn {
				text-align: center;
				line-height: 60rpx;
				width: 166rpx;
				height: 60rpx;
				border-radius: 6rpx;
				color: #FE7956;
				border: 1px solid #FE7956;
				font-size: 32rpx;
			}
		}  
	}
	
	.payment_list{
		.payment{
			display: flex;
			justify-content: space-between;
			background-color: #FFFFFF;
			padding: 48rpx 40rpx;
			.type_img{
				width: 40rpx;
				height: 46rpx;
				margin-right: 24rpx;
			}
			text{
				flex: 1;
			}
			.tick{
				width: 32rpx;
				height: 32rpx;
			}
		}
	}
</style>
