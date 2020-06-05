<template>
	<!-- 订单详情 -->
	<view class="page">
		<view class="list " >
			<view class="wrapper">
				<view  class="unDefault  ico">{{addressList.title_name}}</view>
				<view class="data-box">
					<view class="u-box">
						<text class="name">{{addressList.name}}</text>
						<text class="mobile">{{addressList.tel}}</text>
					</view>
					<view class="address-box">
						<text class="address">{{addressList.province_name}} {{addressList.city_name}} {{addressList.county_name}}{{addressList.address}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="order">
			<view v-for="(item,index) in orderData.items" :key="index">
			<view class="title">
				<text class="pinlei">{{item.category}}</text>
				<text class="zhuangtai">{{orderData.pay_status_name}}</text>
			</view>
			<view class="content">
				<image class="img" :src="item.images"></image>
				<view class="category">
					<view class="name">{{item.title}}</view>
					<text class="guige" v-if="item.spec_text !=null ">{{item.spec_text}}</text>
				</view>
				<view class="number">
					<view class="danjia"><text class="symbol">￥</text>{{item.price}}</view>
					<view class="shuliang">x{{item.buy_number}}</view>
				</view>
			</view>
			
				
			</view>
			<!-- <view class="statistics">总价<text class="symbol">￥</text><text class="nur">{{orderData.total_price}}</text>，优惠<text class="symbol">￥</text><text
				 class="nur"></text>，实付款<text class="symbol">￥</text><text class="nur"></text></view> -->
				 <view class="statistics">
				 	{{orderData.describe}}
				 </view>
			<view class="logisticsList">
				<view class="logistics">
					<text class="name">订单编号</text>
					<text class="logistics_content num">{{orderData.order_no}}</text>
					<text class="btn" @click="copy(orderData.order_no)">复制单号</text>
				</view>
				<view class="logistics">
					<text class="name">订单模式</text>
					<text class="logistics_content" style="font-size: 24rpx;">{{orderData.order_model_name}}</text>
				</view>
				<view class="logistics">
					<text class="name">订单状态</text>
					<text class="logistics_content" style="font-size: 24rpx;">{{orderData.status_name}}</text>
				</view>
				<view class="logistics">
					<text class="name">支付方式</text>
					<text class="logistics_content" style="font-size: 24rpx;">{{orderData.payment_name}}</text>
				</view>
				<view class="logistics">
					<text class="name">创建时间</text>
					<text class="logistics_content num ">{{orderData.add_time}}</text>
				</view>
				<view class="logistics">
					<text class="name">确认时间</text>
					<text class="logistics_content num ">{{orderData.confirm_time}}</text>
				</view>
				<view class="logistics">
					<text class="name">国内承运人</text>
					<text class="logistics_content" style="font-size: 24rpx;">圆通快递</text>
				</view>
				<view class="logistics">
					<text class="name">国内承运人电话</text>
					<text class="logistics_content num txtcolor">95166666666</text>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request.js';
	// h5复制插件
	import h5Copy from '@/js_sdk/junyi-h5-copy/junyi-h5-copy/junyi-h5-copy.js'
	export default {
		data() {
			return {
				id : '',
				orderData:{},
				addressList:[],
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			this.id = option.id;
			this.int()
		},
		methods: {
			// 足迹
			int(){
				var data = {
					id:this.id
				}
				console.log(data)
				request.post('order/detail', data).then(res => {
					this.orderData = res.data.data
					this.addressList = res.data.data.address_data
					this.addressList.title_name = this.addressList.name.substring(0,1)
					console.log(this.orderData)
				
				})
			},
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
		.list {
			display: flex;
			align-items: center;
			height: 130rpx;
			padding: 24rpx 38rpx 24rpx 16rpx;
			background: #fff;
			margin-bottom: 12rpx;
			z-index: 100;
		
			.nuwrapper {
				display: flex;
				align-items: center;
				flex: 1;
				justify-content: center;
			}
		
			.wrapper {
				display: flex;
				align-items: center;
				flex: 1;
				font-size: 32rpx;
				line-height: 44rpx;
		
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
				.tag {
					width: 70rpx;
					height: 34rpx;
					border-radius: 6rpx;
					font-size: 24rpx;
					line-height: 34rpx;
					margin-right: 10rpx;
					background: #FEEAE5;
					text-align: center;
					color: #FE7956;
					padding: 4rpx 10rpx;
				}
		
				.addAble {
					height: 34rpx;
					border-radius: 6rpx;
					font-size: 24rpx;
					line-height: 34rpx;
					margin-right: 10rpx;
					padding: 4rpx 10rpx;
					background-color: #F4F4F4;
					color: #333333;
				}
		
				.address {
					font-size: 24rpx;
					line-height: 42rpx;
					color: #333333;
				}
			}
		
			.u-box {
				.name {
					font-size: 32rpx;
					line-height: 44rpx;
					margin-right: 16rpx;
				}
		
				.mobile {
					font-size: 32rpx;
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
						font-size: 32rpx;
						line-height: 34rpx;
						margin-bottom: 8rpx;

						.symbol {
							font-size: 28rpx;
						}
					}

					.shuliang {
						margin-top: 6rpx;
						font-size: 26rpx;
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
						font-size: 32rpx;
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
