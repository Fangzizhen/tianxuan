<template>
	<view class="page">
		<!-- 头部导航 -->
		<!-- <view class="header" :style="{background: bgColor}"> -->
		<view class="header" :style="'background-image: linear-gradient(135deg,'+ bgColor+' 0% , '+bg_color_shade+' 100%)'">
			<image class="logo" src="../../static/images/logo.png" mode=""></image>
			<view class="input_box">
				<image src="../../static/images/index/icon-sousuo.png" mode=""></image>
				<input class="search" type="text" value="" placeholder="搜索海蓝之谜浓缩密集修护眼霜" @confirm="search" placeholder-class="cl" />
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper" circular :autoplay="true" @change="swiperChange">
			<swiper-item v-for="(item, index) in banner_list" :key="index" class="carousel-item">
				<image @click="navTo(item.name)" :src="item.images_url" />
			</swiper-item>
		</swiper>
		<!-- 商品分类 -->
		<view class="nav_box">
			<view v-for="(item,index) in navigation" :key="index" @tap="navToDetailList(item.id,item.items)">
				<image :src="item.icon" mode=""></image>
			</view>
		</view>
		<!-- 热卖推荐 -->
		<view class="recommend_box">
			<view class="recommend_title">热卖商品推荐</view>
			<view v-for="(recommend,index) in recommendList" :key="index">
				<view class="recommend" v-for="(recommendItem,index) in recommend.goods" :key="index" @tap.stop="navToDetailPage(recommendItem.id)">
					<image class="recommend_img" :src="recommendItem.home_recommended_images"></image>
					<view class="recommend_txt">
						<text class="title">{{recommendItem.title}}</text>
						<text class="price"><text class="symbol">￥</text>{{recommendItem.min_price}}<text class="earn" v-if="user_type != undefined && user_type != 0"><text class="earn_icon numgang">/</text>赚<text>{{recommendItem.profit}}</text></text></text>
						<image src="../../static/images/index/icon-fenxiang.png" @tap.stop="geterweima(recommendItem.id,recommendItem)"></image>
					</view>
				</view>
			</view>
			<view class="noMore">-- 让选择变得简单 --</view>
		</view>
		</swiper>


		<!-- 图片展示由自己实现 -->
		<view class="flex_row_c_c modalView" :class="qrShow?'show':''" @tap="hideQr()">
			<view class="flex_column">
				<!-- <view class="backgroundColor-white padding1vh border_radius_10px"> -->
				<image :src="poster.finalPath || ''" mode="widthFix" class="posterImage"></image>
				<!-- <view class="flex_row marginTop2vh">
					<button type="primary" size="mini" @tap.prevent.stop="saveImage()">保存图片</button>
					<button type="primary" size="mini" @tap.prevent.stop="share()">分享图片</button>
				</view> -->
			</view>
		</view>
		<!-- 画布 -->
		<view class="hideCanvasView">
			<canvas class="hideCanvas" canvas-id="default_PosterCanvasId" :style="{width: (poster.width||10) + 'rpx', height: (poster.height||10) + 'rpx'}"></canvas>
		</view>









	</view>
</template>

<script>
	import request from '../../common/request.js'
	import _app from '../../js_sdk/QS-SharePoster/app.js';
	import {
		getSharePoster
	} from '../../js_sdk/QS-SharePoster/QS-SharePoster.js';
	export default {
		data() {
			return {
				data: [], //全部数据
				banner_list: [], //banner列表
				bgColor: "", //header背景颜色
				bg_color_shade: "", //header背景颜色后色
				navigation: [], //商品分类列表
				recommendList: [], //推荐商品
				user_type: '', //用户类型
				profit: 0, //会员赚
				name: '方梓臻',

				poster: {},
				qrShow: false,
				canvasId: 'default_PosterCanvasId',
				tee:""
			}
		},
		onShow() {
			this.res();
			this.getClassification()
			var userinfor = uni.getStorageSync('userinfor');
			console.log(userinfor)
			this.userinfor = userinfor
			this.user_type = userinfor.plugins_distribution_level
			console.log(this.user_type)
			// var titleImg =  'https://ttianxuan.oss-cn-shanghai.aliyuncs.com/static/upload/images/goods/2020/06/05/1591324576845517.png'
			// uni.downloadFile({
			//     url: titleImg, //仅为示例，并非真实的资源
			//     success: (res) => {
			// 			console.log(res.tempFilePath)
			// 			this.tee = res.tempFilePath
			//        // console.log(that.tee)
			//     }
			// });
		},
		onLoad() {

		},
		onPullDownRefresh() {
			this.res();
		},
		methods: {
			// 获取数据
			res() {
				// console.log(request.post)
				var data = {};
				request.post('index/index', data).then(res => {
					this.data = res.data;
					this.banner_list = res.data.banner_list;
					console.log(this.banner_list)
					this.bgColor = res.data.banner_list[0].bg_color;
					this.bg_color_shade = res.data.banner_list[0].bg_color_shade
					this.recommendList = res.data.data_list
					console.log(res.data.data_list)
					uni.stopPullDownRefresh();
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
				var keywords
				if (e.detail.value == "" || e.detail.value == null || e.detail.value == undefined) {
					keywords = this.data.common_shop_notice
				} else {
					keywords = e.detail.value
				}
				uni.navigateTo({
					url: '/pages/index/searchList?keywords=' + encodeURIComponent(JSON.stringify(keywords))
				})
			},
			// 轮播图改变
			swiperChange(e) {
				var index = e.detail.current;
				this.bgColor = this.banner_list[index].bg_color
				this.bg_color_shade = this.banner_list[index].bg_color_shade
			},
			//跳转详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: '/pages/productDetails/productDetails?goods_id=' + id
				})
			},
			//跳转分类页
			navToDetailList(id, item) {
				
				uni.navigateTo({
					url: '/pages/productList/productList?goods_id=' + id + '&classification=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			// 招募令
			navTo(item) {
					if(item == '招募令'){
						uni.navigateTo({
							url: '/pages/mine/collection?name=zhaomuling'
						})
					}
				
			},
			// 点击分享
			geterweima(id, dataList) {
				// console.log(uni.createSelectorQuery().select('.recommend'))
				// var that = this
				// console.log(this.userinfor.avatar)
				// var loginRes = this.checkLogin('/pages/index/index');
				// if(!loginRes)return
				// var data = {
				// 	goods_id: id,
				// 	goods_url:"https://m.ttianxuan.com/pages/productDetails/productDetails?goods_id="+id
				// };
				// var tuijian = dataList.simple_desc.split("\n")[0].split(".")[1]
				// request.post('share/index', data).then(res => {
				// 	console.log(res.data)
				// 	var ss =  dataList.home_recommended_images.split("com/")[1]
				// 	var bb = res.data.user_share_qrode.split("com/")[1]
					
				// 	uni.downloadFile({
				// 	    url: ss, 
				// 	    success: (res) => {
				// 				ss = res.tempFilePath
				// 	    }
				// 	});
				// 	uni.downloadFile({
				// 	    url: bb, 
				// 	    success: (res) => {
				// 				bb = res.tempFilePath
					       
				// 	    }
				// 	});
				// 	var canvasData = {
				// 		titleImg:that.tee,
				// 		name: this.get_user_type().nickname,
				// 		// erweima: bb,
				// 		// img: ss,
				// 		erweima: '/api/'+bb,
				// 		img: '/api/'+ss,
				// 		tuijianTxt: tuijian,
				// 		danjia: dataList.min_price,
				// 		title: dataList.title
				// 	}
				// 	console.log(canvasData)
				// 	 this.shareFc(canvasData)
				// })
			},



			// 生成广告
			async shareFc(canvasData) {
				try {
					_app.log('准备生成:' + new Date())
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'testShareType',
						formData: {
							//访问接口获取背景图携带自定义数据

						},
						posterCanvasId: this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						background: {
							width: 535,
							height: 1020,
							backgroundColor: '#fff'
						},
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
										type: 'image',
										url: '/static/images/fendi.png',
										dx: -1,
										dy: 0,
										dWidth: 286,
										dHeight: 45,
									},
									{
										type: 'image',
										url: '/static/images/login_logo.png',
										dx: 83,
										dy: 64,
										dWidth: 30,
										dHeight: 30,
										infoCallBack(imageInfo) {
											return {
												circleSet: {
													x: 0,// 圆形图片 , 若circleSet与roundRectSet一同设置 优先circleSet设置
												}, 
											
											}
										}
									},
									{
										type: 'text',
										fontFamily: 'SourceHanSansCN-Regular',
										text: canvasData.name + '向你推荐',
										size: 13,
										color: '#333333',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: 118,
										dy: 80,
									},
									{
										type: 'text',
										fontFamily: 'SourceHanSansCN-Regular',
										text: '"'+canvasData.tuijianTxt+'"',
										size: 14,
										color: '#333333',
										textAlign: 'left',
										textBaseline: 'middle',
										dx:65,
										dy: 112,
										lineFeed: {
											// maxWidth:260,
											lineHeight: 13,
											lineNum: 2,
											dx: -1
										},
									},
									{
										type: 'image',
										url: canvasData.img,
										dx: 0,
										dy: 130,
										dWidth: 285,
										dHeight: 285,
										
									},
									{
										type: 'text',
										fontFamily: 'Akrobat-Regular',
										text: '￥',
										size: 18,
										color: '#FE7956',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: 13,
										dy: 473,
									},
									{
										type: 'text',
										fontFamily: 'Akrobat-Regular',
										text: canvasData.danjia,
										size: 28,
										color: '#FE7956',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: 30,
										dy: 470,
									},
									{
										type: 'text',
										fontFamily: 'SourceHanSansCN-Regular',
										text: canvasData.title,
										size: 12,
										color: '#333',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: 20,
										dy: 500,
										lineFeed: {
											maxWidth: 120,
											lineHeight: 17,
											lineNum: 2,
											dx: -1
										},
									},
									{
										type: 'text',
										fontFamily: 'SourceHanSansCN-Regular',
										text: '长按享低价',
										size: 10,
										color: '#AEAEAE',
										textAlign: 'left',
										textBaseline: 'middle',
										dx: 194,
										dy: 520,
									},
									
									{
										type: 'image',
										url: canvasData.erweima,
										dx: 180,
										dy: 430,
										dWidth: 80,
										dHeight: 80,
									},
								]);
							})
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => { // 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					_app.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath)
					this.poster.finalPath = d.poster.tempFilePath;
					this.qrShow = true;
				} catch (e) {
					_app.hideLoading();
					_app.showToast(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			saveImage() {
				// #ifndef H5
				uni.saveImageToPhotosAlbum({
					filePath: this.poster.finalPath,
					success(res) {
						_app.showToast('保存成功');
					}
				})
				// #endif
				// #ifdef H5
				_app.showToast('保存了');
				// #endif
			},
			share() {
				// #ifdef APP-PLUS
				_app.getShare(false, false, 2, '', '', '', this.poster.finalPath, false, false);
				// #endif

				// #ifndef APP-PLUS
				_app.showToast('分享了');
				// #endif
			},
			hideQr() {
				this.qrShow = false;
			}
		}
	}
</script>

<style scoped lang="less">
	// 首页自定义导航栏
	.header {
		padding: 20rpx 0rpx;
		padding-top: 0rpx;

		// padding-bottom: 22rpx;
		.logo {
			margin-top: 20rpx;
			margin-left: 30rpx;
			margin-bottom: 10rpx;
			width: 80rpx;
			height: 40rpx;
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
				line-height: 28rpx;
				margin-left: 4rpx;
				margin-top: -4rpx;

			}

			.cl {
				padding-top: 5rpx;
				color: #aeaeae;
				font-size: 28rpx;
				line-height: 28rpx;
				margin-top: 2rpx;
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
	.nav_box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-content: space-around;
		padding: 25rpx 74rpx;
		padding-left: 70rpx;
		background: #FFFFFF;
		margin-bottom: 19rpx;

		view {
			width: 260rpx;
			height: 80rpx;
			margin: 13rpx 0;

			image {
				width: 100%;
				height: 100%;
			}
		}

	}

	// 热卖推荐
	.recommend_box {
		.recommend_title {
			font-family: SourceHanSansCN-Regular;
			padding-left: 49rpx;
			font-size: 40rpx;
			color: rgba(51, 51, 51, 1);
			line-height: 58rpx;
			position: relative;
			margin-bottom: 10rpx;
		}

		.recommend_title::after {
			content: " ";
			width: 1.3px;
			height: 30rpx;
			background: #fe7569;
			position: absolute;
			top: 50%;
			left: 34rpx;
			margin-top: -20rpx;
		}

		.recommend {
			height: 248rpx;
			background-color: #FFFFFF;
			margin-bottom: 12rpx;
			padding: 15rpx 40rpx 15rpx 40rpx;
			display: flex;

			.recommend_img {
				width: 248rpx;
				height: 248rpx;
				margin-right: 18rpx;
			}

			.recommend_txt {
				padding: 15rpx 0;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				position: relative;

				.title {
					text-indent: -14rpx;
					font-size: 28rpx;
					color: rgba(0, 0, 0, 1);
					line-height: 40rpx;
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
					display: flex;
					align-items: flex-end;
					.symbol {
						font-size: 24rpx;
						line-height: 34rpx;
					}

					.earn {
						font-family: SourceHanSansCN-Regular;
						font-size: 24rpx;
						color: rgba(255, 129, 96, 1);
						line-height: 36rpx;
						margin-left: 6rpx;

						.earn_icon {
							font-family: Akrobat-Regular;
							font-size: 22rpx;
							line-height: 36rpx;
							margin-right: 4rpx;
							margin-top: -2px;
							text{
								
							}
						}

						text {
							margin-left: 4rpx;
							font-family: Akrobat-Regular;
							font-size: 40rpx;
							line-height: 40rpx;
						}
					}
				}

				image {
					width: 48rpx;
					height: 48rpx;
					position: absolute;
					bottom: 20rpx;
					right: 0;
				}
			}
		}
	}




	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.flex_row_c_c {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.modalView {
		width: 100%;
		height: 100%;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		opacity: 0;
		outline: 0;
		transform: scale(1.2);
		perspective: 2500upx;
		background: rgba(0, 0, 0, 0.6);
		transition: all .3s ease-in-out;
		pointer-events: none;
		backface-visibility: hidden;
		z-index: 999;
	}

	.modalView.show {
		opacity: 1;
		transform: scale(1);
		pointer-events: auto;
	}

	.flex_column {
		display: flex;
		flex-direction: column;
	}


	.posterImage {
		width: 60vw;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.flex_row {
		display: flex;
		flex-direction: row;
	}

	.marginTop2vh {
		margin-top: 2vh;
	}
</style>
