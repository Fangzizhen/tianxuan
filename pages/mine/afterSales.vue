<template>
	<view class="page">
		<tabControl :current="current" activeColor="#FF9377" :values="items" :fixed="true" :scrollFlag='true' :isEqually='true'
		 @clickItem="onClickItem"></tabControl>
		<!-- 使用 swiper 配合 滑动切换 -->
		<swiper class="swiper" style="height: 100%;" @change='scollSwiper' :current='current'>
			<swiper-item v-for="(item,index) in items" :key='index'>
				<!-- 使用 scroll-view 来滚动内容区域 -->
				<scroll-view scroll-y="true" style="height: 100%;" scroll-with-animation="true">
					<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
						<view class="order" v-for="(item,index) in ordrtAll" :key="index">
							<view class="title">
								<text class="pinlei">{{item.pinlei}}</text>
								<text v-if="current ==0" class="zhuangtai">{{item.zhuangtai}}</text>
							</view>
							<view class="content">
								<image class="img" :src="item.img"></image>
								<view class="category">
									<view class="name">{{item.name}}</view>
									<text class="guige">{{item.guige}}</text>
								</view>
								<view class="number">
									<view class="danjia"><text class="symbol">￥</text>{{item.danjia}}</view>
									<view class="shuliang">x{{item.shuliang}}</view>
								</view>
							</view>
							<view class="btn_box" v-if="current ==0">
								<view class="receipt" @click="Aftermarke(item.goods_id)">申请售后</view>
							</view>
						</view>
					</mescroll-body>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import tabControl from '../../components/tabControl-tag/tabControl-tag.vue';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	import request from '../../common/request.js'
	export default {
		mixins: [MescrollMixin],
		components: {
			tabControl
		},
		data() {
			return {
				items: ['申请售后', '处理中', '已处理'],
				current: "",
				page: 1, //分页数
				ordrtAll: [{
					goods_id: 1,
					pinlei: "时令鲜果",
					zhuangtai: "卖家已发货",
					name: "四川眉山9号橙一个长长的名字的展示形式",
					danjia: "45",
					shuliang: 2,
					guige: "#5g 1支装",
					zongjia: 90,
					youhui: "0",
					shiji: 90,
					img: "../../static/images/touxiang.jpg"
				}]
			};
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			// console.log(option)
			// this.current = option.current_data
		},
		methods: {
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e) {
				this.current = e.target.current
			},
			Aftermarke(id) {
				var that = this;
				var parameter = that.ordrtAll
				uni.navigateTo({
					url: 'afterSalseDetail?info='+encodeURIComponent(JSON.stringify(parameter))
				})
			},
			// 上拉加载和下拉刷新
			upCallback(page) {
				// console.log(page)
				// var data = {
				// 	category_id: 1,
				// 	page: page.num
				// };
				// request.post('search/index', data).then(res => {
				// 	// var curPageData = res.data.data
				// 	// this.mescroll.endByPage(curPageData.length, res.data.page_total);
				// 	if (page.num == 1) this.catrgory = [];
				// 	// this.catrgory = this.catrgory.concat(curPageData);
				// }).catch(() => {
				// 	//联网失败, 结束加载
				this.mescroll.endErr();
				// })
			},
		}
	};
</script>

<style scoped lang="less">
	page {
		height: 100%;
		padding-top: 90rpx;
	}

	.page {

		height: 100%;
	}

	.swiper {
		font-family: SourceHanSansCN-Regular;
		color: #333333;

		.order {
			background-color: #fff;
			padding: 38rpx 24rpx 44rpx 32rpx;

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
						font-size: 28rpx;
						line-height: 34rpx;
						margin-bottom: 62rpx;

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
				margin-bottom: 24rpx;

				.symbol {
					font-family: Akrobat-Regular;
					font-size: 22rpx;
				}

				.nur {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
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
		}
	
	}
</style>
