<script setup lang="ts">
  import axios from 'axios';
  import { onMounted, reactive, ref, toRefs } from 'vue';

  // interface IData {
  //   name: string;
  //   type: number;
  // }

  const data:any = reactive({
    name: "tina", 
    areaTree: [],
    chinaDayList: [],
    chinaTotal: {},
    china: [],
    hbData: {},
    mapType: 1,
    lineType: 1,
    lastUpdataTime: "",
  })

  onMounted(()=>{
    axios('/api/ug/api/wuhan/app/data/list-total'
    ).then((res)=> {
      console.log(res);
      data.areaTree = res.data.data.areaTree;
      data.chinaDayList = res.data.data.chinaDayList;
      data.chinaTotal = res.data.data.chinaTotal;
      data.china = data.areaTree.find((v:any) => v.id === "0").children;
      data.hbData = data.china.find((v:any) => v.id === "420000");
      console.log(data.huData);
    });
  });
  
  let active = ref<Boolean>(true);

  let tabClick = (flag: Boolean) => {
    active.value = flag;
  }

  const { chinaTotal, huData } = toRefs(data);
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

      <!-- 全国疫情数据 -->
      <div v-if="chinaTotal.total" v-show="active" class="cover-info">
        <div>
          <h4>境外输入</h4>
          <p>{{chinaTotal.total.input}}</p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.today.input}}</span>
          </p>
        </div>
        <div>
          <h4>无症状感染</h4>
          <p>{{chinaTotal.extData.noSymptom}}</p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.extData.incrNoSymptom}}</span>
          </p>
        </div>
        <div>
          <h4>现有确诊</h4>
          <p>
            {{
              chinaTotal.total.confirm -
              chinaTotal.total.dead -
              chinaTotal.total.heal
            }}
          </p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.today.storeConfirm}}</span>
          </p>
        </div>
        <div>
          <h4>累计确诊</h4>
          <p>{{chinaTotal.total.confirm}}</p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.today.confirm}}</span>
          </p>
        </div>
        <div>
          <h4>累计死亡</h4>
          <p>{{chinaTotal.total.dead}}</p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.today.dead}}</span>
          </p>
        </div>
        <div>
          <h4>累计治愈</h4>
          <p>{{chinaTotal.total.heal}}</p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.today.heal}}</span>
          </p>
        </div>
      </div> 

      <!-- 湖北疫情数据 -->
      <div v-if="chinaTotal.total" v-show="!active" class="cover-info">
        <div>
          <h4>累计确诊</h4>
          <p>{{chinaTotal.total.confirm}}</p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.today.confirm}}</span>
          </p>
        </div>
        <div>
          <h4>累计死亡</h4>
          <p>{{chinaTotal.total.dead}}</p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.today.dead}}</span>
          </p>
        </div>
        <div>
          <h4>累计治愈</h4>
          <p>{{chinaTotal.total.heal}}</p>
          <p>
            <span>较昨日</span>
            <span>+{{chinaTotal.today.heal}}</span>
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
