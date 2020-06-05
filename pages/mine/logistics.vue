<template>
	<view class="page">
		<view class="order" v-for="(order,index) in orderData" :key="index" @click="toDetail(order.express_id,order.express_number)">
			<view class="title">
				<text class="pinlei">包裹{{index += 1}}</text>
			</view>
			<view v-for="(item,indexd) in order.order_detail" :key="indexd">
			<view class="content">
				<image class="img" :src="item.images"></image>
				<view class="category">
					<view class="name">{{item.title}}</view>
					<!-- <text class="guige">快递已送达</text> -->
				</view>
			</view>
			</view>
			<view class="logisticsList">
				<view class="logistics">
					<text class="name">订单快递单号</text>
					<text class="logistics_content num">{{order.express_number}}</text>
					<text class="btn" @click="copy(order.express_number)">复制单号</text>
				</view>
				<view class="logistics">
					<text class="name">国内承运单位</text>
					<text class="logistics_content" style="font-size: 24rpx;">{{order.express_name}}</text>
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
				orderData:{}
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			this.id = option.id;
			this.int()
		},
		onPullDownRefresh() {
			this.int();
		},
		methods: {
			
			
			// 足迹
			int(){
				var data = {
					order_id:this.id
				}
				console.log(data)
				request.post('package/index', data).then(res => {
					console.log(res)
					this.orderData = res.data
					console.log(this.orderData)
					// console.log(this.orderData)
				
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

			},
			// 进入详情
			toDetail(id,code){
				uni.navigateTo({
					// url: 'afterSalseDetail?info='+encodeURIComponent(JSON.stringify(parameter))
					url:"logisticsDetail?id="+id+"&code="+encodeURIComponent(JSON.stringify(code))
				})
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
			margin-bottom: 20rpx;
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
				.img {
					width: 180rpx;
					height: 180rpx;
				}

				.category {
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					flex: 1;
					margin-left: 20rpx;
					.name {
						font-size: 28rpx;
						line-height: 40rpx;
						min-height: 80rpx;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}

					.guige {
						font-size: 25rpx;
						line-height: 40rpx;
						color: #999999;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						-webkit-box-orient: vertical;
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
