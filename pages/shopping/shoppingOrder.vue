<template>
	<view class="content_box">
		<uni-notice-bar v-if="!mobile_security" showIcon="true" @click="authentication" single="true" text="您尚未认证绑定手机号,绑定后可享受添选特权"></uni-notice-bar>
		<!-- 收货地址 -->
		<view class="list " @click="checkAddress" v-if="addressList !='' ">
			<view class="wrapper">
				<view v-if="addressList.is_default != '0'" class="default ico">默</view>
				<view v-else class="unDefault  ico">{{addressList.title_name}}</view>
				<view class="data-box">
					<view class="u-box">
						<text class="name">{{addressList.name}}</text>
						<text class="mobile">{{addressList.tel}}</text>
					</view>
					<view class="address-box">
						<text v-if="addressList.is_default != '0'" class="tag">默认</text>
						<text class="addAble" v-if="addressList.tag != ''">{{addressList.tag}}</text>
						<text class="address">{{addressList.province_name}} {{addressList.city_name}} {{addressList.county_name}}{{addressList.address}}</text>
					</view>
				</view>
			</view>
			<view class="img_box">
				<image class="icon_right" src="../../static/images/icon-gengduo.png"></image>
			</view>
		</view>

		<view class="list " @click="checkAddress" v-else>
			<view class="nuwrapper">请选择收货地址</view>
			<view class="img_box">
				<image class="icon_right" src="../../static/images/icon-gengduo.png"></image>
			</view>
		</view>
		<!-- 商品 -->
		<view class="order_list">
			<view class="order" v-for="(item,index) in orderData" :key="index">
				<view class="title">
					<text class="pinlei">{{item.pinlei}}</text>
				</view>
				<view class="content">
					<image class="img" :src="item.images"></image>
					<view class="category">
						<view class="name">{{item.title}}</view>
						<text class="guige" v-if="item.specificationsTxt != ''"> {{item.specificationsTxt}}</text>
					</view>
					<view class="number">
						<view class="danjia"><text class="symbol">￥</text>{{item.price}}</view>
						<view class="shuliang">x{{item.stock}}</view>
					</view>
				</view>
				<view class="statistics">总价<text class="symbol">￥</text><text class="nur">{{item.total_price}}</text><text class="symbol"
					 v-if="user_type !=0 && user_type != undefined"><text class="symbolTxtx">，优惠</text>￥<text class="nur">{{item.profit}}</text></text>，实付款<text
					 class="symbol">￥</text><text class="nur">{{item.total_price - item.profit}}</text></view>
			</view>
			<view class="input_box">
				<text>配送方式</text>
				<input type="text" placeholder="普通配送" disabled="true" />
			</view>
			<view class="input_box">
				<text>订单备注</text>
				<input type="text" placeholder="选填，请先和客服协商一致" v-model="user_note" />
			</view>
			<view class="statisticsBox">
				<view class="unit">共 <view class="num" style="vertical-align: middle; font-size: 30rpx;"> {{zongji.buy_count}} </view>件 </view>小计:<view class="subtotalMoney num">￥<view style="font-size: 36rpx;">{{zongji.total_price}}</view></view>
			</view>
		</view>
		<view class="payment_list">

			<view class="payment" v-for="(item,index) in payment_list" :key="index" @click="payment(item.id)">
				<image class="type_img" src="../../static/images/wechatPayment.png" mode=""></image>
				<text>{{item.name}}</text>
				<image v-if="payment_id == item.id" class="tick" src="../../static/images/tick.png" mode=""></image>
			</view>
		</view>

		<view class="submit_bar">
			<view class="settlement_box">
				<view class="settlement_txt">合计:<view class="symbol">￥<text class="price">{{zongji.total_price}}</text><text class="save"
						 v-if="user_type !=0 && user_type != undefined">（省{{zongji.preferential_price}}）</text></view>
				</view>
				<view class="settlement_btn" @click="placeOrder">提交订单</view>
			</view>
		</view>

		<view class="model_box" v-if="show_key">
			<view class="model" @click="closModel()"></view>
			<view class="popupBox">
				<view class="popup_title">【温馨提示】</view>
				<view class="popup_txt">最近30个自然日内，</br>您与您推荐的用户订单数累计{{rice.order_count}}单（含）</view>
				<view class="popup_txt2"><text v-if="rice.still_need !=0">还差{{rice.still_need}}</text>即可成为{{rice.fans}}</view>
				<navigator open-type="redirect" class="popup_btn" url="/pages/mine/collection?name=zhaomuling">点击查看平台招募令</navigator>
				<image class="mi" src="../../static/images/mi.png" mode=""></image>
				<image class="x" @click="closModel()" src="../../static/images/x.png" mode=""></image>
			</view>
		</view>

		<view class="shopping_ok" v-show="shopping_ok">
			<image src="../../static/images/shopping_ok.png" mode=""></image>
			<view>恭喜您下单成功</view>
		</view>



	</view>
</template>
<script>
	import request from '../../common/request.js';
	import uniNoticeBar from '@/components/uni-notice-bar/uni-notice-bar.vue'
	export default {
		data() {
			return {
				receive: [], //接收上一页参数
				mobile_security: false,
				user_type: this.get_user_type().plugins_distribution_level | 0,
				orderData: [], //订单数据
				addressList: {}, //地址信息
				ids: '',
				payment_id: 1, //付款方式id
				site_model: 0, //网站模型
				payment_list: [], //支付方式列表
				user_note: "",
				zongji: [],
				show_key: false, //模态框
				rice: [],
				shopping_ok: false
			};
		},
		onShow() {
			var buy_user_address_select = uni.getStorageSync("buy_user_address_select");
			this.addressList = buy_user_address_select;
			if (this.get_user_type().mobile_security == '' || this.get_user_type().mobile_security == null || this.get_user_type()
				.mobile_security == undefined) {
				this.mobile_security = false
			} else {
				this.mobile_security = true
			}
			this.int()
		},
		onLoad(e) {
			this.receive = JSON.parse(e.data)
		},
		methods: {
			authentication() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			//选择地址
			checkAddress() {
				uni.navigateTo({
					url: "../address/addressList"
				})
			},
			// 获取数据列表
			int() {
				var data = this.receive
				data.address_id = this.addressList.id,
					data.payment_id = this.payment_id,
					data.coupon_id = 0,
					data.site_model = this.site_model
				request.post('buy/index', data).then(res => {
					var resData = res.data;
					console.log(res)
					this.zongji = resData.base
					this.addressList = resData.base.address
					this.payment_list = resData.payment_list
					var goods_list = resData.goods_list
					for (let i = 0; i < goods_list.length; i++) {
						var specList = goods_list[i].spec;
						var specificationsTxt = ''
						if (specList == null || specList == 'null') {
							specificationsTxt = ''
						} else {
							for (let j = 0; j < specList.length; j++) {
								specificationsTxt += specList[j].type + ':' + specList[j].value
							}
						}
						goods_list[i].specificationsTxt = specificationsTxt
					}
					this.orderData = goods_list
					// console.log(resData.goods_list)
				})
			},
			// 选择支付方式
			payment(id) {
				this.payment_id = id
			},
			// 提交订单
			placeOrder() {
				var data = this.receive
				data.address_id = this.addressList.id,
					data.payment_id = this.payment_id,
					data.coupon_id = 0,
					data.site_model = this.site_model
				request.post('buy/add', data).then(res => {
					console.log(res.data);
					if (res.code == 0) {
						this.rice = res.data.rice
						uni.setStorageSync("upgrade_data", res.data.rice)
						console.log(this.mobile_security)
						if (this.mobile_security == false) {

							this.shopping_ok = true;
							setTimeout(() => {
								uni.switchTab({
									url: './shopping'
								});
							}, 2000);



						} else {
							this.shopping_ok = true
							setTimeout(() => {
								this.show_key = true
							}, 2000);
							
							

						}


					}
				})
			},
			// 关闭模态框
			closModel() {
				uni.switchTab({
					url: './shopping'
				});
			}
		}
	}
</script>

<style lang="less" scoped>
	.content_box {
		border-top: 1rpx #F7F3F1 solid;
		padding-bottom: 170rpx;
	}

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
				display: flex;
				align-items: center;
				justify-content: center;
				width: 60rpx;
				height: 56rpx;
				border-radius: 50%;
				padding-top: 4rpx;
				font-size: 36rpx;
				line-height: 36rpx;
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
				margin-right: 10rpx;
				background: #FEEAE5;
				text-align: center;
				// vertical-align: middle;
				color: #FE7956;
				padding: 4rpx 10rpx;
				padding-top: 8rpx;
				
			}

			.addAble {
				height: 34rpx;
				border-radius: 6rpx;
				font-size: 24rpx;
				line-height: 34rpx;
				margin-right: 10rpx;
				padding: 4rpx 10rpx;
				padding-top: 8rpx;
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

	.order_list {
		background-color: #fff;
		padding: 38rpx 32rpx 44rpx 32rpx;
		margin-bottom: 12rpx;

		.order {
			margin-bottom: 26px;
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
						font-size: 20rpx;
						line-height: 28rpx;
						padding: 2rpx 12rpx;
						color: #999999;
						background: rgba(247, 243, 241, 1);
						border-radius: 6rpx;
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
				margin-top: -10rpx;
				text-align: right;
				font-size: 28rpx;
				margin-bottom: 34rpx;

				.symbolTxtx {
					text-align: right;
					font-size: 28rpx;
				}

				.symbol {
					font-family: Akrobat-Regular;
					font-size: 22rpx;
				}

				.nur {
					font-family: Akrobat-Regular;
					font-size: 32rpx;
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
					font-size: 32rpx;
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
			font-size: 26rpx;
			line-height: 32rpx;
			
			.unit {
				margin-top: -6rpx;
				font-size: 26rpx;
				line-height: 32rpx;
				color: #AEAEA0;
				margin-right: 10rpx;
				.num{
					display: inline-block;
					padding-top: 6rpx;
				}
				text {
					font-size: 32rpx;
					line-height: 34rpx;
				}
			}

			.subtotalMoney {
				color: #FE7956;
				font-size: 28rpx;
				line-height: 30rpx;
				margin-left: 10rpx;
				display: flex;
				text {
					font-size: 32rpx;
					line-height: 40rpx;
				}
			}
		}

	}

	.submit_bar {
		background-color: #FFFFFF;
		width: 100%;
		padding: 26rpx 0;
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
				margin-top: 8rpx;
				.symbol {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
					line-height: 34rpx;
					margin-top: -8rpx;
					.price {
						font-size: 40rpx;
						line-height: 48rpx;
					}

					.save {
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
				padding-top: 4rpx;
				border-radius: 6rpx;
				color: #FE7956;
				border: 0.3px solid #FE7956;
				font-size: 32rpx;
			}
		}
	}

	.payment_list {
		.payment {
			display: flex;
			justify-content: space-between;
			align-items: center;
			background-color: #FFFFFF;
			padding: 48rpx 40rpx;
			margin-bottom: 10rpx;

			.type_img {
				width: 44rpx;
				height: 46rpx;
				margin-right: 24rpx;
			}

			text {
				flex: 1;
			}

			.tick {
				display: block;
				width: 32rpx;
				height: 32rpx;
			}
		}
	}

	.model {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background-color: rgba(0, 0, 0, 0.4);

	}

	.popupBox {
		text-align: center;
		width: 600rpx;
		background: rgba(255, 255, 255, 1);
		border-radius: 12rpx;
		position: absolute;
		top: 40%;
		left: 50%;
		padding-top: 50rpx;
		margin-top: -205rpx;
		margin-left: -300rpx;
		z-index: 1000;
		color: #FE7956;

		.popup_title {
			font-size: 36rpx;
			line-height: 56rpx;
			letter-spacing: 2rpx;
			margin-bottom: 20rpx;
		}

		.popup_txt {
			font-size: 24rpx;
			line-height: 53rpx;
			letter-spacing: 2rpx;
			margin-bottom: 12rpx;
		}

		.popup_txt2 {
			font-size: 24rpx;
			line-height: 53rpx;
			letter-spacing: 2rpx;
			margin-bottom: 24rpx;
		}

		.popup_btn {
			width: 100%;
			height: 92rpx;
			background: rgba(254, 234, 229, 1);
			border-radius: 0px 0px 12rpx 12rpx;
			font-size: 32rpx;
			line-height: 92rpx;
		}

		.mi {
			width: 96rpx;
			height: 150rpx;
			position: absolute;
			top: -76rpx;
			right: 40rpx;
		}

		.x {
			width: 78rpx;
			height: 78rpx;
			position: absolute;
			bottom: -136rpx;
			right: 50%;
			margin-right: -39rpx;
		}
	}

	.shopping_ok {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #FFFFFF;

		image {
			width: 287rpx;
			height: 223rpx;
			display: block;
			margin: 0 auto;
			margin-top: 200rpx;
			margin-bottom: 90rpx;
		}

		view {
			text-align: center;
			font-size: 32rpx;
			line-height: 44rpx;
			color: #FE7956;
		}
	}
</style>
