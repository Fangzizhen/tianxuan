<template>
	<view class="page">
		<!-- 轮播图 -->
		<swiper class="swiper" circular :autoplay="true" :indicator-dots="true" :indicator-color="'rgba(243,243,243,1)'"
		 :indicator-active-color="'rgba(216,216,216,1)'">
			<swiper-item v-for="(item, index) in banner_list" :key="index" class="carousel-item">
				<image :src="item.images" />
			</swiper-item>
		</swiper>
		<!-- 商品介绍 -->
		<view class="detail_introduce">
			<view class="price_box">
				<text class="price"><text class="symbol">￥</text>{{goods.price}}<text class="earn">/赚<text>3.6</text></text></text>
				<text class="price_contrast"><text class="symbol">￥</text>{{goods.original_price}}</text>
			</view>
			<view class="price_title">
				<text class="name">{{goods.title}}</text>
				<view class="reason">
					<text class="reason_title">推荐理由</text>
					<view class="reason_content">
						<view><text class="reason_index">1</text>(有字段simple_desc，无数据)</view>
						<view><text class="reason_index">1</text>呵护胎儿健康 叶酸搭配复合营养素</view>
						<view><text class="reason_index">1</text>呵护胎儿健康 叶酸搭配复合营养素</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 规格 -->
		<view class="specifications_box">
			<view class="specifications" @click="toggleSpec">
				<text class="title">规格</text>
				<view class="con">
					1瓶装50粒
				</view>
				<uni-icons type="arrowright" size="13" color="#B3B3B3"></uni-icons>
			</view>

			<navigator class="specifications" url="/pages/address/addressList" open-type="navigate">
				<text class="title">送至</text>
				<view class="con">北京市 朝阳区</view>
				<uni-icons type="arrowright" size="13" color="#B3B3B3"></uni-icons>
			</navigator>
			<view class="specifications">
				<text class="title">运费</text>
				<view class="con">满59元包邮<text class="title" style="margin-left: 6px;">(部分商品单间包邮)</text></view>
			</view>
		</view>
		<image class="ensure" src="../../static/images/detail/ensure.png" mode=""></image>
		<!-- 详情图片 -->
		<view class="detail_img">
			<view class="title">详情</view>
			<view v-html="goods.content_web"></view>
		</view>
		<!-- 底部商品导航 -->
		<view class="goodsNav">
			<view class="navto_box">
				<navigator class="navto" url="/pages/service/service" open-type="navigate">
					<image src="../../static/images/detail/service.png" mode=""></image>
				</navigator>
				<navigator class="navto" url="/pages/shopping/shopping" open-type="switchTab">
					<image src="../../static/images/detail/spi_cart.png" mode=""></image>
				</navigator>
				<image class="navto" src="../../static/images/detail/collection.png" mode=""></image>
			</view>
			<view class="btn_box" v-if="user_type == 0">
				<view class="join" @click="toggleSpec">加入购物车</view>
				<view class="purchase">立即购买</view>
			</view>
			<view class="btn_box_vip" v-else>
				<view class="purchase_box">
					<text class="earn">省<text>7</text></text>
					<text>立即购买</text>
				</view>
				<view class="share_box">
					<text class="earn">省<text>7</text></text>
					<cover-view class="txt"><text>分享</text>
						<image src="../../static/images/detail/share.png" mode=""></image>
					</cover-view>
				</view>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<scroll-view scroll-y="true" class="layer attr-content" scroll-with-animation="true" @click.stop="stopPrevent">
				<view class="attr-box">
					<view class="a-t">
						<image :src="goods.images"></image>
						<view class="right">
							<view></view>
							<text class="price"><text class="symbol">￥</text>{{goods.price}}</text>
							<text class="tips">请选择规格</text>
						</view>
					</view>
					<view v-for="(item,index) in specifications" :key="index" class="attr-list">
						<text class="attr_name">{{item.name}}</text>
						<view class="item-list">
							<text v-for="(childItem, childIndex) in item.value" :key="childIndex" class="tit" @click="selectSpec(item.name,childItem.name, childItem.inventory)"
							 :class=" inventory === childItem.inventory? 'selected':' '">
								{{childItem.name}}
							</text>
						</view>
					</view>
					<view class="number_box">
						<text class="attr_name">数量</text>
						<uni-number-box></uni-number-box>
					</view>
					<view class="btn_box" v-if="user_type == 0">
						<view class="join">加入购物车</view>
						<view class="purchase">立即购买</view>
					</view>
					<view class="btn_determine" @click="toggleSpec" v-else>确定</view>
				</view>
			</scroll-view>
		</view>



	</view>
</template>

<script>
	import request from '../../common/request.js';
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox
		},
		data() {
			return {
				goods: [], //全部数据
				banner_list: [], //banner列表
				user_type: 0,
				specClass: 'none',
				specifications: [], //产品规格信息
				popup_type: 1, //弹窗Type
				inventory: ""
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			this.getDetail(option)
		},
		methods: {
			//获取数据
			getDetail(data) {
				var data = data;
				request.post('goods/detail', data).then(res => {
					console.log(res.data);
					this.goods = res.data.goods;
					this.banner_list = res.data.goods.photo;
					this.specifications = res.data.goods.specifications.choose;
					console.log(this.specifications)
				})
			},
			//规格弹窗开关
			toggleSpec() {
				if (this.specClass === 'show') {
					this.specClass = 'hide';
					setTimeout(() => {
						this.specClass = 'none';
					}, 250);
				} else if (this.specClass === 'none') {
					this.specClass = 'show';
				}
			},
			stopPrevent() {},
			selectSpec(type, name, inventory) {
				this.inventory = inventory; 
				var specType = [{
						type: type,
						value: name,
					}, ]
				var data = {
					id: this.goods.id,
					spec: JSON.stringify(specType)
				}
				request.post('goods/spectype', data).then(res => {
					console.log(res.data);
				})
			}
		}
	}
</script>

<style lang="less">
	.page {
		.swiper {
			width: 100%;
			height: 588rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail_introduce {
			background: #fff;
			margin-bottom: 24rpx;

			.price_box {
				height: 74rpx;
				background-image: url(../../static/images/detail/price_bg.png);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				padding: 26rpx 0 10rpx 24rpx;
				position: relative;

				.price {
					font-family: Akrobat-Regular;
					font-size: 46rpx;
					line-height: 58rpx;
					color: #FE7956;

					.symbol {
						font-size: 30rpx;
						line-height: 44rpx;
					}

					.earn {
						font-family: SourceHanSansCN-Regular;
						margin-left: 16rpx;
						font-size: 26rpx;
						font-weight: 400;
						color: rgba(255, 129, 96, 1);
						line-height: 36rpx;

						text {
							margin-left: 4rpx;
							font-family: Akrobat-Regular;
							font-size: 40rpx;
							line-height: 48rpx;

						}
					}
				}

				.price_contrast {
					position: absolute;
					bottom: 6rpx;
					right: 0;
					width: 200rpx;
					height: 46rpx;
					font-size: 26rpx;
					line-height: 46rpx;
					font-family: Akrobat-Regular;
					text-align: center;
					color: #fff;

					.symbol {
						font-size: 10rpx;
						line-height: 12rpx;
					}
				}
			}

			.price_title {
				padding: 10rpx 24rpx 30rpx 24rpx;

				.name {
					font-size: 36rpx;
					color: #333333;
					line-height: 60rpx;
					margin-bottom: 10rpx;
				}

				.reason {
					.reason_title {
						font-size: 28rpx;
						color: #333333;
						line-height: 40rpx;

					}

					.reason_content {
						margin-top: 22rpx;
						padding: 14rpx 24rpx;
						background-color: #F8F4F3;
						border-radius: 3rpx;
						color: #333333;
						position: relative;

						view {
							font-size: 24rpx;
							line-height: 34rpx;

							.reason_index {
								font-size: 22rpx;
								font-family: Akrobat-Regular;
								line-height: 30rpx;
								margin-right: 8rpx;
							}
						}

						&::after {
							content: " ";
							width: 16rpx;
							height: 16rpx;
							background-color: #F8F4F3;
							position: absolute;
							top: -8rpx;
							left: 30rpx;
							transform: rotate(45deg);
						}
					}
				}

			}
		}

		.specifications_box {
			background-color: #fff;
			margin-bottom: 26rpx;

			.specifications {
				padding: 26rpx 24rpx;
				border-bottom: 2rpx #EBEBEB solid;
				display: flex;
				align-items: center;

				.title {
					margin-right: 34rpx;
					font-size: 24rpx;
					color: rgba(163, 163, 163, 1);
					line-height: 34rpx;
				}

				.con {
					flex: 1;
					font-size: 24rpx;
					color: rgba(51, 51, 51, 1);
					line-height: 34rpx;
				}
			}
		}

		.ensure {
			width: 100%;
			height: 74rpx;
			margin-bottom: 24rpx;
		}

		//图片详情
		.detail_img {
			background-color: #fff;

			.title {
				height: 110rpx;
				text-align: center;
				font-size: 32rpx;
				line-height: 110rpx;
				color: #FE7956;
			}
		}

		// 底部导航
		.goodsNav {
			width: 100%;
			position: fixed;
			bottom: 0;
			left: 0;
			padding: 24rpx 0rpx;
			background-color: #fff;
			display: flex;

			.navto_box {
				flex: 1;
				margin-right: 22rpx;
				margin-left: 16rpx;
				display: flex;
				justify-content: space-between;

				.navto {
					width: 72rpx;
					height: 72rpx;

					image {
						width: 100%;
						height: 100%;
					}
				}
			}

			.btn_box {
				border-radius: 4rpx;
				overflow: hidden;
				display: flex;
				margin-right: 24rpx;

				view {
					width: 212rpx;
					height: 82rpx;
					text-align: center;
					color: #FE7956;
				}

				.join {
					background: #FEEAE5;
					font-size: 28rpx;
					line-height: 82rpx;
				}

				.purchase {
					font-size: 28rpx;
					line-height: 82rpx;
					height: 80rpx;
					border-top: 1rpx solid #FEEAE5;
					border-right: 1rpx solid #FEEAE5;
					border-bottom: 1rpx solid #FEEAE5;
				}

			}

			.btn_box_vip {
				border-radius: 4rpx;
				overflow: hidden;
				display: flex;
				margin-right: 24rpx;

				view {
					width: 212rpx;
					height: 82rpx;
					text-align: center;
					color: #FE7956;
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.earn {
						font-family: SourceHanSansCN-Regular;
						margin-left: 16rpx;
						font-size: 22rpx;
						font-weight: 400;
						color: rgba(255, 129, 96, 1);
						line-height: 36rpx;

						text {
							margin-left: 4rpx;
							font-family: Akrobat-Regular;
							font-size: 26rpx;
							line-height: 36rpx;
						}
					}
				}

				.purchase_box {
					background: #FEEAE5;
				}

				.share_box {
					height: 80rpx;
					border-top: 1rpx solid #FEEAE5;
					border-right: 1rpx solid #FEEAE5;
					border-bottom: 1rpx solid #FEEAE5;

					.txt {
						display: flex;

						text {
							display: block;
						}

						image {
							margin-left: 4rpx;
							width: 30rpx;
							height: 30rpx;
						}
					}

				}
			}
		}

		/*  弹出层 */
		.popup {
			position: fixed;
			left: 0;
			top: 0;
			right: 0;
			bottom: 0;
			z-index: 99;

			&.show {
				display: block;

				.mask {
					animation: showPopup 0.2s linear both;
				}

				.layer {
					animation: showLayer 0.2s linear both;
				}
			}

			&.hide {
				.mask {
					animation: hidePopup 0.2s linear both;
				}

				.layer {
					animation: hideLayer 0.2s linear both;
				}
			}

			&.none {
				display: none;
			}

			.mask {
				position: fixed;
				top: 0;
				width: 100%;
				height: 100%;
				z-index: 1;
				background-color: rgba(0, 0, 0, 0.4);
			}

			.layer {
				position: fixed;
				z-index: 99;
				bottom: 0;
				max-height: 750rpx;
				border-radius: 10rpx 10rpx 0 0;
				background-color: #fff;

				.btn {
					height: 66rpx;
					line-height: 66rpx;
					border-radius: 100rpx;
					color: #fff;
					margin: 30rpx auto 20rpx;
				}
			}

			@keyframes showPopup {
				0% {
					opacity: 0;
				}

				100% {
					opacity: 1;
				}
			}

			@keyframes hidePopup {
				0% {
					opacity: 1;
				}

				100% {
					opacity: 0;
				}
			}

			@keyframes showLayer {
				0% {
					transform: translateY(120%);
				}

				100% {
					transform: translateY(0%);
				}
			}

			@keyframes hideLayer {
				0% {
					transform: translateY(0);
				}

				100% {
					transform: translateY(120%);
				}
			}
		}

		/* 规格选择弹窗 */
		.attr-content {
			.attr-box {
				padding: 10rpx 30rpx;

				.a-t {
					display: flex;
					align-items: center;

					image {
						width: 232rpx;
						height: 232rpx;
						flex-shrink: 0;
						border-radius: 8rpx;
						;
					}

					.right {
						height: 232rpx;
						display: flex;
						flex-direction: column;
						padding-left: 24rpx;
						line-height: 42rpx;
						justify-content: space-between;

						.price {
							font-family: Akrobat-Regular;
							color: #FF8900;
							font-size: 52rpx;
							line-height: 64rpx;

							.symbol {
								font-size: 38rpx;
								line-height: 48rpx;
							}

							margin-bottom: 10rpx;
						}

						.tips {
							font-size: 24rpx;
							line-height: 36rpx;
							color: #666;
						}

						.selected-text {
							margin-right: 10rpx;
						}
					}
				}

				.attr-list {
					display: flex;
					flex-direction: column;
					padding-top: 30rpx;
					padding-left: 10rpx;

					.attr_name {
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.number_box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding-top: 30rpx;
					padding-left: 10rpx;
					margin-bottom: 90rpx;

					.attr_name {
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.btn_box {
					width: 100%;
					height: 82rpx;
					display: flex;
					text-align: center;

					view {
						flex: 1;
						color: #FE7956;
					}

					.join {
						background: #FEEAE5;
						font-size: 28rpx;
						line-height: 82rpx;
					}

					.purchase {
						font-size: 28rpx;
						line-height: 82rpx;
						height: 80rpx;
						border-top: 1rpx solid #FEEAE5;
						border-right: 1rpx solid #FEEAE5;
						border-bottom: 1rpx solid #FEEAE5;
					}
				}

				.btn_determine {
					width: 100%;
					height: 82rpx;
					background: rgba(254, 234, 229, 1);
					border-radius: 12rpx;
					border: 1rpx solid rgba(254, 234, 229, 1);
					font-size: 32rpx;
					text-align: center;
					color: rgba(254, 121, 86, 1);
					line-height: 82rpx;
				}

				.item-list {
					padding: 20rpx 0 0;
					display: flex;
					flex-wrap: wrap;

					text {
						display: flex;
						align-items: center;
						justify-content: center;
						background: #F7F4F3;
						margin-right: 20rpx;
						margin-bottom: 20rpx;
						border-radius: 100rpx;
						min-width: 60rpx;
						height: 50rpx;
						padding: 0 20rpx;
						font-size: 28rpx;
						line-height: 40rpx;
						// color: $font-color-dark;
					}

					.selected {
						background: #FFE9E3;
						color: #FE7956;
					}
				}
			}
		}

	}
</style>
