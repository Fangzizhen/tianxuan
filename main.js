import Vue from 'vue'
import App from './App'

// 下拉加载、上拉刷新
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
// 结束

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


// 用户登录状态
Vue.prototype.checkLogin = function(backpage, backtype){
	var userinfor = uni.getStorageSync('userinfor');
	
	if(userinfor == ''){
		uni.showModal({
		   title: '未登录',
		   content: '您未登录，需要登录后才能继续',
		    success: function (res) {
		        if (res.confirm) {
		           uni.navigateTo({url:'../login/login?backtype='+backtype});
		           return false;
		        } else if (res.cancel) {
		            uni.switchTab({ url: '/pages/index/index'});
		        }
		    }
		});
	
	}
	return userinfor;
}





Vue.config.productionTip = false
Vue.prototype.$api = {
	msg,
	prePage,
	isWeiXin
};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
