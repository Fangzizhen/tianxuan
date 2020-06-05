<template>
	<view class="content">
		<view class="order">
			<view class="order_content">
				<image class="img" :src="infoData.img"></image>
				<view class="category">
					<view class="name">{{infoData.name}}</view>
					<text class="guige">{{infoData.guige}}</text>
				</view>
			</view>
			<view class="btn_box">
				<view class="danjia"><text class="symbol">￥</text>{{infoData.danjia}}</view>
				<uni-number-box :min="1" :max="infoData.shuliang"></uni-number-box>
			</view>
		</view>
		<view class="addressType-box siyuan">
			<text class="title">地址标签</text>
			<view class="addressType-list">
				<view class="addressType" v-for="(item,index) in addressTypeList" :key="item.id" @click="changeType(item.id)">
					<text class="unlabel" :class="addressType == item.id? 'label': ''"></text>
					<text>{{item.name}}</text>
				</view>
			</view>
		</view>
		<view class="uni-form-item uni-column">
			<view class="title">退/换货说明：</view>
			<input class="uni-input" placeholder-class="placeholder" placeholder="选填" />
		</view>
		<ss-upload-image :url="url" :file-list="fileList" :name="name" ></ss-upload-image>
	</view>
</template>

<script>
	import uniNumberBox from "@/components/uni-number-box/uni-number-box.vue"
	import ssUploadImage from '@/components/ss-upload-image/ss-upload-image.vue'
	export default {
		components: {
		  ssUploadImage
		},
		data() {
			return {
				// ----------------
				fileList: [],
				url: '/api/index.php?s=/api/ueditor/index&application=app&application_client_type=weixin&token="4d843324f33c03f045b8257dd30eba1b"&ajax=ajax',
				name: 'file',
				// -------------
				infoData: {},
				addressType: 1,
				addressTypeList: [{
					id: 1,
					name: "发错货"
				}, {
					id: 2,
					name: "商品坏了"
				}, {
					id: 3,
					name: "商品降价"
				}, {
					id: 4,
					name: "不想要了"
				}, ]
			};
		},
		onLoad(info) {
			var infoData = JSON.parse(decodeURIComponent(info.info))
			this.infoData = infoData[0]
			console.log(this.infoData)
		},
		methods: {
			// 地址标签
			changeType(id) {
				this.addressType = id;
			},
			// -----------------------------
			// 上传成功
			onSuccess(res) {
				console.log(res)
			  // 响应示例
			  // {
			  //    code: 0,
			  //    data: {
			  //      image_url: 'http://www.xxxxx.png'
			  //    },
			  //    message: '上传成功'
			  // }
			  if (res.code === 0) {
			    this.fileList.push(res.data.image_url)
			  }
			  console.log(res)
			},
			// 上传进程
			onProcess(res) {
			  console.log(res)
			},
			// 上传失败
			onError(err) {
			  console.log(err)
			},
			// 移除
			onRemove(index) {
			  this.fileList.splice(index, 1)
			}
			// ---------------
		}
	}
</script>

<style scoped lang="less">
	.siyuan {
		font-family: SourceHanSansCN-Regular;
	}

	.content {

		// border-top: 1rpx solid #DBDBDB;
		.order {
			background-color: #fff;
			padding: 38rpx 24rpx 44rpx 32rpx;
			margin-bottom: 12rpx;

			.order_content {
				display: flex;

				.img {
					width: 180rpx;
					height: 180rpx;
					margin-right: 50rpx;
				}

				.category {
					width: 410rpx;

					.name {
						font-size: 28rpx;
						line-height: 40rpx;
						min-height: 80rpx;
						margin-bottom: 16rpx;
					}

					.guige {
						height: 33rpx;
						padding: 4rpx 8rpx;
						border-radius: 6rpx;
						background-color: #D8D8D8;
						font-size: 20rpx;
						line-height: 33rpx;
						text-align: center;
						color: #999999;
					}
				}


			}

			.statistics {
				text-align: right;
				font-size: 28rpx;
				margin-bottom: 24rpx;

				.symbol {
					font-family: Akrobat-Regular;
					font-size: 22rpx;
				}

				.nur {
					font-family: Akrobat-Regular;
					font-size: 28rpx;
				}
			}

			.btn_box {
				display: flex;
				justify-content: space-between;
				align-items: center;
				text-align: center;
				font-size: 26rpx;
				line-height: 50rpx;
				margin-top: 20rpx;

				.danjia {
					font-family: Akrobat-Regular;
					font-size: 38rpx;
					line-height: 48rpx;
					color: #FE7956;

					.symbol {
						font-size: 38rpx;
						line-height: 40rpx;
					}
				}

				.receipt {
					width: 170rpx;
					height: 50rpx;
					color: #FF9377;
					border: 1rpx #FF9377 solid;
					border-radius: 6rpx;
					margin-left: 30rpx;
				}
			}
		}

		.addressType-box {
			background-color: #FFFFFF;
			padding: 30rpx 32rpx;
			padding-bottom: 0;
			margin-bottom: 12rpx;

			.title {
				font-size: 28rpx;
				color: rgba(51, 51, 51, 1);
				line-height: 40rpx;
			}

			.addressType-list {
				display: flex;
				justify-content: space-between;
				color: #333333;

				.addressType {
					padding: 32rpx 0;
					display: flex;
					align-items: center;

					.unlabel {
						width: 24rpx;
						height: 24rpx;
						border-radius: 50%;
						border: 1rpx #DBDBDB solid;
						margin-right: 12rpx;
					}

					.label {
						background: linear-gradient(45deg, rgba(255, 240, 214, 1) 0%, rgba(255, 177, 177, 1) 100%);
					}
				}
			}
		}
		.uni-form-item {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 114rpx;
			width: 100%;
			background-color: #FFFFFF;
			.title {
				width: 182rpx;
				// text-align: center;
				font-size: 28rpx;
				line-height: 40rpx;
				// color: #AEAEAE;
				margin: 0 10rpx 0 32rpx;
			}
		
			.uni-input {
				flex: 1;
				height: 114rpx;
				line-height: 114rpx;
				align-items: center;
				font-size: 28rpx;
				color: #AEAEAE;
			}
		
			.placeholder {
				font-size: 28rpx;
				color: #AEAEAE;
			}
		
			
		
		}
	}
</style>
