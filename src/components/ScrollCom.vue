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

    const scrollEvent = (e: any) => {
        scrollTop = e.srcElement.scrollTop;
        // if (!props.isScroll) return;
        if (
            scrollTop + e.srcElement.offsetHeight >=
            e.srcElement.scrollHeight - props.distance
        ) {
            $emits("getList");
        }
    };
</script>

<template>
    <div class="box">
        <div
            @scroll="scrollEvent"
            ref="scrolE1"
            class="scroll-box"
        >
            <div class="loadingBox" v-if="touchstartTitleShow">释放可刷新...</div>
            <div class="loadingBox" v-if="touchEndTitleShow">加载中...</div>
            
            <slot></slot>
            <div v-if="!isScroll">{{endText}}</div>
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