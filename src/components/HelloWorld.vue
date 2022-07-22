<script setup lang="ts">
  import { onMounted, reactive, ref, toRefs } from 'vue';
  // import type { IData } from "../type/index";
  import { InteData, initDataFun } from "../pegeJs/index";
  
  const data:any = reactive(new InteData());

  onMounted(()=>{
    initDataFun(data);
  });

  let active = ref<Boolean>(true);
  let mapType = ref<Boolean>(true);

  let tabClick = (flag: Boolean) => {
    active.value = flag;
  }
  let mapTypeChinage = (flag: Boolean) => {
    mapType.value = flag;
  }

  const { chinaTotal, scData } = toRefs(data);
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
          <div @click="tabClick(false)" :class="{'active': !active}">四川 疫情数据</div>
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

        <!-- 四川疫情数据 -->
        <div v-if="chinaTotal.total" v-show="!active" class="cover-info">
          <div>
            <h4>累计确诊</h4>
            <p>{{scData.total.confirm}}</p>
            <p>
              <span>较昨日</span>
              <span>+{{scData.today.confirm}}</span>
            </p>
          </div>
          <div>
            <h4>累计死亡</h4>
            <p>{{scData.total.dead}}</p>
            <p>
              <span>较昨日</span>
              <span>+{{scData.today.dead}}</span>
            </p>
          </div>
          <div>
            <h4>累计治愈</h4>
            <p>{{scData.total.heal}}</p>
            <p>
              <span>较昨日</span>
              <span>+{{scData.today.heal}}</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>

  <!-- echarts -->
  <div class="data-map content">
    <h3>中国疫情</h3>
    <div class="map-box">
      <div
        :class="mapType == true ? 'to-left' : 'to-right'"
        id="map"
      ></div>
      <div
        :class="mapType == false ? 'to-left' : 'to-right'"
        id="map2"
      ></div>
    </div>
    <div class="map-btn">
      <div @click="mapTypeChinage(true)" :class="{'active': mapType}">
        现有确诊
      </div>
      <div @click="mapTypeChinage(false)" :class="{'active': !mapType}">
        累计确诊
      </div>
    </div>
  </div>


</template>

<style lang="scss" scoped>
  @keyframes toRight {
    from {
      left: 0;
    }
    to {
      left: calc(0px - 100vw + 1rem);
    }
  }
  @keyframes toLeft {
    from {
      left: calc(0apx - 100vw + 1rem);
    }
    to {
      left: 0;
    }
  }
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
  .data-map,
  .data-list {
    margin-top: 200px;
    overflow: hidden;
    h3 {
      border-left: 8px solid #e10000;
      padding-left: 1rem;
    }
  }
  .map-box {
    display: flex;
    width: 200%;
  }
  #line,
  #line1,
  #line2 {
    height: 400px;
    widows: 100%;
  }
  #map,
  #map2 {
    height: 350px;
    width: 50%;
    animation-fill-mode: forwards;
  }
  .to-left {
    animation: toLeft 1s;
  }
  .to-right {
    animation: toLeft 1s;
  }
  #map {
    margin-right: 2rem;
  }
  .map-btn,
  .line-btn {
    display: flex;
    justify-content: space-between;
    align-items: center;
      > div {
        width: 45%;
        height: 40px;
        line-height: 40px;
        border: 1px solid #d2d2d2;
        box-shadow: 0 5px 7px 1px rgb(0 0 0 / 5%);
        border-radius: 5px;
        text-align: center;
        &.active {
          border-color:#ce4733;
          background-color: #fef7f7;
          color: #ce2c1e;
        }
      }
  }
  .line-btn {
    > div {
      width: 30%;
      height: 55px;
      line-height: 25px;
      padding-top: 5px;
    }
  }
  .data-list {
    margin-top: 20px;
  }

</style>
