<template>
	<view class="page">
		<tabControl :current="current" activeColor="#FF9377" :values="items" :fixed="true" :scrollFlag='true' :isEqually='true'
		 @clickItem="onClickItem"></tabControl>
		<!-- 使用 swiper 配合 滑动切换 -->
		<swiper class="swiper" style="height: 100%;" @change='scollSwiper' :current='current'>
			<swiper-item v-for="(item,index) in items" :key='index'>
				<!-- 使用 scroll-view 来滚动内容区域 -->
				<scroll-view scroll-y="true" style="height: 100%;">
					<view class="order" v-for="(item,index) in ordrtAll" :key="index">
						<view class="title">
							<text class="pinlei">{{item.pinlei}}</text>
							<text class="zhuangtai">{{item.zhuangtai}}</text>
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
						<view class="statistics">总价<text class="symbol">￥</text><text class="nur">{{item.zongjia}}</text>，优惠<text class="symbol">￥</text><text
							 class="nur">{{item.youhui}}</text>，实付款<text class="symbol">￥</text><text class="nur">{{item.shiji}}</text></view>
					</view>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	import tabControl from '../../components/tabControl-tag/tabControl-tag.vue';
	export default {
		components: {
			tabControl
		},
		data() {
			return {
				items: ['全部', '待付款', '待发货', '待收货'],
				current: 0,
				ordrtAll: [{
					pinlei: "时令鲜果",
					zhuangtai: "卖家已发货",
					name: "四川眉山9号橙一个长长的名字的展示形式",
					danjia: "45",
					shuliang: "2",
					guige: "#5g 1支装",
					zongjia: 90,
					youhui: "0",
					shiji: 90,
					img: "../../static/images/touxiang.jpg"
				}]
			};
		},
		onLoad() {},
		methods: {
			onClickItem(val) {
				this.current = val.currentIndex
			},
			scollSwiper(e) {
				this.current = e.target.current
			}
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
			.statistics{
				text-align: right;
				font-size: 28rpx;
				.symbol{
					font-family: Akrobat-Regular;
					font-size: 22rpx;
				}
				.nur{
					font-family: Akrobat-Regular;
					font-size: 28rpx;
				}
			}
		}
	}
</style>
