(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-logisticsDetail"],{2286:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.page[data-v-e160877a]{height:100vh;height:calc(100vh - 44px);font-size:%?24?%;background-color:#f6f7f8;overflow-y:auto}\r\n/*flex 转换成flex容器*/.flex[data-v-e160877a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row}\r\n/*flex1 自动填充*/.flex1[data-v-e160877a]{-webkit-box-flex:1;-webkit-flex:1;flex:1}\r\n/*ali-c 竖直居中*/.ali-c[data-v-e160877a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.bgf[data-v-e160877a]{background-color:#fff}.express[data-v-e160877a]{background-color:#fff;border-radius:%?20?%;margin:%?30?% %?20?% %?30?% %?20?%}.express .top[data-v-e160877a]{padding:%?28?% %?29?% %?25?% %?29?%}.express .top .img[data-v-e160877a]{display:block;width:%?88?%;height:%?88?%;border-radius:50%}.express .top .text[data-v-e160877a]{margin-left:%?20?%}.express .top .text .text1[data-v-e160877a]{margin-bottom:%?6?%;font-size:%?28?%;color:#000}.express .top .text .text2[data-v-e160877a]{font-size:%?20?%;color:#000}.express .right[data-v-e160877a]{background-color:rgba(8,175,254,.02);border-radius:%?0?% %?0?% %?20?% %?20?%;padding:%?15?% %?30?% %?20?% %?30?%}.express .right .text[data-v-e160877a]{color:#666;font-size:%?22?%}.content[data-v-e160877a]{margin:%?20?%;padding:%?56?% %?46?% %?56?% %?5?%;border-radius:%?20?%}.content .list:first-child .info[data-v-e160877a]::before{bottom:%?-20?%;margin-top:%?40?%;border-left:1px dashed #e5e5e5}.content .list:first-child .title[data-v-e160877a]{margin-bottom:%?56?%}.content .list:first-child .title[data-v-e160877a]::before{width:%?46?%;height:%?46?%;left:%?-23?%;background:url("data:image/png;base64,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") no-repeat 50%;background-size:%?46?% %?46?%}.content .list:last-child .info[data-v-e160877a]::before{height:%?32?%}.content .list.one .info[data-v-e160877a]::before{margin-top:%?20?%}.content .list.one .title[data-v-e160877a]{color:#1a1a1a}.content .list.one .title[data-v-e160877a]::before{width:%?46?%;height:%?46?%;left:%?-23?%;background:url("data:image/png;base64,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") no-repeat 50%;background-size:%?46?% %?46?%}.content .list.one .text[data-v-e160877a]{color:#666}.content .list.one .time[data-v-e160877a]{color:#333}.content .list.one .time .day[data-v-e160877a]{font-size:%?24?%}.content .time[data-v-e160877a]{width:%?200?%;padding-right:%?30?%;font-size:%?20?%;text-align:right;color:#999}.content .time .day[data-v-e160877a]{margin-bottom:%?4?%}.content .info[data-v-e160877a]{position:relative;padding-top:%?12?%;color:#999}.content .info[data-v-e160877a]::before{content:"";position:absolute;left:0;top:0;bottom:0;z-index:1;width:0;border-left:1px solid #e5e5e5}.content .info .title[data-v-e160877a]{position:relative;margin-bottom:%?10?%;padding-left:%?32?%;font-size:%?28?%}.content .info .title[data-v-e160877a]::before{content:"";position:absolute;left:-3px;top:0;bottom:0;z-index:1;width:7px;height:7px;margin:auto 0;border-radius:50%;background-color:#cecece}.content .info .title.address[data-v-e160877a]{font-size:%?24?%;color:#333}.content .info .text[data-v-e160877a]{padding:0 0 %?44?% %?32?%}',""]),t.exports=e},"2b41":function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"content"},[n("logistics",{attrs:{wlInfo:t.wlInfo}})],1)},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},"37fe":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={props:{wlInfo:{type:Object,default:function(){return{}}}},data:function(){return{delivery_status:""}},mounted:function(){console.log(this.wlInfo.delivery_status,9999),"该物流已被签收"==this.wlInfo.delivery_status&&(this.delivery_status=1)},methods:{}};e.default=i},"3e0b":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,".content[data-v-405f4c3e]{border-top:%?1?% solid #dbdbdb}",""]),t.exports=e},"45b7":function(t,e,n){n("d3b7");var i="https://api.ttianxuan.com/";function a(t,e){var n=new Promise((function(n,a){if(""==e||void 0==e||null==e)var o={},r=JSON.stringify(o);else r=JSON.stringify(e);var s="",c="",l=uni.getStorageSync("request_user_token");c=""==l||null==l||void 0==l?"":l,uni.request({url:i+"index.php?s=/api/"+t+s+"&application=app&application_client_type=weixin&token="+c+"&ajax=ajax",data:r,method:"POST",header:{"content-type":"application/json; charset=utf-8"},success:function(t){uni.showLoading({title:"加载中..."}),200==t.statusCode?(n(t.data),uni.hideLoading()):n(t.data.msg)},error:function(t){a("网络出错"),uni.hideLoading()}})}));return n}function o(t,e){var n=new Promise((function(n,a){var o=e;uni.request({url:i+t,data:o,method:"GET",dataType:"json",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){t.statusCode,n(t.data)},error:function(t){a("网络出错")}})}));return n}t.exports={post:a,get:o}},"54a1":function(t,e,n){"use strict";var i=n("ae58"),a=n.n(i);a.a},"5efc":function(t,e,n){"use strict";n.r(e);var i=n("c46c"),a=n("fef3");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("a808");var r,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"e160877a",null,!1,i["a"],r);e["default"]=c.exports},9035:function(t,e,n){"use strict";n.r(e);var i=n("fa15"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},a808:function(t,e,n){"use strict";var i=n("d0e7"),a=n.n(i);a.a},ae58:function(t,e,n){var i=n("3e0b");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("d4b363ce",i,!0,{sourceMap:!1,shadowMode:!1})},c46c:function(t,e,n){"use strict";var i,a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"page"},[n("v-uni-view",{staticClass:"express"},[n("v-uni-view",{staticClass:"top ali-c"},[n("v-uni-view",{staticClass:"picture"},[n("v-uni-image",{staticClass:"img",attrs:{mode:"aspectFill",src:t.wlInfo.logo}})],1),n("v-uni-view",{staticClass:"text"},[n("v-uni-view",{staticClass:"text1"},[t._v(t._s(t.wlInfo.post_name))])],1)],1)],1),n("v-uni-view",{staticClass:"content bgf"},[n("v-uni-view",t._l(t.wlInfo.list,(function(e,i){return n("v-uni-view",{key:i,staticClass:"flex list",class:{one:0==i&&1==t.delivery_status}},[n("v-uni-view",{staticClass:"time"},[n("v-uni-view",{staticClass:"day"},[t._v(t._s(e.timeArr[0]))]),n("v-uni-view",[t._v(t._s(e.timeArr[1]))])],1),n("v-uni-view",{staticClass:"info flex1"},[n("v-uni-view",{staticClass:"title"},[t._v(t._s(0==i&&1==t.delivery_status?"该物流已被签收":"配送中"))]),n("v-uni-view",{staticClass:"text"},[t._v(t._s(e.context))])],1)],1)})),1)],1)],1)},o=[];n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}))},d0e7:function(t,e,n){var i=n("2286");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("2eb50ef6",i,!0,{sourceMap:!1,shadowMode:!1})},f9b7:function(t,e,n){"use strict";n.r(e);var i=n("2b41"),a=n("9035");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("54a1");var r,s=n("f0c5"),c=Object(s["a"])(a["default"],i["b"],i["c"],!1,null,"405f4c3e",null,!1,i["a"],r);e["default"]=c.exports},fa15:function(t,e,n){"use strict";var i=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("45b7")),o=i(n("5efc")),r={components:{logistics:o.default},data:function(){return{express_id:"",express_number:"",wlInfo:{}}},onLoad:function(t){var e=t.id,n=JSON.parse(decodeURIComponent(t.code));console.log(e),console.log(n),this.express_id=e,this.express_number=n,this.int()},methods:{int:function(){var t=this,e={express_id:this.express_id,express_number:this.express_number};console.log(e),a.default.post("package/logistics",e).then((function(e){console.log(e),t.wlInfo=e.data.wlInfo}))}}};e.default=r},fef3:function(t,e,n){"use strict";n.r(e);var i=n("37fe"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a}}]);