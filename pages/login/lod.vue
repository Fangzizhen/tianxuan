<template>
	<view class="content">
		<image class="login_logo" src="../../static/images/login_logo.png" mode=""></image>
		<view class="text">让选择变得简单</view>
	</view>
</template>

<script>
	import request from '../../common/request.js';
	export default {
		data() {
			return {

			}
		},
		onLoad(option) {
			// if (!this.$api.isWeiXin()) return
			console.log(option)
			this.getCode(option.code)
			// this.code = option.code;
		},
		methods: {
			//获取微信授权
			getCode(code) { // 非静默授权，第一次有弹框

				

			var weixinData =	{
					"id": "1",
					"username": "",
					"nickname": "方梓臻",
					"mobile": "17753407577",
					"email": "",
					"avatar": "http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTJyDaCHeNKscD0icHCSibUIaf1zJ7kwBueLCgN6mKzh9qCCfWacSC3mRYx6KEA7RRfx6CKmg1mfaaoA\/132",
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
					"plugins_distribution_level": "1",
					"add_time_text": "2020-06-03 10:41:57",
					"mobile_security": "177***577",
					"email_security": "",
					"user_name_view": "方梓臻",
					"is_mandatory_bind_mobile": 0,
					"token": "f61d30234299474eeced873e2f02160a",
					"is_user_exist": 1
				}
				uni.setStorageSync("userinfor", weixinData)
				uni.setStorageSync("request_user_token", weixinData.token)
				uni.navigateBack({
					delta: 2
				});

					// if (code == 0 || code == '' || code == null || code == undefined) {
					// 	let appid = 'wx36a4ad82bc2c8ec3';
					// 	let uri = encodeURIComponent(window.location.href); // 这里务必编码
					// 	let scope = 'snsapi_userinfo'; // 获取用户信息
					// 	window.location.href =
					// 		`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;
					// } else {
					// 	this.getUserInfo(code) //把code传给后台获取用户信息
					// }
			},
			// 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
			getUserInfo(code) {
				var data = {
					authcode: code
				}
				request.post('user/WechatPublicAccessToken', data).then(res => {
					console.log(res)
					if (res.code == 0) {
						// this.wechatInfor = res.data
						uni.setStorageSync("userinfor", res.data)
						uni.setStorageSync("request_user_token", res.data.token)
						uni.switchTab({
							url: '/pages/index/index'
						});
					}
				})
			}
		}
	}
</script>

<style scoped>
	page {
		background-color: #FFFFFF;
	}

	.content {
		border-top: 1rpx solid #DBDBDB;
		text-align: center;
		color: #FE7956;
		font-size: 28rpx;
		line-height: 34rpx;
	}

	image {
		width: 180rpx;
		height: 180rpx;
		display: block;
		margin: 0 auto;
		margin-top: 300rpx;
		margin-bottom: 30rpx;
	}
</style>
