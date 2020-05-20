<template>
	<view class="page">
		<!-- 个人信息 -->
		<view class="title">
			<view class="user_box">
				<image class="user_picture" src="../../static/images/touxiang.jpg" mode=""></image>
				<text>用户名</text>
				<image class="setup" src="../../static/images/icon-shezhi.png" @tap="navSetup"></image>
			</view>
			<view class="collection_list">
				<view class="collection">
					<text class="collection_number">269</text>
					<text class="collection_name">收藏夹</text>
				</view>
				<view class="collection">
					<text class="collection_number">269</text>
					<text class="collection_name">足迹</text>
				</view>
				<view class="collection">
					<text class="collection_number">269</text>
					<text class="collection_name">我的分享</text>
				</view>
			</view>
			<view class="news" v-if="user_type == 1">
				<image src="../../static/images/icon-tongzhi.png" mode=""></image>
				<text>邀请好友共同下满5单即可升级为小米(近30个自然日内)</text>
			</view>
			<view class="news" v-if="user_type == 2">
				<image src="../../static/images/icon-tongzhi.png" mode=""></image>
				<text>您还仅剩60单即可升级为大米(近30个自然日内)</text>
			</view>
		</view>
		<!-- 余额列表 -->
		<view class="balance_list"  v-if="user_type !== 1">
			<view class="balance">
				<view class="balance_number"><text class="symbol">￥</text>269</view>
				<text class="balance_name">余额</text>
			</view>
			<view class="balance">
				<view class="balance_number"><text class="symbol">￥</text>269</view>
				<text class="balance_name">添米宝</text>
			</view>
			<view class="balance">
				<view class="balance_number"><text class="symbol">￥</text>269</view>
				<text class="balance_name">贡献值</text>
			</view>
		</view>
		<!-- 邀请好友 -->
		<view class="invitation">
			<view class="text">
				<view>邀请好友注册</view>
				<text>认购可省钱 分享可赚钱</text>
			</view>
			<view class="btn">立即邀请</view>
		</view>
		<!-- 订单中心 -->
		<view class="order_center">
			<!-- 普通用户 -->
			<view class="ordinary"  v-if="user_type == 1">
				<view class="order_title">
					<text class="name">我的订单</text>
					<view class="operation"  @click="navOrder">
						<text>全部订单</text>
						<image src="../../static/images/icon-gengduo.png" mode=""></image>
					</view>
				</view>
				<view class="ordinary_list">
					<view class="operation_btn">
						<image src="../../static/images/icon-daifukuan.png"></image>
						<view class="operation_txt">
							<view>待付款</view>
							<text>Obligation</text>
						</view>
					</view>
					<view class="operation_btn">
						<image src="../../static/images/icon-daifahuo.png"></image>
						<view class="operation_txt">
							<view>待发货</view>
							<text>Wait deliver</text>
						</view>
					</view>
					<view class="operation_btn">
						<image src="../../static/images/icon-daishouhuo.png"></image>
						<view class="operation_txt">
							<view>待收货</view>
							<text>Wait  receive</text>
						</view>
					</view>
					<view class="operation_btn">
						<image src="../../static/images/icon-shouhou.png"></image>
						<view class="operation_txt">
							<view>售后中心</view>
							<text>After sales</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 合伙人 -->
			<view class="partner"  v-if="user_type == 2">
				<view class="order_title">
					<text class="name">订单中心</text>
					<view class="operation">
						<image src="../../static/images/icon-gengduo.png" mode=""></image>
					</view>
				</view>
				<view class="ordinary_list">
					<view class="operation_btn">
						<image src="../../static/images/icon-wodedingdan.png"></image>
						<view class="operation_txt">
							<view>我的订单</view>
							<text>My order</text>
						</view>
					</view>
					<view class="operation_btn">
						<image src="../../static/images/icon-wodetuijian.png"></image>
						<view class="operation_txt">
							<view>我的推荐</view>
							<text>My recommend</text>
						</view>
					</view>
				</view>
			</view>
			<!-- 高级合伙人 -->
			<view class="seniorPartner" v-if="user_type == 3">
				<view class="order_title">
					<text class="name">订单中心</text>
					<view class="operation">
						<image src="../../static/images/icon-gengduo.png" mode=""></image>
					</view>
				</view>
				<view class="seniorPartner_list">
					<view class="operation_btn">
						<image src="../../static/images/icon-wodedingdan.png"></image>
						<view class="operation_txt">
							<view>我的订单</view>
							<text>My order</text>
						</view>
					</view>
					<view class="operation_btn">
						<image src="../../static/images/icon-wodetuijian.png"></image>
						<view class="operation_txt">
							<view>我的推荐</view>
							<text>Myrecommend</text>
						</view>
					</view>
					<view class="operation_btn">
						<image src="../../static/images/icon-tianmi.png"></image>
						<view class="operation_txt">
							<view>我的添米</view>
							<text>Mytianmi</text>
						</view>
					</view>
				</view>
			</view>
			<view class="partner"  v-if="user_type == 3">
				<view class="order_title">
					<text class="name">添米中心</text>
					<view class="operation">
						<image src="../../static/images/icon-gengduo.png" mode=""></image>
					</view>
				</view>
				<view class="ordinary_list">
					<view class="operation_btn">
						<image src="../../static/images/icon-xiaomi.png"></image>
						<view class="operation_txt">
							<view>我的添小米</view>
							<text>Parter</text>
						</view>
					</view>
					<view class="operation_btn">
						<image src="../../static/images/icon-dami.png"></image>
						<view class="operation_txt">
							<view>我的添大米</view>
							<text>Senior parter</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="service"  v-if="user_type !== 1">
			<text class="name">售后中心</text>
				<image src="../../static/images/icon-gengduo.png" mode=""></image>
		</view>
		<!-- 热卖推荐 -->
		<view class="recommend_box">
			<view v-for="(recommend,index) in recommendList" :key="index">
				<view class="recommend" v-for="(recommendItem,index) in recommend.goods" :key="index" @tap="navToDetailPage(recommendItem.id)">
					<image class="recommend_img" :src="recommendItem.images"></image>
					<view class="recommend_txt">
						<text class="title">{{recommendItem.title}}</text>
						<text class="price"><text class="symbol">￥</text>{{recommendItem.min_price}}<text class="earn">/赚<text>3.6</text></text></text>
						<image src="../../static/images/index/icon-fenxiang.png" @tap.stop="share"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
	export default {
		data() {
			return {
				recommendList:[],//推荐商品
				user_type:1
			}
		},
		created() {
			this.res();
		},
		methods: {
			//跳转设置列表
			navSetup() {
				uni.navigateTo({
					url: '/pages/mine/mineSetup'
				})
			},
			//跳转设置列表
			navOrder() {
				uni.navigateTo({
					url: '/pages/mine/orderList'
				})
			},
			// 获取推荐商品数据
			res() {
				var data = {};
				request.post('index/index', data).then(res => {
					this.recommendList = res.data.data_list
				})
			},
			//跳转详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: '/pages/productDetails/productDetails?goods_id='+id
				})
			},
		}
	}
</script>

<style lang="less">
	.page{
		font-family: SourceHanSansCN-Regular;
		.title{
			padding: 24rpx 32rpx 22rpx 50rpx;
			background-color: #FFFFFF;
			margin-bottom: 24rpx;
			.user_box{
				display: flex;
				align-items: center;
				justify-content: space-between;
				.user_picture{
					width: 90rpx;
					height: 90rpx;
					border-radius: 50%;
					margin-right: 24rpx;
				}
				text{
					flex: 1;
					font-size: 32rpx;
					line-height: 44rpx;
					font-weight: 500;
					color: #333;
				}
				.setup{
					width: 48rpx;
					height: 48rpx;
				}
			}
			.collection_list{
				display: flex;
				margin:0 20rpx 22rpx 0;
				border-bottom: 1rpx #E7E7E7 solid;
				.collection{
					height: 180rpx;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					.collection_number{
						font-family: Akrobat-Regular;
						font-size: 32rpx;
						line-height: 38rpx;
						color: #333333;
					}
					.collection_name{
						font-size: 22rpx;
						line-height: 32rpx;
						color: #969696;
					}
				}
			}
			.news{
				display: flex;
				align-items: center;
				image{
					width: 32rpx;
					height: 32rpx;
					margin-right: 12rpx;
				}
				text{
					font-size: 22rpx;
					line-height: 32rpx;
					color: #FF9377;
				}
			}
		}
		// 余额
		.balance_list{
			display: flex;
			padding: 0rpx 52rpx 0rpx 50rpx;
			background-color: #FFFFFF;
			margin-bottom: 24rpx;
			text-align: center;
			.balance{
				height: 180rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.balance_number{
					font-family: Akrobat-Regular;
					font-size: 50rpx;
					line-height: 60rpx;
					color: #FE7956;
					.symbol{
						font-size: 36rpx;
						line-height: 44rpx;
					}
				}
				.balance_name{
					font-size: 28rpx;
					line-height: 40rpx;
					color: #555555;
				}
			}
		}
		.invitation{
			padding: 0 56rpx 0 46rpx;
			height: 140rpx;
			background:linear-gradient(135deg,rgba(255,209,202,1) 0%,rgba(255,232,194,1) 100%);
			opacity:0.7;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 24rpx;
			color: #FE7956;
			.text{
				view{
					font-size: 50rpx;
					line-height: 60rpx;
				}
				text{
					font-size: 24rpx;
					line-height: 30rpx;
				}
			}
			.btn{
				width:190rpx;
				height:66rpx;
				border-radius:12rpx;
				border:1rpx solid rgba(254,121,86,1);
				font-size: 28rpx;
				line-height: 66rpx;
				text-align: center;
			}
		}
		// 订单中心公共
		.order_center{
			margin-bottom: 24rpx;
			.order_title{
				display: flex;
				justify-content: space-between;
				align-items: center;
				// width: 100%;
				padding-left: 52rpx;
				.name{
					font-size: 28rpx;
					line-height: 40rpx;
				}
				.operation{
					display: flex;
					align-items: center;
					text{
						font-size: 26rpx;
						line-height: 36rpx;
						color: #969696;
					}
					image{
						width: 28rpx;
						height: 28rpx;
						margin-left: 8rpx;
					}
				}
			}
		}
		.order_center>view{
			padding: 30rpx 42rpx 28rpx 0rpx;
			background-color: #FFFFFF;
		}
		// 普通用户
		.ordinary_list{
			display: flex;
			flex-wrap: wrap;
		}
		.ordinary_list>view{
			width: 50%;
		}
		.seniorPartner{
			margin-bottom: 24rpx;
		}
		.seniorPartner_list{
			display: flex;
		}
		.seniorPartner_list>view{
			flex: 1;
		}
		.operation_btn{
			padding: 31rpx 0;
			display: flex;
			justify-content: center;
			align-items: center;
			color: #555555;
			text-align: center;
			image{
				width: 56rpx;
				height: 56rpx;
				margin-right: 18rpx;
			}
			.operation_txt{
				view{
					font-size: 22rpx;
					line-height: 32rpx;
				}
				text{
					font-size: 20rpx;
					line-height: 28rpx;
					position: relative;
					&::after{
						position: absolute;
						top: -9rpx;
						left: 50%;
						margin-left: -46rpx;
						content: "";
						width: 92rpx;
						height: 1rpx;
						background-color: #555555;
					}
				}
			}
		}
		.service{
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 18rpx 28rpx 18rpx 52rpx;
			background-color: #FFFFFF;
			margin-bottom: 24rpx;
			.name{
				font-size: 28rpx;
				line-height: 40rpx;
			}
				image{
					width: 28rpx;
					height: 28rpx;
					margin-left: 8rpx;
				}
		}
		// 热卖推荐
		.recommend_box{
			.recommend{
				height: 248rpx;
				background-color: #FFFFFF;
				margin-bottom: 12rpx;
				padding: 15rpx 53rpx 15rpx 50rpx;
				display: flex;
				.recommend_img{
					width: 248rpx;
					height: 248rpx;
					margin-right: 33rpx;
				}
				.recommend_txt{
					padding: 15rpx 0;
					flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					position: relative;
					.title{
						font-size:28rpx;
						font-weight:400;
						color:rgba(0,0,0,1);
						line-height:40rpx;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
					}
					.price {
						font-family: Akrobat-Regular;
						font-size: 40rpx;
						line-height: 48rpx;
						color: rgba(0, 0, 0, 1);
						.symbol {
							font-size: 24rpx;
							line-height: 34rpx;
						}
						.earn {
							font-family: SourceHanSansCN-Regular;
							font-size: 24rpx;
							font-weight: 400;
							color: rgba(255, 129, 96, 1);
							line-height: 36rpx;
							margin-left: 6rpx;
							text {
								margin-left: 4rpx;
								font-family: Akrobat-Regular;
								font-size: 40rpx;
								line-height: 48rpx;
							}
						}
					}
					image{
						width: 48rpx;
						height: 48rpx;
						position: absolute;
						bottom: 10rpx;
						right: 0;
					}
				}
			}
		}
	}
</style>
