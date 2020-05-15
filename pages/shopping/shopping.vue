<template>
	<view class="page">
		<!-- 列表 -->
		<uni-swipe-action class="goods_list">
			<uni-swipe-action-item :options="options" class="goods" v-for="(item,index) in cartList" :key="item.id">
				<view class="label " :class="item.checked ? 'select' : 'unSelect'" @click="check('item', index)"></view>
				<image class="img" :src="item.image"></image>
				<view class="goods_detail">
					<view class="title_box">
						<view class="title">{{item.title}}</view>
						<text class="specifications">{{item.attr_val}}</text>
					</view>
					<text class="price"><text class="symbol">￥</text>{{item.price}}<text class="earn">/省<text>{{item.save}}</text></text></text>
					<uni-number-box class="number" :min="1" :max="item.stock" :value="item.number>item.stock?item.stock:item.number"
					 :isMax="item.number>=item.stock?true:false" :isMin="item.number===1" :index="index" @change="numberChange($event, index)"></uni-number-box>
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
				<view class="settlement_txt">合计:<view class="symbol">￥<text class="price">{{total}}</text><text class="save">（省{{saveMoney}}）</text></view>
				</view>
				<view class="settlement_btn">结算( {{totalNum}} )</view>
			</view>
		</view>
	</view>
</template>

<script>
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
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#FE7956'
					}
				}],
				total: 0, //总价格
				saveMoney:0,//节省钱
				totalNum:0,//总件数
				allChecked: false, //全选状态  true|false
				cartList: [{
						attr_val: "春装款 L",
						checked: false,
						id: 1,
						image: "http://ttianxuan.local/static/upload/images/goods/2019/01/14/1547453895416529.jpg",
						loaded: "loaded",
						number: 1,
						price: 278,
						stock: 15,
						title: "OVBE 长袖风衣",
						save:12,
					},
					{
						attr_val: "春装款 L",
						checked: false,
						id: 2,
						image: "http://ttianxuan.local/static/upload/images/goods/2019/01/14/1547453895416529.jpg",
						loaded: "loaded",
						number: 1,
						price: 278,
						stock: 15,
						title: "OVBE 长袖风衣",
						save:12,
					}
				]
			}
		},
		methods: {
			onClick(e) {
				console.log('当前点击的是第' + e.index + '个按钮，点击内容是' + e.content.text)
			},
			change(open) {
				console.log('当前开启状态：' + open)
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
				this.cartList[index].number = $event;
				this.calcTotal();
			},
			//计算总价
			calcTotal() {
				let list = this.cartList;
				// if(list.length === 0){
				// 	this.empty = true;
				// 	return;
				// }
				let total = 0;
				let totalNum = 0;
				let saveMoney = 0;
				let checked = true;
				list.forEach(item => {
					if (item.checked === true) {
						total += item.price * item.number;
						totalNum += item.number * 1;
						saveMoney += item.save * item.number;
					} else if (checked === true) {
						checked = false;
					}
				})
				this.allChecked = checked;
				this.total = Number(total.toFixed(2));
				this.totalNum =totalNum
				this.saveMoney =saveMoney
			}
		}
	}
</script>

<style lang="less">
	.page {
		width: 100%;
		height: 100%;
	}

	.goods_list {
		background-color: #fff;
		margin-top: 18rpx;

		.goods {
			height: 254rpx;
			display: flex;
			align-items: center;
			.label{
				margin-left: 34rpx;
			}
			.img {
				width: 144rpx;
				height: 176rpx;
				background-color: #4CD964;
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
					}

					.specifications {
						font-size: 20rpx;
						line-height: 28rpx;
						padding: 2rpx 12rpx;
						color: #999999;
						background: rgba(247, 243, 241, 1);
						border-radius: 6rpx;
						border: 1rpx solid rgba(216, 216, 216, 1);
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

					.earn {
						font-family: SourceHanSansCN-Regular;
						font-size: 24rpx;
						color: #999999;
						line-height: 36rpx;
						margin-left: 6rpx;

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
		position: absolute;
		bottom: 20rpx;
		left: 0;
		z-index: 100;
		padding: 12rpx 0;
		background-color: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;

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
				align-items: center;
				font-size: 32rpx;
				margin-right: 20rpx;

				.symbol {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
					line-height: 34rpx;

					.price {
						font-size: 40rpx;
						line-height: 48rpx;
					}
					.save{
						font-size: 24rpx;
						line-height: 34rpx;
					}
				}
			}

			.settlement_btn {
				text-align: center;
				line-height: 60rpx;
				width: 166rpx;
				height: 60rpx;
				border-radius: 6rpx;
				color: #FE7956;
				border: 1px solid #FE7956;
				font-size: 32rpx;
			}
		}
	}

	.label {
		width: 56rpx;
		height: 56rpx;
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
