import Vue from 'vue'
import App from './App'

// 下拉加载、上拉刷新
import MescrollBody from "@/components/mescroll-uni/mescroll-body.vue"
import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue"
Vue.component('mescroll-body', MescrollBody)
Vue.component('mescroll-uni', MescrollUni)
// 结束

const msg = (title, duration=1500, mask=false, icon='none')=>{
	console.log(this)
	//统一提示方便全局修改
	if(Boolean(title) === false){
		return;
	}
	uni.showModal({
		content:title,
		duration,
		mask,
		icon,
		showCancel:false,
		confirmColor:"#576B95",
		confirmText:"知道了"
	});
}

const prePage = ()=>{
	let pages = getCurrentPages();
	let prePage = pages[pages.length - 2];
	// #ifdef H5
	return prePage;
	// #endif
	return prePage.$vm;
}

Vue.config.productionTip = false
Vue.prototype.$api = {msg, prePage};

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
