<template>
	<view class="content siyuan">
		<view class="row ">
			<input class="input" type="text" v-model="addressData.name" placeholder="收货人" placeholder-class="placeholder" />
		</view>
		<view class="row">
			<input class="input aka" type="number" v-model="addressData.mobile" placeholder="手机号" placeholder-class="placeholder" />
			<view class="phone-right">
				<text class="aka">+86</text>
				<uni-icons type="arrowright" size="14" color="#B3B3B3"></uni-icons>
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
			<textarea class="area" value="" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等" placeholder-class="placeholder" />
			</view>
			<view class="addressType-box siyuan">
				<text class="title">地址标签</text>
				<view class="addressType-list">
						<view class="addressType"  v-for="(item,index) in addressTypeList" :key="item.id" @click="changeType(item.id)">
							<text class="unlabel" :class="addressType == item.id? 'label': ''"></text>
							<text>{{item.name}}</text>
						</view>
				</view>
			</view>
			<view class="default-box" @click="switchChange">
				<view class="default" :class="addressData.default?'undefault':''"><uni-icons v-if="addressData.default" class="defaulticon" color="#FE7956" type="checkmarkempty" size="12"></uni-icons></view>
				<text>设为默认地址</text>
			</view>
			
		<!-- <view class="row default-row">
			<text class="tit">设为默认</text>
			<switch :checked="addressData.defaule" color="#fa436a" @change="switchChange" />
		</view> -->
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
				city:"",
				addressData: { //提交数据
					name: '',
					mobile: '',
					addressName: '在地图选择',
					address: '',
					area: '',
					default: false
				},
				addressType:1,
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
				this.addressData = JSON.parse(option.data)
			}
			this.manageType = option.type;
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
				console.log(address)
				this.city=address;
			},
			// 设置默认开关
			switchChange() {
				this.addressData.default = !this.addressData.default;
			},
			// 地址标签
			changeType(id){
				this.addressType = id;
			},
			// 保存地址
			confirm(){
				// let data = this.addressData;
				// if(!data.name){
				// 	this.$api.msg('请填写收货人姓名');
				// 	return;
				// }
				// if(!/(^1[3|4|5|7|8][0-9]{9}$)/.test(data.mobile)){
				// 	this.$api.msg('请输入正确的手机号码');
				// 	return;
				// }
				
				// if(!data.area){
				// 	this.$api.msg('请填写门牌号信息');
				// 	return;
				// }
				
				// //this.$api.prePage()获取上一页实例，可直接调用上页所有数据和方法，在App.vue定义
				// this.$api.prePage().refreshList(data, this.manageType);
				// this.$api.msg(`地址${this.manageType=='edit' ? '修改': '添加'}成功`);
				// setTimeout(()=>{
				// 	uni.navigateBack()
				// }, 800)
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
		border-bottom: 1rpx #DBDBDB solid;

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
		border-bottom: 1rpx #DBDBDB solid;
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
				top: -6rpx;
				left: 2rpx;
			}
		}
		.undefault{
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
