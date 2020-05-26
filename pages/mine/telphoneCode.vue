<template>
	<view class="page">
		<view class="form_box">
			<clearInput label="+86" tag="phone" :value="phone" maxlength="11" placeholder="请输入手机号码" type="number" @getInputValue="getInputValue"
			 :disabledClear="false" />
			<codeInput labelWidth="190" :phone="this.phone" label="发送验证码" tag="code" :value="code" maxlength="11" placeholder="输入验证码"
			 type="number" @getInputValue="getInputCode" :disabledClear="false" />
		</view>
		<view class="phone_tips" v-if="phone != ''">
			<image src="../../static/images/icon-code.png" mode=""></image>
			短信验证码已发送至手机  <text class="num">{{phone}}</text>  ，请注意查收
		</view>
		<view class="btn" @click="commit" >提交</view>
	</view>
</template>

<script>
	import clearInput from '@/components/clear-input/clear-input.vue'
	import codeInput from '@/components/clear-input/code-input.vue'
	export default {
		components: {
			clearInput,
			codeInput
		},
		data() {
			return {
				phone: "",
				code: "",
				loginRes: "",
				flag: ''
			}
		},
		onLoad(option) {
			console.log(option)
			this.phone = option.telphone;
			this.flag = option.flag;
		},
		methods: {
			/* 手机号内容 */
			getInputValue(e) {
				this.phone = e.value
				// console.log(e)
			},
			getInputCode(e) {
				console.log(e)
			},
			commit() {
				uni.navigateTo({
					url:"cardTips"
				})
				// if (this.flag == 1) {
				// 	uni.navigateTo({
				// 		url: "/pages/mine/payPassword/payPassword"
				// 	})
				// } else if (this.flag == 2) {
				// 	uni.navigateTo({
				// 		url: "/pages/mine/pwdRetrieval/pwdRetrieval"
				// 	})
				// }
			}
		}
	}
</script>

<style scoped lang="less">
	.form_box {
		margin-bottom: 20rpx;
	}

	.tips {
		font-size: 22rpx;
		line-height: 34rpx;
		color: #AEAEAE;
		margin-bottom: 32rpx;
		padding-left: 36rpx;
	}

	.phone_tips {
		display: flex;
		align-items: center;
		margin-left: 36rpx;
		font-size: 22rpx;
		line-height: 34rpx;
		text{
			font-size: 30rpx;
			line-height: 32rpx;
			color: #FE7956;
		}
		image {
			width: 32rpx;
			height: 32rpx;
			margin-right: 10rpx;
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
		margin-top: 50rpx;
	}
</style>
