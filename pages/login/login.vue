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
		<view class="btn">提交</view>
		<!-- <button type="default" open-type="getUserInfo">登录</button> -->
		{{loginRes}}
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
				loginRes: ""
			}
		},
		onReady() {
			// 判断是否是微信浏览器打开
			var isWeixin = this.$api.isWeiXin()
			// if(isWeixin){
			// var data = {authcode: '023KUJhW1mQ6G01M7klW1g60iW1KUJh6'};
			// request.post('user/wechatuserauth', data).then(res => {
			// 	console.log(res.data)
			// 	// this.chooseGoods(res.data[0].id)
			// })
			// }
		},
		
		onLoad: function(option) { //option 为上一页面跳转携带的参数
		console.log(option)
			// this.getDetail(option.code)
			this.getCode(option.code)
			this.code = option.code;
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



			getCode(code) { // 非静默授权，第一次有弹框
				let appid = 'wx36a4ad82bc2c8ec3';
				// const code = this.getUrlParam('code') // 截取路径中的code，如果没有就去微信授权，如果已经获取到了就直接传code给后台获取openId
				let local = getCurrentPages()
				let curRoute = "https://m.ttianxuan.com/"+local[local.length - 1].route
				console.log(encodeURIComponent(curRoute))
				if (code == null || code === '') {
				let appid = 'wx36a4ad82bc2c8ec3';
				let uri = encodeURIComponent(window.location.href); // 这里务必编码
				let scope = 'snsapi_userinfo'; // 获取用户信息
				// let scope = 'snsapi_base'; // 静默授权，仅可获取openid
				window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${uri}&response_type=code&scope=${scope}&state=123#wechat_redirect`;
				} else {
					this.getUserInfo(code) //把code传给后台获取用户信息
				}
			},
			getUserInfo(code) { // 通过code获取 openId等用户信息，/api/user/wechat/login 为后台接口
				var data  = {
					authcode :code
				}
				request.post('user/WechatPublicAccessToken', data).then(res => {
					console.log(res)
					// this.chooseGoods(res.data[0].id)
				})
			}







			// getUserinfor() {

			// 	let appid = 'wx36a4ad82bc2c8ec3';
			// 	let code = this.getUrlParam('code')
			// 	this.code = code;
			// 	let redirect_uri = window.location.href // 授权登录成功回调的地址，一般为当前页
			// 	// 授权操作是直接访问腾讯开放平台的一个授权地址，授权成功后会回调
			// 	if (code == null || code == "") {
			// 		window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + appid + '&redirect_uri=' +
			// 			encodeURIComponent(local) + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect' //引导用户授权
			// 	}

			// },
			// getUrlParam(name) {
			// 	var reg = new RegExp('(^|&)' + name + '=([^&]*) (&|$)')
			// 	var r = window.location.search.substr(1).match(reg);
			// 	if (r != null) return unescape(r[2])
			// 	return null
			// }
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
