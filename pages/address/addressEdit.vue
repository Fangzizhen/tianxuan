<template>
	<view class="content siyuan">
		<view class="row ">
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人" placeholder-class="placeholder" />
		</view>
		<view class="row">
			<input class="input aka" type="number" v-model="addressData.tel" placeholder="手机号" placeholder-class="placeholder" />
			<view class="phone-right">
				<text class="aka" style="font-size: 32rpx;">+86</text>
				<uni-icons type="arrowright" size="15" color="#B3B3B3"></uni-icons>
			</view>
		</view>
		<!-- 收货地址 -->
		<view class="row " @tap.stop="btnClick">
			<view class="input" v-if="city == ''">所在地区</view>
			<view class="input" v-else>
				<view>{{city.province}}</view>
				<view>{{city.city}}</view>
				<view>{{city.county}}</view>
			</view>
			<view class="phone-right">
				<uni-icons type="arrowright" size="14" color="#B3B3B3"></uni-icons>
			</view>
		</view>
		<selectAddress ref='selectAddress' @selectAddress="successSelectAddress"></selectAddress>
		<!-- 门牌号 -->
		<view class="area-box">
			<textarea class="area" v-model="addressData.address" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" placeholder-class="placeholder" />
			</view>
			<view class="addressType-box siyuan">
				<text class="title">地址标签</text>
				<view class="addressType-list">
						<view class="addressType"  v-for="(item,index) in addressTypeList" :key="item.id" @click="changeType(item.name)">
							<text class="unlabel" :class="addressType == item.name? 'label': ''"></text>
							<text>{{item.name}}</text>
						</view>
				</view>
			</view>
			<view class="default-box" @click="switchChange">
				<view class="default" :class="addressData.default?'undefault':''"><uni-icons v-if="addressData.default" class="defaulticon" color="#FE7956" type="checkmarkempty" size="12"></uni-icons></view>
				<text>设为默认地址</text>
			</view>
		<view class="add-btn" @click="confirm">保存</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
	import selectAddress from '@/components/yixuan-selectAddress/yixuan-selectAddress.vue'
	export default {
		components: {
			selectAddress
		},
		data() {
			return {
				addressId : "",
				city:"",
				addressData: { //提交数据
					name: '',
					tel: '',
					address: '',
					area: '',
					default: false
				},
				addressType:'家',
				addressTypeList:[
					{
						id:1,
						name:"家"
					},{
						id:2,
						name:"学校"
					},{
						id:3,
						name:"公司"
					},{
						id:4,
						name:"其他"
					},
				]
			}
		},
		onLoad(option) {
			let title = '新增收货地址';
			if (option.type === 'edit') {
				title = '编辑收货地址'
				// this.addressData = JSON.parse(option.data)
				var openJsonData = JSON.parse(option.data)
				console.log(JSON.parse(option.data))
				var openData = {
					name:openJsonData.name,
					tel:openJsonData.tel,
					city:{
						cityId:openJsonData.city,
						city:openJsonData.city_name,
						countyId:openJsonData.county,
						county:openJsonData.county_name,
						province:openJsonData.province_name,
						provinceId:openJsonData.province,
					},
					address:openJsonData.address,
					tag:openJsonData.tag,
					default:openJsonData.is_default
				}
				this.addressData = openData
				this.city = openData.city
				this.addressId = openJsonData.id
			}
			uni.setNavigationBarTitle({
				title
			})
		},
		methods: {
			// 提交数据
			postForm() {
				var data = {};
				request.post('useraddress/save', data).then(res => {
					
				})
			},
			
			// 收货地址弹窗显示操作
			btnClick() {
				this.$refs.selectAddress.show()
			},
			// 接受地址回调获得数据
			successSelectAddress(address) { 
				
				this.city= address;
				this.addressData.city= address;
				console.log(this.city)
				
			},
			// 设置默认开关
			switchChange() {
				this.addressData.default = !this.addressData.default;
			},
			// 地址标签
			changeType(tag){
				this.addressType = tag;
			},
			// 保存地址
			confirm(){
				let data = this.addressData;
				if(!data.name){
					this.$api.msg('请填写收货人姓名');
					return;
				}
				if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.tel)){
					this.$api.msg('请输入正确的手机号码');
					return;
				}
				
				if(!data.address){
					this.$api.msg('请填写门牌号信息');
					return;
				}
				// console.log(data)
				var postData = {
					id:this.addressId,
					name:data.name,
					tel:data.tel,
					address:data.address,
					province: data.city.provinceId,
					city: data.city.cityId,
					county: data.city.countyId,
					province_name: data.city.province,
					city_name: data.city.city,
					county_name: data.city.county,
					is_default: data.default? '1':'0',
					tag: this.addressType
				}
				console.log(postData)
				request.post('useraddress/save', postData).then(res => {
					console.log(res)
					if(res.code == 0){
						uni.showToast({
							mask:true,
							title: res.msg,
							duration: 2000,
						});
						setTimeout(()=>{
							uni.hideToast()
							 uni.navigateBack({});
						}, 2000)
					}
				})
			},
		}


	}
</script>

<style scoped lang="less">
	.siyuan{
		font-family: SourceHanSansCN-Regular;
	}
	.aka{
		font-family: Akrobat-Regular;
	}
	.page{
		font-family: SourceHanSansCN-Regular;
	}
	
	.placeholder {
		 font-family: SourceHanSansCN-Regular;
		 font-size: 28rpx;
		 color: #969696;
	}
	.row {
		display: flex;
		align-items: center;
		position: relative;
		padding: 30rpx 32rpx;
		min-height: 48rpx;
		background: #fff;
		border-bottom: 0.3px #DBDBDB solid;

		.phone-right {
			text {
				font-size: 28rpx;
				color: #969696;
				margin-right: 12rpx;
			}
		}

		.tit {
			flex-shrink: 0;
			width: 120rpx;
			font-size: 30rpx;
		}

		.input {
			color: #969696;
			flex: 1;
			font-size: 28rpx;
			margin-top: 2rpx;
		}

		.icon-shouhuodizhi {
			font-size: 36rpx;
		}
	}
	.area-box{
		display: flex;
		margin-bottom: 12rpx;
		.area{
			padding: 14rpx 32rpx;
			height: 166rpx;
			background-color: #fff;
			flex: 1;
		}
	}
	.default-row {
		margin-top: 16rpx;
		.tit {
			flex: 1;
		}
		switch {
			transform: translateX(16rpx) scale(.9);
		}
	}
	.addressType-box{
		background-color: #FFFFFF;
		padding: 30rpx 32rpx;
		padding-bottom: 0;
		border-bottom: 0.3px #DBDBDB solid;
		.title{
			font-size:28rpx;
			color:rgba(51,51,51,1);
			line-height:40rpx;
		}
		.addressType-list{
			display: flex;
			justify-content: space-between;
			padding: 0 26rpx;
			color: #333333;
			.addressType{
				padding: 32rpx 0;
				display: flex;
				align-items: center;
				.unlabel{
					width: 24rpx;
					height: 24rpx;
					border-radius: 50%;
					border: 1rpx #DBDBDB solid;
					margin-right: 12rpx;
				}
				.label{
					border: none;
					width: 28rpx;
					height: 28rpx;
					background:linear-gradient(45deg,rgba(255,240,214,1) 0%,rgba(255,177,177,1) 100%);
				}
			}
		}
	}
	.default-box{
		display: flex;
		align-items: center;
		padding: 30rpx 32rpx;
		min-height: 48rpx;
		background: #fff;
		font-size:28rpx;
		color:rgba(51,51,51,1);
		line-height:40rpx;
		.default{
			position: relative;
			width: 30rpx;
			height: 30rpx;
			border-radius: 50%;
			border: 1rpx #DBDBDB solid;
			margin-right: 12rpx;
			.defaulticon{
				position: absolute;
				top: 50%;
				left: 50%;
				margin-top: -20rpx;
				margin-left: -12rpx;
			}
		}
		.undefault{
			width: 34rpx;
			height: 34rpx;
			border: none;
			background-color: #FEEAE5;
		}
	}

	.add-btn {
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 16rpx;
		z-index: 95;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 679rpx;
		height: 82rpx;
		font-size: 32rpx;
		color: #FE7956;
		border-radius: 10rpx;
		border: none;
		background-color: #FEEAE5;
	}
</style>
