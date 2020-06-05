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
			<view class="price_box" :class="user_type != 0 ? 'aa': '' ">
				<view class="price">
				
					<text class="symbol">￥</text>
					<text class="danjia">{{goods.price}}</text>
					<view class="earn" v-if="user_type != undefined && user_type != 0">
						<text class="gang numgang">/</text>
						<text class="zhuan">赚</text>
						<text class="profit">{{profit}}</text>
					</view>
				</view>
				<!-- <text class="price_contrast"><text class="symbol">￥</text>{{goods.original_price}}</text> -->
			</view>
			<view class="price_title">
				<view class="name" style="">{{goods.title}}</view>
				<view class="reason">
					<text class="reason_title">推荐理由</text>
					<view class="reason_content">
						<view v-html="goods.simple_desc"></view>
					</view>
				</view>
			</view>
		</view>
		<!-- 规格 -->
		<view class="specifications_box">
			<view class="specifications" @click="toggleSpec('cart')">
				<text class="title">规格</text>
				<view class="con">{{specificationsTxt}}</view>
				<uni-icons type="arrowright" size="13" color="#B3B3B3"></uni-icons>
			</view>
			<navigator class="specifications" url="/pages/address/addressList" open-type="navigate">
				<text class="title">送至</text>
				<view class="con">{{buy_address}}</view>
				<uni-icons type="arrowright" size="13" color="#B3B3B3"></uni-icons>
			</navigator>
			<view class="specifications">
				<text class="title">运费</text>
				<view class="con"><text v-show="xuzhiType">满68包邮</text><text v-show="!xuzhiType">包邮(部分偏远不发地区详见发货须知)</text></view>
			</view>
		</view>
		<image class="ensure" v-show="xuzhiType"  src="../../static/images/detail/ensure.png"></image>
		<!-- 详情图片 -->
		<view class="detail_img" v-if="goods.content_app != ''">
			<view class="title">详情</view>
			<view v-for="(item,index) in goods.content_app" :key="index">
				<image v-if="item.images != ''" :src="item.images" mode="widthFix" style="width: 100%;"></image>
			</view>
			<image v-show="xuzhiType" src="../../static/images/xuzhi.jpg" mode="widthFix" style="width: 100%;"></image>
			
		</view>
		<view class="noMore">-- 让选择变得简单 --</view>
		<!-- 底部商品导航 -->
		<view class="goodsNav">
			<view class="navto_box">
				<navigator class="navto" url="/pages/service/service" open-type="navigate">
					<image src="../../static/images/detail/unservice.png" mode=""></image>
					<text>客服</text>
				</navigator>
				<navigator class="navto" url="/pages/shopping/shopping" open-type="switchTab">
					<view class="badge" v-if="this.common_cart_total != 0">{{common_cart_total}}</view>
					<image src="../../static/images/detail/unspi_cart.png" mode=""></image>
					<text>购物车</text>
				</navigator>
				<view class="navto" @click="goods_favor_event" v-if="is_favor ==1">
					<image src="../../static/images/detail/collection.png"></image>
					<text style="color: #FFA68F;">已收藏</text>
				</view>
				<view class="navto" @click="goods_favor_event" v-else>
					<image src="../../static/images/detail/uncollection.png"></image>
					<text>收藏</text>
				</view>
			</view>
			<view class="btn_box_vip" v-if="user_type != undefined && user_type != 0">
				<view class="purchase_box" @click="toggleSpec()">
					<text class="earn">省<text>{{profit}}</text></text>
					<text style="margin-top: -8rpx;">立即购买</text>
				</view>
				<view class="share_box">
					<text class="earn">赚<text>{{profit}}</text></text>
					<cover-view class="txt" style="margin-top: -2rpx;"><text>分享</text>
						<image src="../../static/images/detail/share.png" mode=""></image>
					</cover-view>
				</view>
			</view>
			<view class="btn_box" v-else>
				<view class="join" @click="toggleSpec('cart')">加入购物车</view>
				<view class="purchase" @click="toggleSpec('buy')">立即购买</view>
			</view>
		</view>

		<!-- 规格-模态层弹窗 -->
		<view class="popup spec" :class="specClass" @touchmove.stop.prevent="stopPrevent" @click="toggleSpec">
			<!-- 遮罩层 -->
			<view class="mask"></view>
			<scroll-view scroll-y="true" class="layer attr-content" scroll-with-animation="true" @click.stop="stopPrevent">
				<view class="attr-box">
					<view class="a-t">
						<image :src="goods.home_recommended_images"></image>
						<view class="right">
							<view></view>
							<text class="price"><text class="symbol">￥</text>{{goods.price}}</text>
							<text class="tips">请选择规格</text>
						</view>
					</view>
					<view>
						<view v-for="(item,index) in specifications" :key="index" class="attr-list">
							<text class="attr_name">{{item.name}}</text>
							<view class="item-list">
								<text v-for="(childItem, childIndex) in item.value" :key="childIndex" class="tit" @click="selectSpec(index,childIndex)"
								 :class="{selected: childItem.is_active, spec_dont_choose: childItem.is_dont, spec_items_disabled: childItem.is_disabled}">
									{{childItem.name}}
								</text>
							</view>
						</view>
					</view>
					<view class="number_box">
						<text class="attr_name">数量</text>
						<uni-number-box :min="1" :max="temp_buy_number" @change="getPurchaseQuantity"></uni-number-box>
					</view>
					<view class="btn_box" v-if="user_type != undefined && user_type != 0">
						<view class="join" @click="toggleSpec('cart');goods_cart_event()">加入购物车</view>
						<view class="purchase" @click="toggleSpec('buy');goods_cart_event()">立即购买</view>
					</view>
					<view class="btn_determine" @click="toggleSpec(typeName);goods_cart_event()" v-else>确定</view>
				</view>
			</scroll-view>
		</view>



	</view>
</template>

<script>
	import request from '../../common/request.js';
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import uniBadge from "@/components/uni-badge/uni-badge.vue"
	export default {
		components: {
			uniNumberBox,
			uniBadge
		},
		data() {
			return {
				userinfor: [], //用户信息
				goods: [], //全部数据
				banner_list: [], //banner列表
				user_type: '',
				specClass: 'none',
				specifications: [], //产品规格信息
				popup_type: 1, //弹窗Type
				inventory: "",
				temp_buy_number: 1, //最大商品数量
				specificationsTxt: "请选择规格",
				purchaseQuantity: 1, //购买商品数量
				profit: 0, //会员赚
				collection: "收藏", //收藏文本
				is_favor: 0, //收藏开关
				spec: "", //规格数据
				buy_address: "请选择收货地址",
				common_cart_total: 0, //购车商品数量
				typeName: '', //点击确定状态
				xuzhiType: false
			}
		},
		onShow() {
			var buy_user_address_select = uni.getStorageSync("buy_user_address_select")
			console.log(buy_user_address_select)
			if (buy_user_address_select == "" || buy_user_address_select == null || buy_user_address_select == undefined) {
				this.buy_address = "请选择收货地址"
			} else {
				this.buy_address = buy_user_address_select.province_name + ',' + buy_user_address_select.city_name + ',' +
					buy_user_address_select.county_name + ',' + buy_user_address_select.address
			}
		},

		onLoad: function(option) { //option 为上一页面跳转携带的参数
			var userinfor = uni.getStorageSync('userinfor');
			this.userinfor = userinfor
			this.user_type = userinfor.plugins_distribution_level
			console.log(this.user_type)
			this.getDetail(option)
		},
		methods: {
			//获取数据
			getDetail(data) {

				var data = data;
				request.post('goods/detail', data).then(res => {
					console.log(res.data);
					this.common_cart_total = res.data.common_cart_total
					var reg = new RegExp("\n", "g"); //g,表示全部替换
					res.data.goods.simple_desc = res.data.goods.simple_desc.replace(reg, "</br>");
					console.log(res.data.goods.simple_desc)
					this.goods = res.data.goods;
					// console.log(res.data.goods.category_names[0])
					var fenleiData = res.data.goods.category_names
					console.log(fenleiData)
					
					if(fenleiData.includes("农家特产") || fenleiData.includes("时令蔬果") || fenleiData.includes("生鲜食材") ){
						console.log(111111)
						this.xuzhiType = false
					}else{
						console.log(22222)
						this.xuzhiType = true
					}
					
					
					// if (res.data.goods.category_names[0] != "农家特产" && res.data.goods.category_names[0] != "时令蔬果" && res.data.goods.category_names[0] != "生鲜食材") {
					// 	this.xuzhiType = false
					// }
					this.profit = res.data.goods.profit
					this.banner_list = res.data.goods.photo;
					this.specifications = res.data.goods.specifications.choose;
					this.temp_buy_number = res.data.goods.inventory || 1;
					this.is_favor = res.data.goods.is_favor;
				})
			},
			//规格弹窗开关
			toggleSpec(name) {
				// console.log(typeName)
				this.typeName = name
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

			// 选择规格
			selectSpec(index, itemIndex) {
				var key = index || 0;
				var keys = itemIndex || 0;
				var temp_data = this.specifications
				// 不能选择和禁止选择跳过
				if ((temp_data[key]['value'][keys]['is_dont'] || null) == null && (temp_data[key]['value'][keys]['is_disabled'] ||
						null) == null) {
					// 规格选择
					for (var i in temp_data) {
						for (var k in temp_data[i]['value']) {
							if ((temp_data[i]['value'][k]['is_dont'] || null) == null && (temp_data[i]['value'][k]['is_disabled'] || null) ==
								null) {
								if (key == i) {
									if (keys == k && (temp_data[i]['value'][k]['is_active'] || null) == null) {
										this.$set(temp_data[i]['value'][k], 'is_active', true);
									} else {
										this.$set(temp_data[i]['value'][k], 'is_active', false);
									}
								}
							}
						}
					}
					// 不能选择规格处理
					this.goods_specifications_choose_handle_dont(key);
					// 获取下一个规格类型
					this.get_goods_specifications_type(key);
					// 获取规格详情
					this.get_goods_specifications_detail();
				}
			},

			// 不能选择规格处理
			goods_specifications_choose_handle_dont(key) {
				var temp_data = this.specifications || [];
				if (temp_data.length <= 0) {
					return false;
				}
				// 是否不能选择
				for (var i in temp_data) {
					for (var k in temp_data[i]['value']) {
						if (i > key) {
							this.$set(temp_data[i]['value'][k], 'is_dont', true);
							this.$set(temp_data[i]['value'][k], 'is_disabled', false);
							this.$set(temp_data[i]['value'][k], 'is_active', false);
						}
						// 当只有一个规格的时候
						if (key == 0 && temp_data.length == 1) {
							if ((temp_data[i]['value'][k]['is_only_level_one'] || null) != null && (temp_data[i]['value'][k]['inventory'] ||
									0) <= 0) {
								this.$set(temp_data[i]['value'][k], 'is_disabled', true);
							} else {
								this.$set(temp_data[i]['value'][k], 'is_disabled', false);
							}
						}
					}
				}
			},

			// 获取下一个规格类型
			get_goods_specifications_type(key) {
				var temp_data = this.specifications;
				var active_index = key + 1;
				var sku_count = temp_data.length;
				console.log(temp_data)
				console.log(active_index)
				console.log(sku_count)
				if (active_index <= 0 || active_index >= sku_count) {
					return false;
				}

				// 获取规格值
				var spec = [];
				for (var i in temp_data) {
					for (var k in temp_data[i]['value']) {
						if ((temp_data[i]['value'][k]['is_active'] || null) != null) {
							spec.push({
								"type": temp_data[i]['name'],
								"value": temp_data[i]['value'][k]['name']
							});
							break;
						}
					}
				}
				if (spec.length <= 0) {
					return false;
				}

				var data = {
					id: this.goods.id,
					spec: JSON.stringify(spec)
				}

				request.post('goods/spectype', data).then(res => {
					console.log(res.data);
					if (res.code == 0) {
						var spec_count = spec.length;
						var index = (spec_count > 0) ? spec_count : 0;
						if (index < sku_count) {
							for (var i in temp_data) {
								for (var k in temp_data[i]['value']) {
									if (index == i) {
										this.$set(temp_data[i]['value'][k], 'is_dont', false);
										var temp_value = temp_data[i]['value'][k]['name'];
										var temp_status = false;
										for (var t in res.data) {
											if (res.data[t] == temp_value) {
												temp_status = true;
												break;
											}
										}
										if (temp_status == true) {
											this.$set(temp_data[i]['value'][k], 'is_disabled', false);
										} else {
											this.$set(temp_data[i]['value'][k], 'is_disabled', true);
										}
									}
								}
							}
						}
					} else {
						uni.showToast(res.msg);
					}

				})

			},


			// 获取规格详情
			get_goods_specifications_detail() {
				// 是否全部选中
				var temp_data = this.specifications;
				var sku_count = temp_data.length;
				var active_count = 0;

				// 获取规格值
				var spec = [];
				for (var i in temp_data) {
					for (var k in temp_data[i]['value']) {
						if ((temp_data[i]['value'][k]['is_active'] || null) != null) {
							active_count++;
							spec.push({
								"type": temp_data[i]['name'],
								"value": temp_data[i]['value'][k]['name']
							});
							break;
						}
					}
				}
				var data = {
					id: this.goods.id,
					spec: JSON.stringify(spec)
				}
				request.post('goods/specdetail', data).then(res => {
					console.log(res.data);
					var specificationsTxt = ''
					for (let i = 0; i < spec.length; i++) {
						specificationsTxt += spec[i].type + ': ' + spec[i].value
					}
					this.specificationsTxt = specificationsTxt
					this.goods.price = res.data.price
					this.goods.original_price = res.data.original_price
					this.temp_buy_number = res.data.inventory
					this.profit = res.data.profit
					this.spec = spec
				})

			},
			// 获取购买数量
			getPurchaseQuantity(e) {
				this.purchaseQuantity = e
			},

			// 收藏事件
			goods_favor_event() {
				var loginRes = this.checkLogin();
				if (!loginRes) {
					return
				} else {
					var data = {
						"id": this.goods.id
					}
					request.post('goods/favor', data).then(res => {
						console.log(res)
						if (res.code == 0) {
							uni.showToast({
								icon: "none",
								title: res.msg,
								duration: 2000,
							});
						}
						this.is_favor = res.data.status
					})
				}
			},

			// 加入购物车事件
			goods_cart_event(type) {
				var that = this
				var buy_user_address_select = uni.getStorageSync("buy_user_address_select")
				// if (buy_user_address_select == "" || buy_user_address_select == null || buy_user_address_select == undefined){
				// 	uni.showToast({
				// 		icon:"none",
				// 	    title: '请选择收货地址',
				// 	    duration: 2000,
				// 	});
				// 	return
				// }
				if (this.specifications.length > 0 && this.specificationsTxt == '请选择规格') {
					uni.showToast({
						icon: "none",
						title: '请选择商品规格',
						duration: 2000,
					});
					return
				}

				var loginRes = this.checkLogin();
				if (!loginRes) return
				switch (that.typeName) {
					case 'buy':
						var data = {
							"buy_type": "goods",
							goods_id: this.goods.id,
							stock: this.purchaseQuantity,
							spec: JSON.stringify(this.spec)
						}
						uni.navigateTo({
							url: '/pages/shopping/shoppingOrder?data=' + encodeURIComponent(JSON.stringify(data))
						})
						break;

					case 'cart':
						var data = {
							goods_id: this.goods.id,
							stock: this.purchaseQuantity,
							spec: JSON.stringify(this.spec)
						}
						request.post('cart/save', data).then(res => {
							console.log(res)
							if (res.code == 0) {
								uni.showToast({
									mask: true,
									title: res.msg,
									success() {
										setTimeout(() => {
											uni.redirectTo({
												url: 'productDetails?goods_id=' + that.goods.id
											});
										}, 1000)

									}
								});

							}

						})
						break;
				}
			},
		}
	}
</script>

<style scoped lang="less">
	.page {
		padding-bottom: 130rpx;
		.aa{
			display: flex;
			align-items: center;
		}
		.swiper {
			width: 100%;
			height: 750rpx;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.detail_introduce {
			background: #fff;
			margin-bottom: 16rpx;

			.price_box {
				height: 74rpx;
				background: linear-gradient(135deg, rgba(255, 209, 202, 0.3) 0%, rgba(255, 232, 194, 0.3) 100%);
				padding: 26rpx 0 10rpx 24rpx;
				position: relative;
				.price {
					font-family: Akrobat-Regular;
					font-size: 46rpx;
					color: #FE7956;
					display: flex;
					align-items: flex-end;
					.symbol {
						font-size: 30rpx;
						line-height: 30rpx;
						padding-bottom: 10rpx;
					}

					.danjia {
						font-size: 50rpx;
						line-height: 40rpx;
						padding-bottom: 12rpx;
					}

					.earn {
						font-family: SourceHanSansCN-Regular;
						margin-left: 16rpx;
						font-size: 30rpx;
						color: rgba(255, 129, 96, 1);
						// padding-top: 8rpx;
					}

					.gang {
						font-family: Akrobat-Regular;
						font-size: 24rpx;
						line-height: 22rpx;
						margin-right: 6rpx;
						position: absolute;
						top: 52rpx;
						margin-left: -4rpx;
					}

					.profit {
						margin-left: 4rpx;
						font-family: Akrobat-Regular;
						font-size: 50rpx;
						margin-left: 40rpx;
					}

					.zhuan {
						font-size: 28rpx;
						position: absolute;
						margin-left: 10rpx;
						top: 38rpx;
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
					margin-top: 14rpx;
					text-indent: -20rpx;
					font-size: 36rpx;
					color: #333333;
					line-height: 60rpx;
					margin-bottom: 10rpx;
				}

				.reason {
					margin-top: 30rpx;
					.reason_title {
						font-size: 28rpx;
						color: #333333;
						line-height: 40rpx;

					}

					.reason_content {
						margin-top: 22rpx;
						padding: 14rpx 24rpx;
						padding-bottom: 8rpx;
						background-color: #F8F4F3;
						border-radius: 3rpx;
						color: #333333;
						position: relative;

						view {
							font-size: 24rpx;
							line-height: 36rpx;
							// .reason_index {
							// 	font-size: 22rpx;
							// 	font-family: Akrobat-Regular;
							// 	line-height: 30rpx;
							// 	margin-right: 8rpx;
							// }
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
			margin-bottom: 16rpx;

			.specifications {
				padding: 24rpx 24rpx;
				border-bottom: 0.3px #EBEBEB solid;
				display: flex;
				align-items: center;

				.title {
					padding-top: 8rpx;
					margin-right: 34rpx;
					font-size: 24rpx;
					color: rgba(163, 163, 163, 1);
					line-height: 34rpx;
				}

				.con {
					padding-top: 8rpx;
					flex: 1;
					font-size: 24rpx;
					color: rgba(51, 51, 51, 1);
					line-height: 34rpx;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
				}
			}
		}

		.ensure {
			width: 100%;
			height: 74rpx;
			margin-bottom: 12rpx;
		}

		//图片详情
		.detail_img {
			margin-top: -4rpx;
			background-color: #fff;

			.title {
				height: 110rpx;
				text-align: center;
				font-size: 32rpx;
				line-height: 116rpx;
				letter-spacing: 2rpx;
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
					flex: 1;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: space-between;
					position: relative;

					image {
						width: 88.8rpx;
						height: 52.8rpx;
					}

					text {
						font-size: 22rpx;
						line-height: 22rpx;
						color: #AEAEAE;
					}

					.badge {
						position: absolute;
						background-color: #FE7956;
						min-width: 22rpx;
						height: 22rpx;
						padding: 3rpx;
						top: 0;
						right: 15rpx;
						font-size: 18rpx;
						display: flex;
						align-items: center;
						justify-content: space-around;
						flex-direction: column;
						border-radius: 50%;
						color: #FFFFFF;
						z-index: 100;
					}
				}
			}

			.btn_box {
				border-radius: 12rpx;
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
				border-radius: 12rpx;
				overflow: hidden;
				display: flex;
				margin-right: 24rpx;
				border: 1px solid #FEEAE5;
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
					.txt {
						display: flex;
						
						text {
							display: block;
						}

						image {
							margin-left: 4rpx;
							width: 26.1rpx;
							height: 27rpx;
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
				max-height: 800rpx;
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
				// padding-bottom: 150rpx;
				position: relative;

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
					margin-bottom: 170rpx;

					.attr_name {
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}

				.btn_box {
					border-radius: 12rpx;
					padding: 0 30rpx;
					padding-bottom: 40rpx;
					height: 82rpx;
					display: flex;
					text-align: center;
					position: fixed;
					bottom: 0;
					left: 0;
					right: 0;
					background-color: #FFFFFF;

					view {
						flex: 1;
						color: #FE7956;
					}


					.join {
						background: #FEEAE5;
						font-size: 28rpx;
						line-height: 82rpx;
						border-radius: 12rpx 0 0 12rpx;
					}

					.purchase {
						font-size: 28rpx;
						line-height: 82rpx;
						height: 80rpx;
						border-radius: 0 12rpx 12rpx 0;
						border-top: 1rpx solid #FEEAE5;
						border-right: 1rpx solid #FEEAE5;
						border-bottom: 1rpx solid #FEEAE5;
					}
				}

				.btn_determine {
					width: 700rpx;
					height: 82rpx;
					background: rgba(254, 234, 229, 1);
					border-radius: 12rpx;
					border: 1rpx solid rgba(254, 234, 229, 1);
					font-size: 32rpx;
					text-align: center;
					color: rgba(254, 121, 86, 1);
					line-height: 82rpx;
					position: fixed;
					bottom: 30rpx;
					left: 50%;
					margin-left: -350rpx;
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

					.spec_dont_choose {
						color: #b4b3b3 !important;
						background-color: #ffffff !important;
						border: 1px solid #ebeaea !important;
					}

					.spec_items_disabled {
						color: #d2cfcf !important;
						background-color: #ffffff !important;
						border: 1px dashed #d5d5d5 !important;
					}
				}
			}
		}

	}
</style>
