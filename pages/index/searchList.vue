<template>
	<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="page">
			<!-- 商品列表 -->
			<view class="recommend_box">
				<view class="recommend" v-for="(recommend,index) in recommendList" :key="index" @tap="navToDetailPage(recommend.id)">
					<image class="recommend_img" :src="recommend.images"></image>
					<view class="recommend_txt">
						<text class="title">{{recommend.title}}</text>
						<text class="price"><text class="symbol">￥</text>{{recommend.min_price}}<text class="earn">/赚<text>3.6</text></text></text>
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
				category_id: "",
				page: 1,
				keywords:""
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			console.log(option.keywords); //打印出上个页面传递的参数。
			this.keywords = JSON.parse(option.keywords)
		},
		methods: {
			// 上拉加载和下拉刷新
			upCallback(page) {
				var data = {
					keywords:this.keywords,
					category_id: 0,
					page: page.num
				};
				request.post('search/index', data).then(res => {
					console.log(res.data)
					var curPageData = res.data.data
					this.mescroll.endByPage(curPageData.length, res.data.page_total);
					if (page.num == 1) this.recommendList = [];
					this.recommendList = this.recommendList.concat(curPageData);
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
			share() {
				console.log("分享")
			}
		}
	}
</script>

<style lang="less">
	.page {
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
						.symbol {
							font-size: 24rpx;
							line-height: 34rpx;
						}
						.earn {
							font-family: SourceHanSansCN-Regular;
							margin-left: 6rpx;
							font-size: 24rpx;
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
					image {
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
