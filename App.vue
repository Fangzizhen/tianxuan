<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {
			uniIcons
		},
		onLaunch: function(options) {
			console.log(options)
			// console.log('App Launch');
		},
		onShow: function() {
			// console.log('App Show');
		},
		onHide: function() {
			// console.log('App Hide');
		}
	};
</script>

<style>
	@font-face {
		font-family: uniicons;
		src: url('/static/uni.ttf');
	}

	@font-face {
		font-family: SourceHanSansCN-Regular;
		src: url('/static/typeface/SourceHanSansCN-Regular.otf');
	}
	@font-face {
		font-family: Akrobat-SemiBold;
		src: url('/static/typeface/Akrobat-SemiBold.otf');
	}

	@font-face {
		font-family: Akrobat-Regular;
		src: url('/static/typeface/Akrobat-Regular.otf');
		src: url;
	}



	* {
		margin: 0;
		padding: 0;
	}

	ul,
	li {
		list-style: none;
	}

	/* 公共样式 */
	page {
		background: #F8F2F2;
		color: #4a4a4a;
		font-family: SourceHanSansCN-Regular;
	}

	page,
	textarea {
		font-size: 28rpx;
	}

	input[type="text"],
	input[type="number"],
	input[type="idcard"],
	input[type="digit"],
	textarea {
		-webkit-appearance: none;
		border-radius: 5px;
		box-sizing: border-box;
	}

	.txt {
		font-family: SourceHanSansCN-Regular;
	}

	.num {
		font-family: Akrobat-Regular;
	}
	.numgang{
		font-family: Akrobat-SemiBold !important;
		
	}

	.noMore {
		letter-spacing: 4rpx;
		font-size: 22rpx;
		line-height: 32rpx;
		text-align: center;
		color: #FF9377;
		padding: 26rpx 0;
	}

	.upwarp-nodata {
		font-size: 22rpx !important;
		line-height: 32rpx !important;
		text-align: center !important;
		color: #FF9377 !important;
	}

	uni-tabbar,
	uni-tabbar .uni-tabbar {
		box-shadow: 0px -2px 8px 0px rgba(0,0,0,0.02);
	}
</style>
