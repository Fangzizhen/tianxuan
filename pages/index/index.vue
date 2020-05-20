<template>
	<view class="page">
		<!-- 头部导航 -->
		<view class="header" :style="{background: bgColor}">
			<!-- <view class="header" style="background-image: linear-gradient(to right, red , white)"> -->
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="input_box">
				<image src="../../static/images/index/icon-sousuo.png" mode=""></image>
				<input class="search" type="text" value="" :placeholder="data.common_shop_notice" @confirm="search" />
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper" circular :autoplay="true" @change="swiperChange">
			<swiper-item v-for="(item, index) in banner_list" :key="index" class="carousel-item">
				<image :src="item.images_url" />
			</swiper-item>
		</swiper>
		<!-- 商品分类 -->
		<view class="nav_box">
			<view v-for="(item,index) in navigation" :key="index" >
				<image :src="item.icon" mode=""></image>
			</view>
		</view>
		<!-- 热卖推荐 -->
		<view class="recommend_box">
			<view class="recommend_title">热卖商品推荐</view>
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


		</swiper>

	</view>
</template>

<script>
	import request from '../../common/request.js'
	export default {
		data() {
			return {
				data: [], //全部数据
				banner_list: [], //banner列表
				bgColor: "", //header背景颜色
				navigation: [
					// {icon:"../../static/images/index/icon-shuguo.png"},
					// {icon:"../../static/images/index/icon-shengxian.png"},
					// {icon:"../../static/images/index/icon-nongjia.png"},
					// {icon:"../../static/images/index/icon-shipin.png"},
					// {icon:"../../static/images/index/icon-rihua.png"},
					// {icon:"../../static/images/index/icon-muying.png"},
					// {icon:"../../static/images/index/icon-meizhuang.png"},
					// {icon:"../../static/images/index/icon-baojian.png"},
				] ,//商品分类列表
				recommendList:[]//推荐商品
			}
		},

		created() {
			this.res();
			this.getClassification()
		},
		methods: {
			// 获取数据
			res() {
				// console.log(request.post)
				var data = {};
				request.post('index/index', data).then(res => {
					this.data = res.data;
					this.banner_list = res.data.banner_list;
					this.bgColor = res.data.banner_list[0].bg_color;
					// this.navigation = res.data.navigation;
					this.recommendList = res.data.data_list
					// console.log(res.data.data_list)
					console.log(this.navigation)
				})
			},
			// 获取分类数据
			getClassification() {
				var data = {};
				request.post('goods/category', data).then(res => {
					console.log(res.data)
					this.navigation = res.data
					// this.chooseGoods(res.data[0].id)
				})
			},
			// 搜索框点击确定动作
			search(e) {
				console.log(e.detail.value)
			},
			// 轮播图改变
			swiperChange(e) {
				var index = e.detail.current;
				this.bgColor = this.banner_list[index].bg_color
			},
			//跳转详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: '/pages/productDetails/productDetails?goods_id='+id
				})
			},
			share(){
				console.log("分享")
			}
		}
	}
</script>

<style lang="less">
	// 首页自定义导航栏
	.header {
		padding: 14rpx 0rpx;
		.logo {
			margin-left: 30rpx;
			margin-bottom: 30rpx;
			width: 101rpx;
			height: 51rpx;
		}
		.input_box {
			background: #FFFFFF;
			padding: 0rpx 30rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			image {
				width: 32rpx;
				height: 32rpx;
			}
			input {
				height: 60rpx;
				flex: 1;
				font-size: 28rpx;
				margin-left: 4rpx;
			}
		}
	}
	// 轮播图
	.swiper {
		width: 100%;
		height: 348rpx;
		margin-bottom: 26rpx;
		image {
			width: 100%;
			height: 100%;
		}
	}
	// 分类
	.nav_box{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-around;
		padding: 25rpx 74rpx;
		background: #FFFFFF;
		margin-bottom: 19rpx;
		view{
			width: 260rpx;
			height: 80rpx;
			margin: 13rpx 0;
			image{
				width: 100%;
				height: 100%;
			}
		}
		
	}
	// 热卖推荐
	.recommend_box{
		.recommend_title{
			font-family: SourceHanSansCN-Regular;
			padding-left: 49rpx;
			font-size:40rpx;
			font-weight:500;
			color:rgba(51,51,51,1);
			line-height:58rpx;
			position: relative;
			margin-bottom: 10rpx;
		}
		.recommend_title::after{
			content: " ";
			width:2rpx;
			height:30rpx;
			background:#fe7569;
			position: absolute;
			top: 50%;
			left: 24rpx;
			margin-top: -15rpx;
		}
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
</style>
