<template>
	<!-- 收藏、足迹、分享、招募令 -->
	<view class="black">
		<view class="recruit" v-if="titleName == 'zhaomuling'">
			<image src="../../static/images/recruit.jpg" mode="widthFix"></image>
		</view>
		<mescroll-body v-else ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="page">
				<view class="recommend_box">
					<view class="recommend" v-for="(recommend,index) in recommendList" :key="index" @tap="navToDetailPage(recommend.id)">
						<image class="recommend_img" :src="recommend.images"></image>
						<view class="recommend_txt">
							<text class="title">{{recommend.title}}</text>
							<text class="price"><text class="symbol">￥</text>{{recommend.min_price}}<text class="earn" v-if="user_type != undefined && user_type != 0"><text class="earn_icon numgang">/</text>赚<text>{{recommend.profit}}</text></text></text>
							<image src="../../static/images/index/icon-fenxiang.png" @tap.stop="share"></image>
						</view>
					</view>
				</view>
			</view>
		</mescroll-body>
	</view>

</template>

<script>
	import request from '../../common/request.js';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				titleName: "",
				recommendList: [],
				isGoodsEdit: false, // 是否加载编辑后的数据
				category_id: "",
				page: 1,
				user_type: '', //用户类型
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			let titleName = "";
			this.titleName = option.name
			if (option.name == "shoucang") {
				titleName = "收藏夹"
			} else if (option.name == "zuji") {
				titleName = "我的足迹"
			} else if (option.name == "fenxiang") {
				titleName = "我的分享"
			} else if (option.name == "zhaomuling") {
				titleName = "招募令"
			}
			uni.setNavigationBarTitle({
				title: titleName
			})
		this.user_type = this.get_user_type().plugins_distribution_level
		},
		methods: {
			// 上拉加载和下拉刷新
			upCallback(page) {
				console.log(page)
				if (this.titleName == "shoucang") {
					this.getShoucang(page)
				} else if (this.titleName == "zuji") {
					this.getZuji(page)
				} else if (this.titleName == "fenxiang") {
					this.getFenxiang(page)
				}
			},
			// 收藏夹
			getShoucang(page){
				console.log(page)
				var data = {
					page: page.num
				};
				request.post('usergoodsfavor', data).then(res => {
					console.log(res)
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
			// 分享
			getFenxiang(page){
				var data = {
					category_id: this.category_id,
					page: page.num
				};
				request.post('search/index', data).then(res => {
					console.log(res)
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
			// 足迹
			getZuji(page){
				var data = {
					category_id: this.category_id,
					page: page.num
				};
				request.post('usergoodsbrowse/index', data).then(res => {
					console.log(res)
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
			share() {
				console.log("分享")
			}
		}
	}
</script>

<style scoped lang="less">
	.black{
		width: 100%;
	}
	.recruit{
		width: 100%;
		height: 100%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.page {
		
		border-top: 1rpx solid #DBDBDB;
		
		.title_img {
			width: 100%;
			height: 350rpx;
		}

		.recommend_box {
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
								font-size: 24rpx;
								line-height: 36rpx;
								margin-right: 4rpx;
			
							}
			
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
						bottom: 20rpx;
						right: 0;
					}
				}
			}
		}
	}
</style>
