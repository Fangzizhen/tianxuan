<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="page">
			<!-- 分类图片 -->
			<image class="title_img" :src="titleImg" mode=""></image>
			<!-- 商品分类 -->
			<view class="nav_box" v-if="classification.length != 0">
				<view v-for="(item,index) in classification" :key="index" @tap="navToDetailList(item.id,item.items)">
					<image :src="item.icon" mode=""></image>
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="recommend_box">
				<view class="recommend" v-for="(recommend,index) in recommendList" :key="index" @tap="navToDetailPage(recommend.id)">
					<image class="recommend_img" :src="recommend.home_recommended_images"></image>
					<view class="recommend_txt">
						<text class="title" style="text-indent: -10rpx;">{{recommend.title}}</text>
						<text class="price"><text class="symbol">￥</text>{{recommend.min_price}}<text class="earn" v-if="user_type != undefined && user_type != 0"><text class="earn_icon numgang">/</text>赚<text style=" margin-top: 2rpx;">{{recommend.profit}}</text></text></text>
						<image src="../../static/images/index/icon-fenxiang.png" @tap.stop="share"></image>
					</view>
				</view>
			</view>
		</view>
	</mescroll-body>
</template>

<script>
	import request from '../../common/request.js';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				titleImg: "",
				classification:[], //分类中分类
				recommendList: [], //推荐商品类表
				isGoodsEdit: false, // 是否加载编辑后的数据
				category_id: "",
				page: 1,
				userinfor:[],
				user_type:'',
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			
			this.category_id = option.goods_id
			if(option.classification != 'undefined'){
				this.classification = JSON.parse(option.classification)
				console.log(this.classification); //打印出上个页面传递的参数。
			}
			
			this.userinfor = this.get_user_type()
			this.user_type = this.get_user_type().plugins_distribution_level
			// var data = {
			// 	category_id: this.category_id,
			// 	page: 1
			// }
		},
		methods: {
			// 上拉加载和下拉刷新
			upCallback(page) {
				// console.log(page)
				var data = {
					category_id: this.category_id,
					page: page.num
				};
				request.post('search/index', data).then(res => {
					console.log(res)
					var category = res.data.category
					uni.setNavigationBarTitle({
						title: category.name
					});
					this.titleImg = category.big_images
					var curPageData = res.data.data
					this.mescroll.endByPage(curPageData.length, res.data.page_total);
					if (page.num == 1) this.recommendList = [];
					this.recommendList = this.recommendList.concat(curPageData);
					console.log(this.recommendList)
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},

			//跳转详情页
			navToDetailPage(id) {
				uni.navigateTo({
					url: '/pages/productDetails/productDetails?goods_id=' + id
				})
			},
			//跳转分类页
			navToDetailList(id,item) {
				uni.redirectTo({
					url: '/pages/productList/ErProductList?goods_id=' + id +'&classification=' + encodeURIComponent(JSON.stringify(item))
				})
			},
			share() {
				console.log("分享")
			}
		}
	}
</script>

<style lang="less">
	.page {
		.title_img {
			width: 100%;
			height: 350rpx;
			margin-bottom: 24rpx;
		}
		// 分类
		.nav_box{
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			align-content: space-around;
			padding: 25rpx 74rpx;
			padding-left: 78rpx;
			background: #FFFFFF;
			margin-bottom: 19rpx;
			view{
				width: 262rpx;
				height: 88rpx;
				margin: 13rpx 0;
				image{
					width: 100%;
					height: 100%;
				}
			}
			
		}

		.recommend_box {
			.recommend {
				height: 248rpx;
				background-color: #FFFFFF;
				margin-bottom: 12rpx;
				padding: 15rpx 53rpx 15rpx 50rpx;
				display: flex;

				.recommend_img {
					width: 248rpx;
					height: 248rpx;
					margin-right: 33rpx;
				}

				.recommend_txt {
					padding: 15rpx 0;
					width: 370rpx;
					// flex: 1;
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					position: relative;

					.title {
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
	}
</style>
