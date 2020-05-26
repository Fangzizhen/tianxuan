<template>
	<view class="box">
		<!-- <view class="left label" :style="{'width':labelWidth + 'rpx'}">
			{{ label }}
		</view>
		<view class="right input-box">
			<input :id="tag" :value="initValue" :type="type" :maxlength="maxlength" :placeholder="placeholder" :password="password"
			 :placeholder-style="placeholderStyle" :placehoder-class="placeholderClass" :disabled="disabled" :focus="focus"
			 :cursor="cursor" class="left" @input="input" @blur="blur" @focus="onFocus" @confirm="confirm" @keyboardheightchange="onKeyboardheightchange"
			 :style="{'margin-left': inputLeftMargin + 'px'}" />
			<view v-if="!disabledClear" class="right">
				<view v-if="isClear" class="clear-style" @click="clearInputValue">
					<icon type="clear" size="18" />
				</view>
			</view>
		</view> -->
		<view class="left input-box">
			<input :id="tag" :value="initValue" :type="type" :maxlength="maxlength" :placeholder="placeholder" :password="password"
			 :placeholder-style="placeholderStyle" :placehoder-class="placeholderClass" :disabled="disabled" :focus="focus"
			 :cursor="cursor" class="left" @input="input" @blur="blur" @focus="onFocus" @confirm="confirm" @keyboardheightchange="onKeyboardheightchange"
			 :style="{'margin-left': inputLeftMargin + 'px'}" />
			<view v-if="!disabledClear" class="right">
				<view v-if="isClear" class="clear-style" @click="clearInputValue">
					<icon type="clear" size="18" />
				</view>
			</view>
		</view>
		<view v-show="show" class="right label" :style="{'width':labelWidth + 'rpx'}" @click="getCode">
			{{label}}
		</view>
		<view v-show="!show" class="right label" :style="{'width':labelWidth + 'rpx'}" >{{count}}秒后重发</view>
	</view>
</template>

<script>
	import request from '../../common/request.js'
	export default {
		name: "CodeInput",
		props: {
			/* 左侧文本内容 */
			label: {
				type: String,
				default: '',
			},
			/* 左侧文本内容 */
			phone: {
				type: String,
				default: '',
			},
			/* 左侧文本内容宽度 */
			labelWidth: [Number, String],
			/* 输入框默认值 */
			value: {
				type: String,
				default: '',
			},
			/* 有效值: text number idcard digit */
			type: {
				type: String,
				default: 'text',
			},
			/* 最大输入长度,设置为 -1 的时候不限制,默认不限制 */
			maxlength: {
				type: [Number, String],
				default: -1,
			},
			/* 输入框为空时占位符 */
			placeholder: {
				type: String,
				default: '',
			},
			/* 是否是密码类型 */
			password: {
				type: Boolean,
				default: false,
			},
			/* 指定 placeholder 的样式 */
			placeholderStyle: {
				type: String,
				default: '',
			},
			/* 指定 placeholder 的样式类 */
			placeholderClass: {
				type: String,
				default: 'input-placeholder',
			},
			/* 是否禁用 */
			disabled: {
				type: Boolean,
				default: false,
			},
			/* 获取焦点 */
			focus: {
				type: Boolean,
				default: false,
			},
			/* 指定focus时的光标位置 */
			cursor: Number,
			/* 是否禁用清空按钮 */
			disabledClear: {
				type: Boolean,
				default: false,
			},
			/* 唯一标识符,当多个输入框时获取对应输入框的值 */
			tag: {
				type: String,
				default: "input"
			},
		},
		data() {
			return {
				initValue: this.value,
				isClear: false,
				inputLeftMargin: this.labelWidth ? 0 : 20,
				show: true,
				count: '',
				timer: null,
			}
		},
		created() {
			this.getInputValue();
		},
		methods: {
			// 获取验证码
			getCode() {
				if (this.phone.length != 11) {
				     uni.showToast({
				        icon: 'none',
						position: 'bottom',
				        title: '手机号不正确'
				    });
				    return false;
				}else{
					console.log(this.phone)
					var data = {
						mobile:this.phone
					};
					request.post('user/RegVerifySend', data).then(res => {
						console.log(res)
					})
					this.countDown()
				}
				
				
			},

			countDown() {
				// console.log(11111)
				const TIME_COUNT = 60;
				if (!this.timer) {
					this.count = TIME_COUNT;
					this.show = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							// console.log(1111)
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},



			clearInputValue() {
				this.initValue = '';
				this.isClear = false;
				this.getInputValue();
			},
			input(e) {
				this.isClear = this.isShowClear(e);
				this.initValue = e.detail.value;
				this.getInputValue();
			},
			blur(e) {
				//#ifdef H5
				window.scrollTo(0, 0)
				//#endif
				setTimeout(() => {
					this.isClear = false;
				}, 200);
				this.getInputValue();
				this.$emit('blur', e);
			},
			onFocus(e) {
				this.isClear = this.isShowClear(e);
				this.getInputValue();
				this.$emit('focus', e);
			},
			confirm(e) {
				this.$emit('confirm', e);
			},
			onKeyboardheightchange(e) {
				this.$emit('keyboardheightchange', e);
			},
			isShowClear(e) {
				return e.detail.value.length !== 0;
			},
			getInputValue() {
				this.$emit('getInputValue', {
					'tag': this.tag,
					'value': this.initValue
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.box {
		font-family: SourceHanSansCN-Regular;
		display: flex;
		justify-content: center;
		align-items: center;
		border-bottom: 1rpx #DBDBDB solid;
		color: #333333;
		.left {
			flex: 1;
		}

		.right {
			flex: none;
		}
	}

	.icon {
		margin-left: 54rpx;
	}

	.label {
		font-size: 32rpx;
		color: #FFDBD2;
	}

	.input-box {
		font-family: Akrobat-Regular;
		display: flex;
		justify-items: center;
		align-items: center;
		position: relative;
		padding-left: 36rpx;
		input {
			height: 100rpx;
			font-size: 32rpx;
		}

		&::after {
			content: "";
			width: 2rpx;
			height: 34rpx;
			background-color: #DBDBDB;
			position: absolute;
			top: 50%;
			right: 15rpx;
			margin-top: -17rpx;
			z-index: 100;
		}

		.left {
			flex: 1;
		}

		.right {
			flex: none;
		}
	}

	.clear-style {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 40px;
		height: 44px;
	}
</style>
