<template>
	<view class="page">
		<!-- 列表 -->
		<view  class="noShopping" v-if="cartList.length ==0">
			<text>购物车空空如也</text>
			<navigator url="../index/index" open-type="switchTab">去逛逛>></navigator>
		</view>
		<uni-swipe-action class="goods_list" v-else>
			<uni-swipe-action-item :options="options"  v-for="(item,index) in cartList" :key="item.id" @click="commodityDel(item.id)">
				<view class="goods" style="height: 254rpx;">
				<view class="label " :class="item.checked ? 'select' : 'unSelect'" @click="check('item', index)"></view>
				<image class="img" :src="item.images" @click="navDetail(item.goods_id)"></image>
				<view class="goods_detail">
					<view class="title_box">
						<view class="title">{{item.title}}</view>
						<text class="specifications" v-if="item.specificationsTxt != ''">{{item.specificationsTxt}}</text>
					</view>
					<text class="price"><text class="symbol">￥</text>{{item.price}}<text class="company">/{{item.inventory_unit}}</text><text class="earn" v-if="user_type != undefined && user_type != 0">省<text>{{item.profit}}</text></text></text>
					<uni-number-box class="number" :min="1" :max="item.inventory" :value="item.stock"
					 :isMax="item.stock>=item.inventory?true:false" :isMin="item.stock===1" :index="index" @change="numberChange($event, index)"></uni-number-box>
				</view>
				</view>
				
				
				
				
			</uni-swipe-action-item>
		</uni-swipe-action>
		
		
		
		<!-- 底部菜单栏 -->
		<view class="menu_box">
			<view class="label_box">
				<view class="label select" :class="allChecked ? 'select' : 'unSelect'" @click="check('all')"></view>
				<text>全选</text>
			</view>
			<view class="settlement_box">
				<view class="settlement_txt"> <text style="margin-top: 16rpx;">合计:</text> <view class="symbol" >￥<text class="price">{{total}}</text><text class="save" v-if="user_type != undefined && user_type != 0" style="margin-top: -8rpx;">（省{{saveMoney}}）</text> </view>
				</view>
				<view class="settlement_btn" @click="createOrder">结算(  <text class="num">{{totalNum}}</text>  )</view>
			</view>
		</view>
	</view>
</template>

<script>
	import request from '../../common/request.js';
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	export default {
		components: {
			uniNumberBox,
			uniSwipeAction,
			uniSwipeActionItem
		},
		data() {
			return {
				user_type: '', //用户类型
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#FE7956'
					}
				}],
				total: 0, //总价格
				saveMoney: 0, //节省钱
				totalNum: 0, //总件数
				allChecked: false, //全选状态  true|false
				cartList: []
			}
		},
		onShow: function() {
			var loginRes = this.checkLogin('/pages/index/index');
			if (!loginRes) {
				return false;
			} else {
				this.getCardList()
				var userinfor = uni.getStorageSync('userinfor');
				this.userinfor = userinfor
				this.user_type = userinfor.plugins_distribution_level
			}
		},
		onHide() {
			this.allChecked = false
			this.total = 0
			this.saveMoney = 0
			this.totalNum = 0
			this.cartList = []
		},
		methods: {
			// 获取商品列表
			getCardList() {
				
				
				request.post('cart/index', {}).then(res => {
					console.log(res.data);
					var cartList = res.data.data
					var specList = cartList.spec
					for (let i = 0; i < cartList.length; i++) {
						var specList = cartList[i].spec;
						var specificationsTxt = ''
						if (specList == null || specList =='null') {
							specificationsTxt = ''
						} else {
							for (let j = 0; j < specList.length; j++) {
								specificationsTxt += specList[j].type + ':' + specList[j].value 
							}
						}
						cartList[i].specificationsTxt = specificationsTxt
					}
					console.log(cartList)
					this.cartList = cartList
				})
			},
			navDetail(id){
				uni.navigateTo({
					url: '../productDetails/productDetails?goods_id='+ id
				})
			},
			// 删除地址
			commodityDel(id) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定删除该商品么？',
					success: function(res) {
						if (res.confirm) {
							request.post('cart/delete', {id:id}).then(res => {
								console.log(res)
								if(res.code == 0){
									uni.showToast({
										mask:true,
										title: res.msg,
										duration: 2000,
									});
									that.getCardList()
								}else{
									uni.showToast({
										mask:true,
										title: res.msg,
										duration: 2000,
									});
								}
								
							})
						}
					}
				});
			},
			//选中状态处理
			check(type, index) {
				if (type === 'item') {
					this.cartList[index].checked = !this.cartList[index].checked;
				} else {
					const checked = !this.allChecked
					const list = this.cartList;
					list.forEach(item => {
						item.checked = checked;
					})
					this.allChecked = checked;
				}
				this.calcTotal(type);
			},
			//商品数量
			numberChange($event, index) {
				console.log($event,index)
				this.cartList[index].stock = $event;
				request.post('cart/stock', { "id": this.cartList[index]['id'], "goods_id": this.cartList[index]['goods_id'], "stock": $event}).then(res => {
					console.log(res)
					
					
				})
				this.calcTotal();
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				let total = 0;
				let totalNum = 0;
				let saveMoney = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.stock;
						totalNum += item.stock * 1;
						saveMoney += item.profit * item.stock;
					} else if (checked === true) {
						checked = false;
					}
				})

				this.allChecked = checked;
				this.total = this.$api.cutOutNum(total);
				this.totalNum = totalNum
				this.saveMoney = saveMoney |0
			},
			//创建订单
			createOrder() {
				let list = this.cartList;
				let goodsData = [];
				let total = 0;
				let totalNum = 0;
				let saveMoney = 0;
				var ids = ''
				list.forEach(item => {
					if (item.checked) {
						ids += item.id+ ','
						item.total = item.price * item.stock;
						item.totalNum = item.stock * 1;
						item.saveMoney = item.profit * item.stock;
						goodsData.push(item)
					}
				})
				console.log(ids)
				if (goodsData == null || goodsData == '' || goodsData == undefined) {
					this.$api.msg("请选择商品")
					return
				}
				var orderData = {
					ids:ids,
					"buy_type": "cart",
				}
				console.log(orderData)
				uni.navigateTo({
					url: '/pages/shopping/shoppingOrder?data=' + encodeURIComponent(JSON.stringify(orderData))
				})

				// this.$api.msg('跳转下一页 sendData');
			}
		}
	}
</script>

<style scoped lang="less">
	.page {
		width: 100%;
		height: 100%;
	}
	.noShopping{
		width: 100%;
		height: 1000rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30rpx;
		line-height: 42rpx;
		navigator{
			color: #FE7956;
			margin-left: 10rpx;
		}
	}

	.goods_list {
		background-color: #fff;
		margin-top: 18rpx;
		margin-bottom: 100rpx;

		.goods {
			
			display: flex;
			align-items: center;

			.label {
				width: 44rpx;
				height: 44rpx;
				margin-left: 34rpx;
			}

			.img {
				width: 144rpx;
				height: 176rpx;
				margin-left: 20rpx;
				margin-right: 16rpx;
			}

			.goods_detail {
				margin-right: 34rpx;
				height: 204rpx;
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				position: relative;

				.title_box {
					.title {
						font-size: 30rpx;
						line-height: 42rpx;
						color: #333333;
						text-overflow: -o-ellipsis-lastline;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						margin-bottom: 6rpx;
						text-indent: -10px;
					}

					.specifications {
						// margin-top: 12rpx;
						font-size: 24rpx;
						line-height: 28rpx;
						padding: 2rpx 12rpx;
						padding-top: 6rpx;
						color: #999999;
						background: rgba(247, 243, 241, 1);
						border-radius: 6rpx;
					}
				}

				.price {
					font-family: Akrobat-Regular;
					font-size: 40rpx;
					line-height: 48rpx;
					color: #FE7956;
					.symbol {
						font-size: 24rpx;
						line-height: 34rpx;
					}
					.company{
						font-size: 22rpx;
						line-height: 32rpx;
						color: #999999;
						margin-left: 6rpx;
					}

					.earn {
						font-family: SourceHanSansCN-Regular;
						font-size: 24rpx;
						color: #FF8160;
						line-height: 36rpx;
						margin-left: 12rpx;

						text {
							color: #FE7956;
							margin-left: 4rpx;
							font-family: Akrobat-Regular;
							font-size: 40rpx;
							line-height: 48rpx;
						}
					}
				}

				.number {
					position: absolute;
					bottom: 10rpx;
					right: 0;
				}
			}
		}
	}

	.menu_box {
		width: 100%;
		position: fixed;
		bottom: 95rpx;
		left: 0;
		z-index: 100;
		padding: 18rpx 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 100;

		.label_box {
			margin-left: 34rpx;
			display: flex;
			align-items: center;

			text {
				font-size: 28rpx;
				color: #999999;
				margin-left: 20rpx;
			}
		}

		.settlement_box {
			margin-right: 34rpx;
			color: #FE7956;
			display: flex;
			// align-items: center;
			line-height: 44rpx;

			.settlement_txt {
				display: flex;
				font-size: 32rpx;
				margin-right: 20rpx;

				.symbol {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
					line-height: 28rpx;
					margin-top: 16rpx;
					.price {
						font-size: 40rpx;
						line-height: 40rpx;
					}

					.save {
						font-size: 24rpx;
						line-height: 40rpx;
						color: #FF8160;
					}
				}
			}

			.settlement_btn {
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				line-height: 60rpx;
				width: 166rpx;
				height: 60rpx;
				border-radius: 6rpx;
				color: #FE7956;
				border: 0.3px solid #FE7956;
				font-size: 32rpx;
				padding-top: 4rpx;
				text{
					align-items: center;
				}
			}
		}
	}

	.label {
		width: 44rpx;
		height: 44rpx;
		margin: auto;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}

	.select {
		background-image: url(../../static/images/select.png);
	}

	.unSelect {
		background-image: url(../../static/images/unSelect.png);
	}
</style>
