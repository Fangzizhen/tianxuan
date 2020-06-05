<template>
	<!-- 订单列表 -->
	<view class="page">
		<tabControl :current="current" activeColor="#FF9377" :values="items" :fixed="true" :scrollFlag='true' :isEqually='true'
		 @clickItem="onClickItem"></tabControl>
		<view class="swiper ">
			<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<view class="order" v-for="(item,index) in recommendList" :key="index" @click="navDetail(item.id)">
					

					<view v-for="(commodity,index) in item.items" :key="index">
						<view class="title">
							<text class="pinlei">{{commodity.category}}</text>
							<text class="zhuangtai">{{item.status_name}}</text>
						</view>
						<view class="content">
							<image class="img" :src="commodity.images"></image>
							<view class="category">
								<view class="name" style="text-indent: -10rpx;">{{commodity.title}}</view>
								<text class="guige" v-if="commodity.spec_text !=null ">{{commodity.spec_text}}</text>
							</view>
							<view class="number">
								<view class="danjia"><text class="symbol">￥</text>{{commodity.price}}</view>
								<view class="shuliang">x{{commodity.buy_number}}</view>
								<view class="receipt" v-show="item.status_name != '待付款' && item.status_name != '待收货'"  @click.stop="Aftermarke(item)">申请退款</view>
							</view>
						</view>
						
						<!-- <view class="statistics">总价<text class="symbol">￥</text><text class="nur">{{commodity.total_price}}</text>
							<view v-if="user_type != undefined && user_type != 0">，优惠<text class="symbol">￥</text><text class="nur">{{item.youhui}}</text>，实付款<text class="symbol">￥</text><text class="nur">{{item.shiji}}</text></view>
						</view> -->
						
					</view>
					<view class="statistics">{{item.describe}}</view>
					<view class="btn_box" >
						
						<!-- <view class="receipt" @click.stop="collect_event(item)">确认收货</view> -->
						<view v-show="item.status_name != '待付款' && item.status_name != '待发货'" class="logistics" @click.stop="goLogistics(item.id)">查看包裹</view>
					</view>
				</view>
			</mescroll-body>
		</view>
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
				items: ['全部', '待付款', '待发货', '待收货'],
				current: "",
				currentNum: '',
				page: 1, //分页数
				recommendList: [],
				user_type: this.get_user_type().plugins_distribution_level, //用户类型
			};
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			this.current = parseInt(option.current_data)
			if (this.current == 0) {
				this.currentNum = -1;
			} else {
				this.currentNum = this.current;
			}
		},
		methods: {
			// 改变分类
			onClickItem(val) {
				console.log(val)
				this.recommendList = []
				this.current = val.currentIndex
				if (val.currentIndex == 0) {
					this.currentNum = -1;
				} else {
					this.currentNum = val.currentIndex;
				}
				var page = {
					num: this.page
				}
				this.upCallback(page)
			},
			scollSwiper(e) {
				this.current = e.target.current
			},
			goLogistics(id) {
				uni.navigateTo({
					url: '/pages/mine/logistics?id=' + id
				})
			},
			navDetail(id) {
				uni.navigateTo({
					url: '/pages/mine/orderDetail?id=' + id
				})
			},
			// 上拉加载和下拉刷新
			upCallback(page) {
				var data = {
					page: page.num,
					keywords: "",
					status: this.currentNum,
					is_more: 1
				}
				request.post('order/index', data).then(res => {
					console.log(res)
					var curPageData = res.data.data
					this.mescroll.endByPage(curPageData.length, res.data.page_total);
					if (page.num == 1) this.recommendList = [];
					this.recommendList = this.recommendList.concat(curPageData);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			 // 收货
			  collect_event(e) {
					var that = this;
			    uni.showModal({
			      title: "温馨提示",
			      content: "请确认已收到货物或已完成，操作后不可恢复，确定继续吗?",
			      confirmText: "确认",
			      cancelText: "不了",
			      success: result => {
			        if (result.confirm) {
			//           // 参数
			          var id = e.id;
			          // var status = e.status;
			
			//           // 加载loding
			//           wx.showLoading({title: "处理中..." });
			
			
			
								request.post('order/collect', {id:id}).then(res => {
									if(res.code == 0){
										uni.showToast({
											icon:"none",
										    title: res.msg,
												duration: 2000,
												success() {
													var page = {
														num:1
													}
													that.upCallback(page)
													
												}
										});
									}
								})
			        }
			      }
			    });
			  },
				
				
				
				// 去到售后详情
				Aftermarke(e) {
					console.log(e)
					var that = this;
					var parameter = {
						oid :e.id,
					}
					uni.navigateTo({
						url: 'afterSalseDetail?info='+encodeURIComponent(JSON.stringify(parameter))
					})
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
			margin-bottom: 10rpx;

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
				margin-bottom: 20rpx;

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
						font-size: 24rpx;
						line-height: 28rpx;
						padding: 2rpx 12rpx;
						padding-top: 6rpx;
						color: #999999;
						background: rgba(247, 243, 241, 1);
						border-radius: 6rpx;
					}
				}

				.number {
					display: flex;
					flex-direction: column;
					align-items: flex-end;
					font-family: Akrobat-Regular;

					.danjia {
						font-size: 32rpx;
						line-height: 34rpx;
						margin-bottom: 8rpx;

						.symbol {
							font-size: 28rpx;
						}
					}

					.shuliang {
						margin-top: 6rpx;
						font-size: 26rpx;
						line-height: 26rpx;
						color: #969696;
					}
					.receipt{
						font-size: 26rpx;
						margin-top: 30rpx;
						color: #4d7fa7;
					}
				}
			}

			.statistics {
				text-align: right;
				font-size: 28rpx;
				margin-bottom: 24rpx;
				display: flex;
				align-items: center;
				justify-content: flex-end;
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
