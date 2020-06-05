<template>
	<view class="content">
		<mescroll-body ref="mescrollRef" @init="mescrollInit" @down="downCallback" @up="upCallback">
		<view class="list">
			<view class="millet" v-for="(item,index) in recommendList" :key="index">
				<view class="title">
					<view class="name">添米宝</view>
					<view class="money num">¥3000</view>
				</view>
				<view class="millet_content">
					<view class="key">添小米</view>
					<view class="val">蒋劲夫</view>
				</view>
				<view class="millet_content">
					<view class="key">总订单数</view>
					<view class="val num">10</view>
				</view>
				<view class="millet_content">
					<view class="key">联系方式</view>
					<view class="val num">17777777777</view>
				</view>
				<view class="millet_content">
					<view class="key">注册时间</view>
					<view class="val num">2020-05-01 </view>
				</view>
				<view class="millet_content">
					<view class="key">备注</view>
					<view class="val">蒋劲夫</view>
				</view>
			</view>
		</view>
		</mescroll-body>
	</view>
</template>

<script>
	import request from '../../common/request.js';
	import MescrollMixin from "@/components/mescroll-uni/mescroll-mixins.js";
	export default {
		mixins: [MescrollMixin],
		data() {
			return {
				recommendList: [],
				isGoodsEdit: false, // 是否加载编辑后的数据
				category_id: "",
				page: 1
			};
		},
		methods: {
			// 上拉加载和下拉刷新
			upCallback(page) {
				console.log(page)
				this.getShoucang(page)

			},
			// 收藏夹
			getShoucang(page) {
				console.log(page)
				var data = {
					level:'millet',
					page: page.num
				};
				request.post('distribution/team', data).then(res => {
					console.log(res)

					var curPageData = res.data.data
					this.mescroll.endByPage(curPageData.length, res.data.page_total);
					if (page.num == 1) this.recommendList = [];
					this.recommendList = this.recommendList.concat(curPageData);
					console.log(this.recommendList)
				}).catch(() => {
					//联网失败, 结束加载
					this.mescroll.endErr();
				})
			},
		}
	}
</script>

<style scoped lang="less">
	.content {
		border-top: 1rpx solid #DBDBDB;

		.millet {
			background-color: #FFFFFF;
			padding: 34rpx 36rpx 38rpx 34rpx;
			margin-bottom: 12rpx;
			.title{
				padding-bottom: 22rpx;
				border-bottom: 1rpx #DBDBDB solid;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.name{
					font-size: 32rpx;
					line-height: 44rpx;
					color: #555555;
				}
				.money{
					font-size: 32rpx;
					line-height: 40rpx;
					color: #FE7569;
				}
			}
			.millet_content{
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #AEAEAE;
				margin-top: 25rpx;
				.key{
					font-size: 28rpx;
					line-height: 40rpx;
				}
				.val{
					font-size: 24rpx;
					line-height: 34rpx;
				}
				.num{
					font-size: 32rpx;
				}
				&:first-child{
					margin-top: 28rpx;
				}
			}
		}
	}
</style>
