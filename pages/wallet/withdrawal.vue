<template>
	<view class="content">
		<view class="card">
			<image src="../../static/images/login_logo.png" mode=""></image>
			<view class="card_txt">
				<text>招商银行</text>
				<view>尾号1234储蓄卡</view>
			</view>
		</view>
		<view class="withdrawal_box">
			<view class="withdrawal_title">提现金额</view>
			<view class="withdrawal_input_box">
				<text class="num">￥</text>
				<input class="num" type="number" v-model="money" />
				<view @click="allMoney">全部</view>
			</view>
			<view class="withdrawal_allow" v-if="is_out">可提现金额 <text class="num">{{pool}}</text> 元</view>
			<view class="withdrawal_allow_out" v-else>输入金额超过可提现金额，账户余额 <text class="num">{{pool}}</text> 元</view>
		</view>
		<view class="withdrawal_btn" :class="is_out? 'withdrawal_btn_active':''" @click="open">提现</view>
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<uni-nav-bar class="popup_title" left-icon="back" title="收费提示" @clickLeft="close"></uni-nav-bar>
				<view class="popup_txt">
					<view class="popup_name">提现金额</view>
					<view class="popup_val"><text class="num">{{this.$api.cutOutNum(money)}}</text> 元</view>
				</view>
				<view class="popup_txt">
					<view class="popup_name">本次服务费</view>
					<view class="popup_val"><text class="num">0.00</text> 元</view>
				</view>
				<view class="popup_btn" @click="openPasword">继续提现</view>
			</view>
		</uni-popup>
		<view class="model" v-if="show_key">
			<pay-keyboard :show_key="show_key" @hideFun="hideFun" @getPassword="getPassword" @changePassword="changePassword"></pay-keyboard>
		</view>

	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue"
	import payKeyboard from '../../components/keyboard/keyboard.vue'
	export default {
		components: {
			uniPopup,
			uniNavBar,
			payKeyboard
		},
		data() {
			return {
				pool: 200,
				money: '',
				is_out: true,
				show_key: false, //输入密码框开关
			};
		},
		watch: {
			money(val) {

				if (val > this.pool) {
					this.is_out = false
				} else {
					this.is_out = true
				}
			}
		},
		methods: {
			allMoney() {
				this.money = this.pool
			},
			open() {
				if (this.money == undefined || this.money == 0 || this.money == '' || this.money == null) {
					this.$api.msg('请输入提现金额');
					return;
				}
				this.$refs.popup.open()

			},
			close() {
				this.$refs.popup.close()
			},
			openPasword() {
				this.$refs.popup.close();
				this.show_key = true
			},
			hideFun() {
				this.show_key = false
			},
			getPassword(n) {
				var that = this
				console.log("用户输入的密码", n)

				// 需要请求验证密码判断，这里用111判断，少了请求
				if (n.password == '111111') {
					console.log("密码正确")
					uni.navigateTo({
						url:"extractSuccess"
					})
					that.show_key = false
				} else {
					that.show_key = false
					uni.showModal({
						content: "密码错误",
						success: function(res) {
							if (res.confirm) {
								console.log('用户点击确定');
								that.show_key = true
							} else if (res.cancel) {
								that.show_key = true
								console.log('用户点击取消');
							}
						}
					});
				}


			},
			changePassword() {
				console.log(1111)
			}
			// 
			// stringTonum(val){

			// }
		},
	}
</script>

<style scoped lang="less">
	.txt {
		font-family: SourceHanSansCN-Regular;
	}

	.num {
		font-family: Akrobat-Regular;
	}

	.content {
		.card {
			margin: 24rpx 0;
			background-color: #FFFFFF;
			display: flex;
			align-items: center;
			height: 128rpx;
			padding-left: 36rpx;

			image {
				width: 81rpx;
				height: 81rpx;
				margin-right: 16rpx;
			}

			.card_txt {
				text {
					font-size: 28rpx;
					line-height: 40rpx;
				}

				view {
					font-size: 24rpx;
					line-height: 34rpx;
					color: #AEAEAE;
				}
			}
		}

		.withdrawal_box {
			padding: 28rpx 0 16rpx 0;
			background-color: #FFFFFF;
			margin-bottom: 78rpx;

			.withdrawal_title {
				font-size: 28rpx;
				line-height: 40rpx;
				margin-bottom: 82rpx;
				color: #333333;
				padding-left: 36rpx;
			}

			.withdrawal_input_box {
				display: flex;
				align-items: center;
				padding: 0 38rpx 44rpx 30rpx;
				border-bottom: 1rpx #DBDBDB solid;
				margin-bottom: 18rpx;
				color: #FE7956;

				text {
					font-size: 60rpx;
					line-height: 74rpx;
				}

				input {
					flex: 1;
					font-size: 60rpx;
					line-height: 74rpx;
					height: 74rpx;
				}

				view {
					font-size: 24rpx;
					line-height: 44rpx;
				}
			}

			.withdrawal_allow {
				padding-left: 36rpx;
				color: #AEAEAE;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				line-height: 30rpx;

				text {
					font-size: 28rpx;
					line-height: 34rpx;
				}
			}

			.withdrawal_allow_out {
				padding-left: 36rpx;
				color: #ff1e0f;
				display: flex;
				align-items: center;
				font-size: 24rpx;
				line-height: 30rpx;

				text {
					font-size: 28rpx;
					line-height: 34rpx;
				}
			}

		}

		.withdrawal_btn {
			width: 679rpx;
			height: 82rpx;
			background: rgba(245, 238, 236, 1);
			color: #FFFFFF;
			border-radius: 12rpx;
			text-align: center;
			display: block;
			margin: 0 auto;
			font-size: 32rpx;
			line-height: 82rpx;
		}

		.withdrawal_btn_active {
			background: #FEEAE5;
			color: #FE7956;
		}

		.popup_box {
			// width:750px;
			height:465rpx;
			background: #FFFFFF;
			border-radius: 24px 24px 0px 0px;
			overflow: hidden;

			.popup_title {
				margin-bottom: 50rpx;
			}

			.popup_txt {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 0 36rpx;
				font-size: 30rpx;
				line-height: 42rpx;
				color: #AEAEAE;
				margin: 26rpx 0;
			}

			.popup_btn {
				width: 679rpx;
				height: 82rpx;
				background: #FEEAE5;
				color: #FE7956;
				border-radius: 12rpx;
				text-align: center;
				display: block;
				margin: 0 auto;
				margin-top: 96rpx;
				font-size: 32rpx;
				line-height: 82rpx;
			}
		}

		.model {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.4);
		}
	}
</style>
