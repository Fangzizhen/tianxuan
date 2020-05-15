<script>
	import uniIcons from "@/components/uni-icons/uni-icons.vue";
	export default {
		components: {uniIcons},
		onLaunch: function() {
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
		font-family: Akrobat-Regular;
		src: url('/static/typeface/Akrobat-Regular.otf');
		src: url;
	}
	
	
	
	* {
		margin: 0;
		padding: 0;
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


</style>
