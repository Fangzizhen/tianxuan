<template>
	<view class="page">
		<image class="login_logo" src="../../static/images/login_logo.png" mode=""></image>
		<view class="form_box">
			<clearInput 
			        label="+86"
			        tag="phone"
			        :value="phone"
			        maxlength="11"
			        placeholder="请输入手机号码"
			        type="number"
			        @getInputValue="getInputValue"
							:disabledClear="false"
			    />
					<codeInput
									labelWidth="190"
									:phone="this.phone"
					        label="发送验证码"
					        tag="code"
					        :value="code"
					        maxlength="11"
					        placeholder="输入验证码"
					        type="number"
					        @getInputValue="getInputCode"
									:disabledClear="false"
					    />
					
		</view>
		<view class="tips">若未创建过添选账号，则自动创建账号</view>
		<view class="btn">提交</view>
		<button type="default" open-type="getUserInfo" @click="getUserinfor">登录</button>
		{{loginRes}}
	</view>
</template>

<script>
	var jweixin = require('../../components/jweixin-sdk/index.js');
	import request from '../../common/request.js'
	import clearInput from '@/components/clear-input/clear-input.vue'
	import codeInput from '@/components/clear-input/code-input.vue'
	export default{
		components: {
			clearInput,
			codeInput
		},
		data() {
			return {
			phone:"",
			code:"",
			loginRes:""
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
		methods:{
			/* 手机号内容 */
			 getInputValue(e) {
				 this.phone = e.value
				// console.log(e)
			},
			getInputCode(e){
				console.log(e)
			},
			getUserinfor(){
				uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes);
				    // // 获取用户信息
				    // uni.getUserInfo({
				    //   provider: 'weixin',
				    //   success: function (infoRes) {
				    //     console.log('用户昵称为：' + infoRes.userInfo.nickName);
				    //   }
				    // });
				  }
				});
			}
		},
	}
</script>

<style lang="less">
	page{
		background-color: #fff;
		.page{
			border-top: 1rpx solid #DBDBDB;
			padding-top: 56rpx;
			.login_logo{
				display: block;
				margin: 0 auto;
				width: 150rpx;
				height: 152rpx;
				margin-bottom: 72rpx;
			}
			.form_box{
				margin-bottom: 20rpx;
			}
			.tips{
				font-size: 22rpx;
				line-height: 34rpx;
				color: #AEAEAE;
				margin-bottom: 32rpx;
				padding-left: 36rpx;
			}
			.btn{
				color: #FE7956;
				margin: 0 auto;
				width:679rpx;
				height:82rpx;
				background:rgba(254,234,229,1);
				border-radius:12rpx;
				border:1rpx solid rgba(254,234,229,1);
				font-size: 32rpx;
				line-height: 82rpx;
				text-align: center;
			}
		}
	}
</style>
