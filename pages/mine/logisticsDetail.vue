<template>
	<view class="content">
		<logistics :wlInfo="wlInfo"></logistics>
	</view>
</template>

<script>
	import request from '../../common/request.js';
	import logistics from '@/components/xinyu-logistics/xinyu-logistics.vue'
	export default {
		components: { logistics },
		data() {
			return {
				express_id:"",
				express_number:"",
				wlInfo: {}
			};
		},
		onLoad(open) {
			var id = open.id;
			var code = JSON.parse(decodeURIComponent(open.code))
			console.log(id)
			console.log(code)
			this.express_id = id;
			this.express_number = code;
			this.int()
		},
		methods:{
			int(){
				var data = {
					express_id :  this.express_id,
					express_number: this.express_number
				}
				console.log(data)
				request.post('package/logistics', data).then(res => {
					console.log(res)
					this.wlInfo = res.data.wlInfo
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.content{
		border-top: 1rpx solid #DBDBDB;
	}

</style>
