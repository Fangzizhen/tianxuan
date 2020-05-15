<template>
	<view class="content ">
		<view class="list " v-for="(item, index) in addressList" :key="index" @click="checkAddress(item)">
			<view class="wrapper">
				<view v-if="item.default" class="default ico">默</view>
				<view v-else class="unDefault  ico">方</view>
				<view class="data-box">
					<view class="u-box">
						<text class="name">{{item.name}}</text>
						<text class="mobile">{{item.mobile}}</text>
					</view>
					<view class="address-box">
						<text v-if="item.default" class="tag">默认</text>
						<text class="addAble">家</text>
						<text class="address">{{item.addressName}} {{item.area}}</text>
					</view>
				</view>
			</view>
			<text class="yticon " @click.stop="addAddress('edit', item)">编辑</text>
		</view>

		<view class="add-btn" @click="addAddress('add')">新增地址</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
	export default {
		data() {
			return {
				source: 0,
				addressList: [{
					name: '刘晓晓',
					mobile: '18666666666',
					addressName: '北京 北京市 朝阳区 光华街道 世纪财富中心A座1808',
					address: '北京市东城区',
					area: 'B区',
					default: true
				}, {
					name: '刘大大',
					mobile: '18667766666',
					addressName: '北京 北京市 朝阳区 光华街道 世纪财富中心A座1808',
					address: '山东省济南市历城区',
					area: '西单元302',
					default: false,
				}]
			}
		},
		onLoad(option) {
			console.log(option.source);
			this.source = option.source;
			// this.getList() //获取数据
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
				var data = {};
				request.post('useraddress/index', data).then(res => {
					console.log(res)
					// this.catrgory = res.data.data
					// 	this.makeup = false
				})
			},
			//选择地址
			checkAddress(item) {
				console.log(item)
				if (this.source == 1) {
					//this.$api.prePage()获取上一页实例，在App.vue定义
					this.$api.prePage().addressData = item;
					uni.navigateBack()
				}
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

<style lang="less">
	page {
		padding-bottom: 120rpx;
	}

	.content {
		position: relative;
	}

	.list {
		display: flex;
		align-items: center;
		height: 130rpx;
		padding: 34rpx 38rpx 24rpx 16rpx;
		background: #fff;
		position: relative;
		border-bottom: 1rpx #DBDBDB solid;
	}

	.list:last-child {
		border-bottom: 1rpx #FFFFFF solid;
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
			width: 60rpx;
			height: 60rpx;
			border-radius: 50%;
			font-size: 36rpx;
			line-height: 60rpx;
			color: #fff;
			text-align: center;
			margin-right: 22rpx;
		}

		.default {
			background-color: #FE7956;
		}

		.unDefault {
			background-color: #F5EFEF;
		}
	}
	.yticon{
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
			line-height: 34rpx;
			margin-right: 10rpx;
			background: #FEEAE5;
			text-align: center;
			color: #FE7956;
			padding: 4rpx 10rpx;
		}

		.addAble {
			height: 34rpx;
			border-radius: 6rpx;
			font-size: 24rpx;
			line-height: 34rpx;
			margin-right: 10rpx;
			padding: 4rpx 10rpx;
			background-color: #F4F4F4;
			color: #333333;
		}

		.address {
			font-size: 24rpx;
			line-height: 42rpx;
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
