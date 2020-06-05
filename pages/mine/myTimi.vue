<template>
	<!-- 我的添米 -->
	<view class="content">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
			<view class="timi_list">
				<view class="timi" v-for="(item,index) in recommendList" :key="index">
					<view class="timi_title">
						<text class="name">{{item.name}}</text>
						<text class="recommendName" v-if="item.recommendName != ''">推荐人:{{item.recommendName}}</text>
					</view>

					<view class="timi_item" v-for="(timi_item,index) in item.item" :key="index">
						<view class="timi_content">
							<image class="img" :src="timi_item.image"></image>
							<view class="category">
								<view class="timi_item_name">{{timi_item.title}}</view>
								<text class="guige">{{timi_item.attr_val}}</text>
							</view>
							<view class="number">
								<view class="danjia"><text class="symbol">￥</text>{{timi_item.price}}</view>
								<view class="shuliang">x{{timi_item.number}}</view>
							</view>
						</view>
						<view class="statistics">总价<text class="symbol">￥</text><text class="nur">{{timi_item.price}}</text>，优惠<text
							 class="symbol">￥</text><text class="nur">6</text>，实付款<text class="symbol">￥</text><text class="nur">77</text></view>

					</view>
					<view class="statisticsBox">
						<view class="unit">共 <text class="num">2</text>件</view>实赚:<view class="subtotalMoney num">￥<text>90</text></view>
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
				timiList: [{
						name: "彭于晏",
						recommendName: "吴彦祖",
						item: [{
								attr_val: "#5g 1支装",
								id: 1,
								image: "http://ttianxuan.local/static/upload/images/goods/2019/01/14/1547453895416529.jpg",
								number: 1,
								price: 278,
								stock: 15,
								title: "mac复古唇膏很多字很多字长长的名字的展示形式",
								save: 12,
							},
							{
								attr_val: "#5g 1支装",
								id: 1,
								image: "http://ttianxuan.local/static/upload/images/goods/2019/01/14/1547453895416529.jpg",
								number: 1,
								price: 278,
								stock: 15,
								title: "mac复古唇膏很多字很多字长长的名字的展示形式",
								save: 12,
							}
						]
					},
					{
						name: "彭于晏",
						recommendName: "",
						item: [{
								attr_val: "#5g 1支装",
								id: 1,
								image: "http://ttianxuan.local/static/upload/images/goods/2019/01/14/1547453895416529.jpg",
								number: 1,
								price: 278,
								stock: 15,
								title: "mac复古唇膏很多字很多字长长的名字的展示形式",
								save: 12,
							},
							{
								attr_val: "#5g 1支装",
								id: 1,
								image: "http://ttianxuan.local/static/upload/images/goods/2019/01/14/1547453895416529.jpg",
								number: 1,
								price: 278,
								stock: 15,
								title: "mac复古唇膏很多字很多字长长的名字的展示形式",
								save: 12,
							}
						]
					}
				],
				recommendList: [],
				isGoodsEdit: false, // 是否加载编辑后的数据
				category_id: "",
				page: 1
			};
		},
		methods: {
			// 上拉加载和下拉刷新
			upCallback(page) {
				console.log(page)
				this.getShoucang(page)

			},
			// 收藏夹
			getShoucang(page) {
				console.log(page)
				var data = {
					level:'all',
					page: page.num
				};
				request.post('distribution/team', data).then(res => {
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
		}
	}
</script>

<style scoped lang="less">
	.content {
		border-top: 1rpx solid #DBDBDB;

		.timi {
			background-color: #FFFFFF;
			padding: 20rpx 24rpx 34rpx 30rpx;
			margin-bottom: 12rpx;

			.timi_title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 20rpx;

				.name {
					font-size: 28rpx;
					line-height: 40rpx;
				}

				.recommendName {
					font-size: 22rpx;
					line-height: 32rpx;
				}
			}


			.timi_content {
				display: flex;
				justify-content: space-between;

				.img {
					width: 150rpx;
					height: 150rpx;
					border-radius: 20rpx;
				}

				.category {
					width: 410rpx;

					.timi_item_name {
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
						font-size: 26rpx;
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

			.timi_item {
				margin-bottom: 50rpx;
			}

			.statisticsBox {
				display: flex;
				justify-content: flex-end;
				align-items: center;
				font-size: 22rpx;
				line-height: 32rpx;

				.unit {
					font-size: 22rpx;
					line-height: 32rpx;
					color: #AEAEA0;
					margin-right: 10rpx;

					text {
						font-size: 28rpx;
						line-height: 34rpx;
					}
				}

				.subtotalMoney {
					color: #FE7956;
					font-size: 24rpx;
					line-height: 30rpx;
					margin-left: 10rpx;

					text {
						font-size: 32rpx;
						line-height: 40rpx;
					}
				}
			}

		}
	}
</style>
