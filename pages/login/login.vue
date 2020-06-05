<template>
	<view class="page">
		<image class="login_logo" src="../../static/images/login_logo.png" mode=""></image>
		<view class="form_box">
			<clearInput label="+86" tag="phone" :value="phone" maxlength="11" placeholder="请输入手机号码" type="number" @getInputValue="getInputValue"
			 :disabledClear="false" />
			<codeInput labelWidth="190" :phone="this.phone" label="发送验证码" tag="code" :value="code" maxlength="11" placeholder="输入验证码"
			 type="number" @getInputValue="getInputCode" :disabledClear="false" />

		</view>
		<view class="tips">若未创建过添选账号，则自动创建账号</view>
		<view class="btn" @click="loginSubmit">提交</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
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
				weixinData: [],
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			console.log(this.get_user_type())
			this.weixinData = this.get_user_type()
		},
		methods: {
			/* 手机号内容 */
			getInputValue(e) {
				this.phone = e.value
				// console.log(e)

			},
			getInputCode(e) {
				this.code = e.value
			},


			// 提交登录
			loginSubmit() {
				if (this.phone == '' || this.phone == null || this.phone == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号',
						duration: 2000
					});
					return;
				}
				if (!/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.phone)) {
					uni.showToast({
						icon: 'none',
						title: '请输入正确的手机号码',
						duration: 2000
					});
					return;
				}
				if (this.code == '' || this.code == null || this.code == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码',
						duration: 2000
					});
					return;
				}
				var data = {
					mobile: this.phone,
					verify: this.code,
					app_type: 'weixin_web',
					nickname: this.weixinData.nickname,
					avatar: this.weixinData.headimgurl,
					province: this.weixinData.province,
					city: this.weixinData.city,
					gender: this.weixinData.sex,
					referrer: this.weixinData.referrer,
					weixin_web_openid: this.weixinData.weixin_web_openid,
				}
				console.log(data)
				request.post('user/reg', data).then(res => {
					console.log(res)
					if (res.code != 0) {
						uni.showToast({
							title: res.msg,
							duration: 2000,
							icon: none
						});
					} else {
					uni.showToast({
						title: res.msg,
						duration: 2000,
						success() {
							uni.setStorageSync("userinfor",res.data)
							uni.setStorageSync("request_user_token",res.data.token)
							uni.switchTab({
								url: '/pages/index/index'
							});
						}
					});
						
					}
				})
			},

		},
	}
</script>

<style scoped lang="less">
	page {
		background-color: #fff;

		.page {
			border-top: 1rpx solid #DBDBDB;
			padding-top: 56rpx;

			.login_logo {
				display: block;
				margin: 0 auto;
				width: 150rpx;
				height: 152rpx;
				margin-bottom: 72rpx;
			}

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

			.btn {
				color: #FE7956;
				margin: 0 auto;
				width: 679rpx;
				height: 82rpx;
				background: rgba(254, 234, 229, 1);
				border-radius: 12rpx;
				border: 1rpx solid rgba(254, 234, 229, 1);
				font-size: 32rpx;
				line-height: 82rpx;
				text-align: center;
			}
		}
	}
</style>
