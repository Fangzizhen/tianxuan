<template>
	<view class="page">
		<view class="uni-form-item uni-column">
			<view class="title">持卡人</view>
			<input class="uni-input" placeholder-class="placeholder" placeholder="请输入银行预留姓名" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">手机号</view>
			<input class="uni-input" v-model="telphone" placeholder-class="placeholder" type="number" placeholder="请输入银行预留手机号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">身份证号</view>
			<input class="uni-input" placeholder-class="placeholder" type="number" placeholder="请输入银行预留身份证号" />
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">卡号</view>
			<input class="uni-input" placeholder-class="placeholder" type="number" placeholder="请输入银行卡号" />
		</view>
		<view class="btn" @click="open" >提交</view>
		<uni-popup ref="popup" type="bottom">
			<div class="conversation">
				<h3>授权通知</h3>
				<ul>
					<li>1.为了资金安全，一个添选账户只能添加同一身份下的银行卡。</li>
					<li>2.如需添加其他持卡人的银行卡，需要更换持卡人。</li>
					<li>3.更换持卡人后，原持卡人的信息将被清空，后续仅能添加新持卡人的银行卡。</li>
				</ul>
				<view class="btn" @click="close">提交</view>
			</div>
		</uni-popup>

	</view>
</template>

<script>
	import uniPopup from '../../components/uni-popup/uni-popup.vue'
	export default {
		components: {
			uniPopup,
		},
		data() {
			return {
				telphone: ''
			}
		},
		created() {

		},
		methods: {
			open() {
				this.$refs.popup.open()
			},
			close() {
				uni.navigateTo({
					url: 'telphoneCode?telphone=' + this.telphone
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.page {
		uni-page-wrapper {
			height: 654rpx;
		}
	}

	.conversation {
		width: 100%;
		height: 654rpx;
		background: #FFFFFF;
		border-top-right-radius: 20rpx;
		border-top-left-radius: 20rpx;

		h3 {
			height: 116rpx;
			text-align: center;
			line-height: 116rpx;
			font-size: 30rpx;
			color: #000;
		}

		ul {
			padding: 0 48rpx;
			font-size: 28rpx;
			margin-bottom: 30rpx;

			li {
				line-height: 50rpx;
				margin-bottom: 30rpx;
			}
		}
	}

	.uni-form-item {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		height: 114rpx;
		width: 100%;
		background-color: #FFFFFF;
		border-bottom: 1px #DBDBDB solid;

		.title {
			width: 150rpx;
			text-align: center;
			font-size: 28rpx;
			color: #AEAEAE;
			margin: 0 10rpx;
		}

		.uni-input {
			height: 114rpx;
			line-height: 114rpx;
			align-items: center;
			font-size: 28rpx;
			color: #333333;
		}

		.placeholder {
			font-size: 28rpx;
			color: #AEAEAE;
		}
	}

	.btn {
		width: 700rpx;
		height: 82rpx;
		line-height: 82rpx;
		background: #FEEAE5;
		color: #FE7956;
		margin: 100rpx auto;
		text-align: center;
	}
</style>
