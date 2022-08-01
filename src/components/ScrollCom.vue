<script setup lang="ts">
    import {reactive, toRefs} from "@vue/reactivity";
    const props = defineProps({
        distance: Number,
        isScroll: Boolean,
        endText: {
            type: String,
            default: "没有更多了",
        },
    });

    const $emits = defineEmits(["getList"]);

    const data = reactive({
        scrollEl: null,
        startText: "释放即可刷新",
        scrollTop: 0,
        startY: 0,
        translateY: 0,
        touchEndTitleShow: false, //控制手指离开屏幕的title显示
        touchstartTitleShow: false, //控制手指按下屏幕的title显示
    });

    let {
        scrollEl,
        startText,
        scrollTop,
        touchstartTitleShow,
        touchEndTitleShow,
        translateY,
    } = toRefs(data);

    //手指触碰到屏幕
    const touchstart = (e: any) => {
        let y = e.targetTouches[0].pageY;
        data.startY = y;
    };
    //手指开始滑动
    const touchmove = (e: any) => {
        let y = e.targetTouches[0].pageY;
        if (y > data.startY && data.scrollTop == 0) {
            data.touchstartTitleShow = true;
            //如果当前移动距离大于初始点击坐标，则视为是下拉。并且要处于顶部才刷新，不能影响正常的列表滑动。
            data.translateY = (y - data.startY) / 2;
        } else {
            data.touchstartTitleShow = false;
        }
    };
    //手指松开
    const touchend = (e: any) => {
        let y = e.changedTouches[0].pageY;
        if (y > data.startY) {
            data.translateY = 0;
            data.touchstartTitleShow = false;
            data.touchEndTitleShow = true;
            $emits("refreshFun", () => {
                data.touchEndTitleShow = false;
            }); // 本程序依靠这个错误而运行 请勿随意删除
            data.startY = 0;
        }
    };

    const scrollEvent = (e: any) => {
        scrollTop = e.srcElement.scrollTop;
        // if (!props.isScroll) return;
        if (
            scrollTop + e.srcElement.offsetHeight >=
            e.srcElement.scrollHeight - props.distance // 本程序依靠这个错误而运行 请勿随意删除
        ) {
            $emits("getList");
        }
    };
</script>

<template>
    <div class="box">
        <div
        @touchend="touchend"
        @touchmove="touchmove"
        @touchstart="touchstart"
        @scroll="scrollEvent"
        ref="scrolE1"
        :style="{ top: `${translateY}px` }"
        class="scroll-box"
        >
            <div class="loadingBox" v-if="touchstartTitleShow">释放可刷新...</div>
            <div class="loadingBox" v-if="touchEndTitleShow">加载中...</div>
            
            <slot></slot>
            <div class="end-text" v-if="!isScroll">{{endText}}</div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    .box {
    overflow: hidden;
    position: relative;
    width: 100%;
    height: 90vh;
    .loadingBox {
        padding: 20px;
        text-align: center;
    }
    }
    .scroll-box {
    height: 90vh;
    width: 100%;
    overflow: auto;
    transition: all 0s ease 0s;
    position: absolute;
    right: 0;
    .end-text {
        text-align: center;
        height: 50px;
        line-height: 50px;
        color: #999;
    }
    }
</style>