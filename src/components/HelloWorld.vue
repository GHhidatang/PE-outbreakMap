<script setup lang="ts">
  import axios from 'axios';
  import { onMounted, reactive, ref } from 'vue';
  const data = reactive({
    name: "tina", 
  })

  let active = ref<Boolean>(true);

  let tabClick = (flag: Boolean) => {
    active.value = flag;
  }

  onMounted(()=>{
    axios('/api/ug/api/wuhan/app/data/list-total'
    ).then((res)=> {
      console.log(res);
    })
  })
</script>

<template>
 <div class="box">
  <div class="top-box">  
    <img class="bg-img" src="../assets/B站专栏封面3.jpg" alt="">
    <div class="title-text">
      <h1>科学防护 共渡难关</h1>
      <h2>肺炎疫情实时动态播报</h2>
    </div>

    <div class="cover-cards">
      <div class="cover-tab">
        <div @click="tabClick(true)" :class="{'active': active}">全国疫情数据(含港澳台)</div>
        <div @click="tabClick(false)" :class="{'active': !active}">湖北疫情数据</div>
      </div> 

      <div class="cover-info">
        <div>
          <h4>境外输出</h4>
          <p>123456</p>
          <p>
            <span>较昨日</span>
            <span>+123</span>
          </p>
        </div>
        <div>
          <h4>无症状感染</h4>
          <p>123456</p>
          <p>
            <span>较昨日</span>
            <span>+123</span>
          </p>
        </div>
        <div>
          <h4>现有确诊</h4>
          <p>123456</p>
          <p>
            <span>较昨日</span>
            <span>+123</span>
          </p>
        </div>
        <div>
          <h4>累计确诊</h4>
          <p>123456</p>
          <p>
            <span>较昨日</span>
            <span>+123</span>
          </p>
        </div>
        <div>
          <h4>累计死亡</h4>
          <p>123456</p>
          <p>
            <span>较昨日</span>
            <span>+123</span>
          </p>
        </div>
        <div>
          <h4>累计治愈</h4>
          <p>123456</p>
          <p>
            <span>较昨日</span>
            <span>+123</span>
          </p>
        </div>
      </div>

    </div>
  </div>
 </div>
</template>

<style lang="scss" scoped>
.bg-img {
  width: 100%;
}
.top-box {
  position: relative;
  .title-text {
    position: absolute;
    z-index: 2;
    color: #fff;
    top: 20px;
    left: 1rem;
  }

  .cover-cards {
    position: absolute;
    top: 140px;
    background: #fff;
    border-radius: 20px;
    width: calc(100% - 2rem);
    left: 1rem;
    overflow: hidden;

    >div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      &.cover-tab {
        >div {
          width: 50%;
          background: #efefef;
          text-align: center;
          height: 40px;
          line-height: 40px;
          &.active {
            background: #fff;
          }
        }
      }

      &.cover-info {
        > div {
          width: 33%;
          text-align: center;
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>
