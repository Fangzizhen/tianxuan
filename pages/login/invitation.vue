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
				notecode: "",
				weixinData: [],
			}
		},
		onLoad: function(option) { //option 为上一页面跳转携带的参数
			// console.log(this.get_user_type())
			// this.weixinData = this.get_user_type()
			console.log(option)
			this.getCode(option.code)
		},
		methods: {
			
			//获取微信授权
			getCode(code) { // 非静默授权，第一次有弹框
			
				var weixinData ={
					"id": "1",
					"username": "",
					"nickname": "方梓臻",
					"mobile": "17753407577",
					"email": "",
					"avatar": "http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyDaCHeNKscD0icHCSibUIaf1zJ7kwBueLCgN6mKzh9qCCfWacSC3mRYx6KEA7RRfx6CKmg1mfaaoA/132",
					"alipay_openid": "",
					"weixin_openid": "",
					"weixin_unionid": "oPXb_v1xJHWDtxr5xO2yF49Ghcg8",
					"weixin_web_openid": "o0k3RvuEzymOQf_96ZJVryFm2WM0",
					"baidu_openid": "",
					"toutiao_openid": "",
					"qq_openid": "",
					"qq_unionid": "",
					"integral": "0",
					"locking_integral": "0",
					"referrer": "0",
					"add_time": "1591152117",
					"affiliation_id": "1",
					"track_code": null,
					"plugins_distribution_level": "0",
					"add_time_text": "2020-06-03 10:41:57",
					"mobile_security": "177***577",
					"email_security": "",
					"user_name_view": "方梓臻",
					"is_mandatory_bind_mobile": 0,
					"token": "12231c6928f3a48bc37b08965abf0f95"
				}
				uni.setStorageSync("userinfor", weixinData)
				uni.setStorageSync("request_user_token", weixinData.token)
				uni.navigateBack({
					delta: 2
				});
			
			
			
			
			// 	if (code == 0 || code == '' || code == null || code == undefined) {
			// 		let appid = 'wx36a4ad82bc2c8ec3';
			// 		let uri = encodeURIComponent(window.location.href); // 这里务必编码
			// 		let scope = 'snsapi_userinfo'; // 获取用户信息
			// 		window.location.href =
			// 			`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;
			// 	} else {
			// 		this.getUserInfo(code) //把code传给后台获取用户信息
			// 	}
			},
			
			
			// 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
			getUserInfo(code) {
				var data = {
					authcode: code
				}
				request.post('user/WechatPublicAccessToken', data).then(res => {
					console.log(res)
					if (res.code == 0) {
						this.weixinData = res.data
						// uni.setStorageSync("userinfor", res.data)
						// uni.setStorageSync("request_user_token", res.data.token)
						// uni.switchTab({
						// 	url: '/pages/index/index'
						// });
					}
				})
			}
			
			
			
			
			
			
			
			/* 手机号内容 */
			getInputValue(e) {
				this.phone = e.value
				// console.log(e)

			},
			getInputCode(e) {
				this.notecode = e.value
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
				if (this.notecode == '' || this.notecode == null || this.notecode == undefined) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码',
						duration: 2000
					});
					return;
				}
				var data = {
					mobile: this.phone,
					verify: this.notecode,
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
						return
					} else {
					uni.showToast({
						title: res.msg,
						duration: 2000,
						success() {
							uni.setStorageSync("userinfor",res.data)
							uni.setStorageSync("request_user_token",res.data.token)
							uni.showToast({
								title: '绑定成功',
								duration: 2000,
								icon: "none",
								complete() {
									uni.switchTab({
										url: '/pages/index/index'
									});
								}
							});
						}
					});
					}
				})




				// var data = {
				// 	id: "6",
				// 	username: "",
				// 	nickname: "方梓臻",
				// 	mobile: "17753407577",
				// 	email: "",
				// 	avatar: "http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/VI29mR8C51j2s9ht3ZOfp7FBibfc2fP0oBPKEwcGMtJCU7e1ibDmW0yC8sGFcpPpvohP34OmKOYibzK8QMI2fufNw\/132",
				// 	alipay_openid: "",
				// 	weixin_openid: "",
				// 	weixin_unionid: "",
				// 	weixin_web_openid: "o0k3RvuEzymOQf_96ZJVryFm2WM0",
				// 	baidu_openid: "",
				// 	toutiao_openid: "",
				// 	qq_openid: "",
				// 	qq_unionid: "",
				// 	integral: "0",
				// 	locking_integral: "0",
				// 	referrer: "0",
				// 	add_time: "1590629166",
				// 	affiliation_id: "1",
				// 	track_code: null,
				// 	plugins_distribution_level: "0",
				// 	add_time_text: "2020-05-28 09:26:06",
				// 	mobile_security: "177***577",
				// 	email_security: "",
				// 	user_name_view: "方梓臻",
				// 	is_mandatory_bind_mobile: 1,
				// 	token: "86335aa582a51e661c012699b165453a"
				// }

				// uni.setStorageSync("userinfor", data)
				// uni.setStorageSync("request_user_token", data.token)
				// uni.showToast({
				// 	title: '绑定成功',
				// 	duration: 2000,
				// 	icon: "none",
				// 	complete() {
				// 		uni.switchTab({
				// 			url: '/pages/index/index'
				// 		});
				// 	}
				// });



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
