<template>
	<view class="content ">

		<uni-swipe-action>
			<uni-swipe-action-item class="list_box" :options="options" v-if="addressList.length > 0" v-for="(item, index) in addressList"
			 :key="index" @click="addressDel(item.id)">
				<view class="list " @click="checkAddress(item)">
					<view class="wrapper">
						<view v-if="item.is_default != '0'" class="default ico">默</view>
						<view v-else class="unDefault  ico">{{item.title_name}}</view>
						<view class="data-box">
							<view class="u-box">
								<text class="name">{{item.name}}</text>
								<text class="mobile">{{item.tel}}</text>
							</view>
							<view class="address-box">
								<text v-if="item.is_default != '0'" class="tag">默认</text>
								<text class="addAble" v-if="item.tag != ''">{{item.tag}}</text>
								<text class="address">{{item.province_name}} {{item.city_name}}{{item.county_name}}{{item.address}}</text>
							</view>
						</view>
					</view>
					<text class="yticon " @click.stop="addAddress('edit', item)">编辑</text>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>


		<!-- <view v-else class="list">
			暂无数据
		</view> -->

		<view class="add-btn" @click="addAddress('add')">新增地址</view>
	</view>
</template>

<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import request from '../../common/request.js'
	export default {
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#FE7956'
					}
				}],
				source: 0,
				addressList: [], //地址数据
			}
		},
		onShow() {
			this.getList() //获取数据
		},
		onLoad(option) {
			console.log(option.source);
			this.source = option.source;

			// uni.setNavigationBarColor({
			// 	frontColor: '#000000',
			// 	backgroundColor: '#F7F3F1',
			// 	animation: {
			// 		duration: 400,
			// 		timingFunc: 'easeIn'
			// 	}
			// })
		},
		methods: {

			// 获取列表数据
			getList() {
				this.checkLogin('navigate')
				var data = {};
				request.post('useraddress/index', data).then(res => {
					console.log(res)

					var resData = res.data
					if(resData.length == 0){
						uni.setStorageSync("buy_user_address_select", [])
					}else{
						for (let i = 0; i < resData.length; i++) {
							resData[i].title_name = resData[i].name.substr(0, 1);
							if(resData[i].is_default==true){
								uni.setStorageSync("buy_user_address_select", resData[i])
							}
						}
					}
					this.addressList = resData;
					console.log(resData)
				})
			},
			//选择地址
			checkAddress(item) {
				console.log(item)
				uni.setStorageSync("buy_user_address_select", item)
				uni.navigateBack()
			},
			// 删除地址
			addressDel(id) {
				var that = this
				uni.showModal({
					title: '提示',
					content: '确定删除该条地址么？',
					success: function(res) {
						if (res.confirm) {
							request.post('useraddress/delete', {id:id}).then(res => {
								console.log(res)
								if(res.code == 0){
									uni.showToast({
										mask:true,
										title: res.msg,
										duration: 2000,
									});
									that.getList()
								}else{
									uni.showToast({
										mask:true,
										title: res.msg,
										duration: 2000,
									});
								}
								
							})
						}
					}
				});
			},
			addAddress(type, item) {
				uni.navigateTo({
					url: `/pages/address/addressEdit?type=${type}&data=${JSON.stringify(item)}`
				})
			},
			//添加或修改成功之后回调
			refreshList(data, type) {
				//添加或修改后事件，这里直接在最前面添加了一条数据，实际应用中直接刷新地址列表即可
				this.addressList.unshift(data);
				console.log(data, type);
			}
		}
	}
</script>

<style scoped lang="less">
	.content {
		position: relative;
	}

	.list_box {
		border-bottom: 0.3px #DBDBDB solid !important;
	}

	.list {
		display: flex;
		align-items: center;
		height: 130rpx;
		padding: 34rpx 38rpx 24rpx 16rpx;
		background: #fff;
		position: relative;
		flex: 1;
	}


	.wrapper {
		display: flex;
		align-items: center;
		flex: 1;

		.data-box {
			width: 519rpx;
			position: relative;

			&::before {
				position: absolute;
				top: 50%;
				right: -20rpx;
				margin-top: -30rpx;
				content: " ";
				width: 1rpx;
				height: 60rpx;
				background-color: #E1E1E1;
			}
		}

		.ico {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		font-size: 36rpx;
		line-height: 36rpx;
		color: #fff;
		text-align: center;
		margin-right: 20rpx;
		}

		.default {
			background-color: #FE7956;
		}

		.unDefault {
			background-color: #F5EFEF;
		}
	}

	.yticon {
		font-size: 24rpx;
		line-height: 34rpx;
		color: #AEAEAE;
	}

	.address-box {
		.tag {
			width: 70rpx;
			height: 34rpx;
			border-radius: 6rpx;
			font-size: 24rpx;
			margin-right: 10rpx;
			background: #FEEAE5;
			text-align: center;
			// vertical-align: middle;
			color: #FE7956;
			padding: 4rpx 10rpx;
			padding-top: 8rpx;
			
		}
		
		.addAble {
			height: 34rpx;
			border-radius: 6rpx;
			font-size: 24rpx;
			line-height: 34rpx;
			margin-right: 10rpx;
			padding: 4rpx 10rpx;
			padding-top: 8rpx;
			background-color: #F4F4F4;
			color: #333333;
		}

		.address {
			font-size: 24rpx;
			line-height: 42rpx;
			color: #333333;
		}
	}

	.u-box {
		.name {
			font-size: 32rpx;
			line-height: 44rpx;
			margin-right: 16rpx;
		}

		.mobile {
			font-size: 28rpx;
			font-family: Akrobat-Regular;
			color: rgba(174, 174, 174, 1);
			line-height: 34rpx;
		}
	}

	.icon-bianji {
		display: flex;
		align-items: center;
		height: 80rpx;
		font-size: 40rpx;
		padding-left: 30rpx;
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
