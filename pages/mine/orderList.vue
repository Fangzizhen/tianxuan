<template>
    <view class="page">
        <tabControl  :current="current" activeColor="#FF9377" :values="items" :fixed="true" :scrollFlag='true' :isEqually='true' @clickItem="onClickItem" ></tabControl>
        <!-- 使用 swiper 配合 滑动切换 -->
        <swiper class="swiper" style="height: 100%;" @change='scollSwiper' :current='current'>
            <swiper-item v-for="(item,index) in items" :key='index'>
                <!-- 使用 scroll-view 来滚动内容区域 -->
                <scroll-view scroll-y="true" style="height: 100%;">{{ item }}</scroll-view>
            </swiper-item>
        </swiper>
    </view>
</template>
<script>
	import tabControl from '../../components/tabControl-tag/tabControl-tag.vue';
	export default {
	    components: { tabControl },
	    data() {
	        return {
	            items: ['全部', '待付款', '待发货', '待收货'],
	            current: 0,
							ordrtAll:[{pinlei:"时令鲜果",
								zhuangtai:"卖家已发货",
								name:"四川眉山9号橙一个长长的名字的展示形式",
								danjia:"45",
								shuliang:"2",
								guige:"#5g 1支装",
								zongjia:90,
								youhui:"0",
								shiji:90
								}]
	        };
	    },
	    onLoad() {},
	    methods: {
	        onClickItem(val) {
	            this.current = val.currentIndex
	        },
	        scollSwiper(e){
	            this.current = e.target.current
	        }
	    }
	};
</script>

<style>
	page{
	    height: 100%;
			padding-top: 98rpx;
	}
	.page{
	    
	    height: 100%;
	}
</style>
