import Vue from 'vue'
import App from './App'

// 下拉加载、上拉刷新
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
// 结束z

const msg = (title, duration = 1500, mask = false, icon = 'none') => {
	console.log(this)
	//统一提示方便全局修改
	if (Boolean(title) === false) {
		return;
	}
	uni.showModal({
		content: title,
		duration,
		mask,
		icon,
		showCancel: false,
		confirmColor: "#576B95",
		confirmText: "知道了"
	});
}

const prePage = () => {
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}
// 测试是否微信内核浏览器
const isWeiXin = () => {
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true; // 是微信端
	} else {
		return false;
	}

}

/**
 * 对源数据截取decimals位小数，不进行四舍五入
 * @param {*} num 源数据
 * @param {*} decimals 保留的小数位数
 */
const cutOutNum = (num, decimals) => {
  if (isNaN(num) || (!num && num !== 0)) {
    return '--'
  }
  // 默认为保留的小数点后两位
  let dec = decimals ? decimals : 2
  let tempNum = Number(num)
  let pointIndex = String(tempNum).indexOf('.') + 1 // 获取小数点的位置 + 1
  let pointCount = pointIndex ? String(tempNum).length - pointIndex : 0 // 获取小数点后的个数(需要保证有小数位)
  // 源数据为整数或者小数点后面小于decimals位的作补零处理
  if (pointIndex === 0 || pointCount <= dec) {
    let tempNumA = tempNum
    if (pointIndex === 0) {
      tempNumA = `${tempNumA}.`
      for (let index = 0; index < dec - pointCount; index++) {
        tempNumA = `${tempNumA}0`
      }
    } else {
      for (let index = 0; index < dec - pointCount; index++) {
        tempNumA = `${tempNumA}0`
      }
    }
    return tempNumA
  }
  let realVal = ''
  // 截取当前数据到小数点后decimals位
  realVal = `${String(tempNum).split('.')[0]}.${String(tempNum)
    .split('.')[1]
    .substring(0, dec)}`
  // 判断截取之后数据的数值是否为0
  if (realVal == 0) {
    realVal = 0
  }
  return realVal
}



// 用户登录状态
Vue.prototype.checkLogin = function(pageUrl){
	// 获取缓存用户信息
	var request_user_token = uni.getStorageSync('request_user_token');
	if(request_user_token == ''){
		uni.showModal({
		   title: '未登录',
		   content: '您未授权，需要授权后才能继续',
		    success: function (res) {
		        if (res.confirm) {
		           uni.navigateTo({url:'../login/lod'});
		           return false;
		        } else if (res.cancel) {
							if(pageUrl == '' || pageUrl == null || pageUrl == undefined ){
								return
							}else if(pageUrl == 'navigate'){
								uni.navigateBack();
							} else{
								 uni.switchTab({ url: pageUrl});
							}
		        }
		    }
		});
	
	}else{
		return request_user_token;
	}
}

// 获取用户类型
Vue.prototype.get_user_type = function(pageUrl){
 return uni.getStorageSync('userinfor');
}



Vue.config.productionTip = false
Vue.prototype.$api = {
	msg,
	prePage,
	isWeiXin,
	cutOutNum
};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
