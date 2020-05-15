<template>
	<view class="page">
		<view class="category-wrapper" v-if="catrgoryList.length>0">
			<!-- 左边导航 -->
			<scroll-view scroll-y="true" class="left-wrapper" scroll-with-animation="true">
				<view class="left-content">
					<view class="title-content" :class="select_index === index?'onSelected':''" v-for="(title,index) in catrgoryList"
					 :key="title.id" @tap="choose(index,title.id)"><text>{{title.name}}</text><text class="title-english">English</text></view>
					 <!-- {{title.vice_name}} -->
				</view>
			</scroll-view>
			<!-- 右边内容 -->
			<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" v-if="makeup">
				<view class="right-content">
					<!-- 产品区 美妆-->
					<view class="product-wrapper">
						<view class="category-content">
							<view class="product-item" v-for="(p_item,p_index) in product" :key="p_item.id" @tap="enterDetail(p_item.id)">
								<image class="product-img" :src="p_item.icon"></image>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="right-wrapper" scroll-with-animation="true" v-else>
				<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
				<view class="right-content">
					<!-- 产品区 非美妆-->
					<view class="product-wrapper">
						<view class="category-content">
							<view class="category-list" v-for="(c_item,c_index) in catrgory" :key="c_item.id" @tap="navToDetailPage(c_item.id)">
								<image class="category_img" :src="c_item.images" mode=""></image>
								<view class="category_txt">
									<text class="title">{{c_item.title}}</text>
									<text class="price"><text class="symbol">￥</text>{{c_item.min_price}}<text class="earn">/赚<text>3.6</text></text></text>
									<image src="../../static/images/index/icon-fenxiang.png" @tap.stop="share"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				</mescroll-body>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				// data:[],//全部数据
				catrgoryList: [],
				product: [], //美妆列表
				catrgory: [], //其他列表
				select_index: 0,
				makeup: true,
				page:1,//分页数
				category_id:""
			}
		},
		onLoad() {
			this.getClassification();
		},
		methods: {
			// 获取分类数据
			getClassification() {
				var data = {};
				request.post('goods/category', data).then(res => {
					this.catrgoryList = res.data
					this.chooseGoods(res.data[0].id)
				})
			},
			// 获取列表数据
			getList(data) {
				var data = data;
				request.post('search/index', data).then(res => {
					console.log(res)
					this.catrgory = res.data.data
						this.makeup = false
				})
			},
			// 选择分类
			choose(index, id) {
				if (this.select_index === index) {
					return;
				}
				this.select_index = index;
				this.chooseGoods(id)
			},
			// 分类对应商品
			chooseGoods(id) {
				var that = this;
				that.catrgory = []
				var data = that.catrgoryList
				that.category_id = id
				console.log(id)
				var arr = [];
				for (var i = 0; i < data.length; i++) {
					if (id == data[i].id) {
						var itemLength = data[i].items.length
						console.log(itemLength)
						arr = data[i].items
						if(itemLength != "11"){
							var postData={
								category_id:id,
								page:that.page
							}
							that.getList(postData)
						}else{
									that.product = arr
									that.makeup = true
						}
					}
				}
			},
			// 上拉加载和下拉刷新
			upCallback(page) {
				console.log(page)
				var data = {
					category_id: this.category_id,
					page: page.num
				};
				request.post('search/index', data).then(res => {
					var curPageData = res.data.data
					this.mescroll.endByPage(curPageData.length, res.data.page_total);
					if (page.num == 1) this.catrgory = [];
					this.catrgory = this.catrgory.concat(curPageData);
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
			// 进入美妆列表
			enterDetail(id) {
				uni.navigateTo({
					url: '/pages/productList/productList?goods_id='+id
				})
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
	.page {
		.category-wrapper {
			width: 100%;
			display: flex;
			flex-direction: row;
			position: absolute;
			top: 0;
			bottom: 0;

			.left-wrapper {
				border-top: 1rpx #F7F3F1 solid;
				width: 161rpx;
				flex: 0 0 161rpx;

				.left-content {
					.title-content {
						width: 100%;
						height: 100rpx;
						display: flex;
						flex-direction: column;
						justify-content: center;
						align-items: center;
						cursor: pointer;
						font-size: 26rpx;
						font-weight: 400;
						line-height: 36rpx;
						font-weight:400;
						.title-english{
							font-family: uniicons;
							font-size: 22rpx;
							line-height: 32rpx;
							font-weight:400;
							letter-spacing: 6rpx;
						}
						&.onSelected {
							position: relative;
							color: #FFA68F;
							&::before {
								content: '';
								position: absolute;
								left: 0;
								top: 0;
								margin-top: 26rpx;
								width: 4rpx;
								height: 52rpx;
								background: linear-gradient(124deg, #FFA68F 0%, #fb7c22 100%);
							}
						}
					}
				}
			}

			.right-wrapper {
				border-top: 1rpx #F7F3F1 solid;
				flex: 1;
				background-color: #fff;

				.right-content {
					width: 100%;
					border-left: 1rpx solid #efefef;
					box-sizing: border-box;

					.product-wrapper {
						.category-content {
							display: flex;
							flex-wrap: wrap;
							justify-content: space-around;
							align-content: space-around;

							.product-item {
								margin-top: 98rpx;
								width: 260rpx;
								height: 86rpx;

								.product-img {
									width: 100%;
									height: 100%;
								}
							}
						}

						.category-list {
							width: 100%;
							padding: 26rpx 34rpx;
							display: flex;
							.category_img{
								width: 218rpx;
								height: 218rpx;
								margin-right: 13rpx;
							}
							.category_txt{
								padding: 15rpx 0;
								flex: 1;
								display: flex;
								flex-direction: column;
								justify-content: space-between;
								position: relative;
								.title{
									font-size:24rpx;
									font-weight:400;
									color:rgba(0,0,0,1);
									line-height:40rpx;
									text-overflow: -o-ellipsis-lastline;
									overflow: hidden;
									text-overflow: ellipsis;
									display: -webkit-box;/*重点，不能用block等其他*/
									-webkit-line-clamp: 2;/*重点IE和火狐不支持*/
									-webkit-box-orient: vertical;/*重点*/
								}
								.price{
									font-family: Akrobat-Regular;
									font-size:40rpx;
									line-height: 48rpx;
									.symbol{
										font-size: 24rpx;
										line-height: 34rpx;
									}
									.earn{
										font-family: SourceHanSansCN-Regular;
										font-size: 24rpx;
										font-weight: 400;
										color:rgba(255,129,96,1);
										line-height:36rpx;
										margin-left: 6rpx;
										text{
											margin-left: 4rpx;
											font-family: Akrobat-Regular;
											font-size:38rpx;
											line-height:48rpx;
										}
									}
								}
								image{
									width: 32rpx;
									height: 32rpx;
									position: absolute;
									bottom: 18rpx;
									right: 0;
								}
							}
						}
					}
				}
			}
		}

	}
</style>
