(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{1118:function(e,t,i){"use strict";var n,o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"page"},[n("v-uni-image",{staticClass:"login_logo",attrs:{src:i("3276"),mode:""}}),n("v-uni-view",{staticClass:"form_box"},[n("clearInput",{attrs:{label:"+86",tag:"phone",value:e.phone,maxlength:"11",placeholder:"请输入手机号码",type:"number",disabledClear:!1},on:{getInputValue:function(t){arguments[0]=t=e.$handleEvent(t),e.getInputValue.apply(void 0,arguments)}}}),n("codeInput",{attrs:{labelWidth:"190",phone:this.phone,label:"发送验证码",tag:"code",value:e.code,maxlength:"11",placeholder:"输入验证码",type:"number",disabledClear:!1},on:{getInputValue:function(t){arguments[0]=t=e.$handleEvent(t),e.getInputCode.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticClass:"tips"},[e._v("若未创建过添选账号，则自动创建账号")]),n("v-uni-view",{staticClass:"btn",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.loginSubmit.apply(void 0,arguments)}}},[e._v("提交")])],1)},a=[];i.d(t,"b",(function(){return o})),i.d(t,"c",(function(){return a})),i.d(t,"a",(function(){return n}))},3276:function(e,t){e.exports="data:image/png;base64,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"},"32b4":function(e,t,i){"use strict";var n=i("6745"),o=i.n(n);o.a},6745:function(e,t,i){var n=i("f29d");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var o=i("4f06").default;o("96e63a66",n,!0,{sourceMap:!1,shadowMode:!1})},"76db":function(e,t,i){"use strict";i.r(t);var n=i("b3a4"),o=i.n(n);for(var a in n)"default"!==a&&function(e){i.d(t,e,(function(){return n[e]}))}(a);t["default"]=o.a},b3a4:function(e,t,i){"use strict";var n=i("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n(i("45b7")),a=n(i("aa70")),d=n(i("f3d1")),s={components:{clearInput:a.default,codeInput:d.default},data:function(){return{phone:"",code:"",weixinData:[]}},onLoad:function(e){console.log(this.get_user_type()),this.weixinData=this.get_user_type()},methods:{getInputValue:function(e){this.phone=e.value},getInputCode:function(e){this.code=e.value},loginSubmit:function(){if(""!=this.phone&&null!=this.phone&&void 0!=this.phone)if(/(^1[3|4|5|7|8][0-9]{9}$)/.test(this.phone))if(""!=this.code&&null!=this.code&&void 0!=this.code){var e={mobile:this.phone,verify:this.code,app_type:"weixin_web",nickname:this.weixinData.nickname,avatar:this.weixinData.headimgurl,province:this.weixinData.province,city:this.weixinData.city,gender:this.weixinData.sex,referrer:this.weixinData.referrer,weixin_web_openid:this.weixinData.weixin_web_openid};console.log(e),o.default.post("user/reg",e).then((function(e){console.log(e),0!=e.code?uni.showToast({title:e.msg,duration:2e3,icon:none}):uni.showToast({title:e.msg,duration:2e3,success:function(){uni.setStorageSync("userinfor",e.data),uni.setStorageSync("request_user_token",e.data.token),uni.switchTab({url:"/pages/index/index"})}})}))}else uni.showToast({icon:"none",title:"请输入验证码",duration:2e3});else uni.showToast({icon:"none",title:"请输入正确的手机号码",duration:2e3});else uni.showToast({icon:"none",title:"请输入手机号",duration:2e3})}}};t.default=s},c745:function(e,t,i){"use strict";i.r(t);var n=i("1118"),o=i("76db");for(var a in o)"default"!==a&&function(e){i.d(t,e,(function(){return o[e]}))}(a);i("32b4");var d,s=i("f0c5"),r=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,"3044e396",null,!1,n["a"],d);t["default"]=r.exports},f29d:function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,"uni-page-body[data-v-3044e396]{background-color:#fff}uni-page-body .page[data-v-3044e396]{border-top:%?1?% solid #dbdbdb;padding-top:%?56?%}uni-page-body .page .login_logo[data-v-3044e396]{display:block;margin:0 auto;width:%?150?%;height:%?152?%;margin-bottom:%?72?%}uni-page-body .page .form_box[data-v-3044e396]{margin-bottom:%?20?%}uni-page-body .page .tips[data-v-3044e396]{font-size:%?22?%;line-height:%?34?%;color:#aeaeae;margin-bottom:%?32?%;padding-left:%?36?%}uni-page-body .page .btn[data-v-3044e396]{color:#fe7956;margin:0 auto;width:%?679?%;height:%?82?%;background:#feeae5;border-radius:%?12?%;border:%?1?% solid #feeae5;font-size:%?32?%;line-height:%?82?%;text-align:center}body.?%PAGE?%[data-v-3044e396]{background-color:#fff}",""]),e.exports=t}}]);