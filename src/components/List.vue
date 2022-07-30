<script setup lang = "ts">
    import { reactive } from "vue";
    import { color, number } from "echarts";
    const props = defineProps({
        list: Array,
        showChildren: Boolean,
    });
    const data = reactive({
    isShowChildren: "",
    });

    const getChowChildren = (id: string) => {
        data.isShowChildren == id
        ? (data.isShowChildren = "")
        : (data.isShowChildren = id);
    };
</script>

<template>
    <div class="list-box">
    <div class="info-title info">
      <p>地区</p>
      <p>现有确诊</p>
      <p>确诊</p>
      <p>死亡</p>
      <p>治愈</p>
    </div>
    <div class="list" v-for="i in list" :key="i.id">
      <div class="p-box">
        <div @click="getChowChildren(i.id)" class="info">
          <p>{{ i.name }}</p>
          <p>{{ i.total.confirm - i.today.dead - i.today.heal }}</p>
          <p>
            <span>{{ i.total.confirm }}</span>
            <span>较昨日{{ i.today.confirm }}</span>
          </p>
          <p>{{ i.total.dead }}</p>
          <p>{{ i.total.heal }}</p>
        </div>
        <div v-if="showChildren">
          <!-- <div> -->
          <div v-show="data.isShowChildren == i.id" class="children-box">
            <List :list="i.children" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-box {
  border: 1px solid #d1d1d1;
  margin: 1rem 0;
  .p-box {
    .children-box {
      margin-left: 1rem;
      .list-box {
        border: none;
      }
      .info-title {
        height: 30px;
        line-height: 30px;
      }
      p {
        &:nth-child(1) {
          font-weight: 600;
          color: #999;
        }
      }
    }
  }
}
.info-title {
  font-weight: 600;
  color: #000;
  font-size: 16px;
  height: 50px;
  line-height: 50px;
  background: #d1d1d1;
}

.info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  > p {
    width: 15%;
    text-align: center;
    white-space: nowrap;
    &:nth-child(1) {
      font-weight: 600;
      color: #000;
    }
    &:nth-child(2) {
      width: 23%;
      color: red;
    }
    &:nth-child(3) {
      width: 23%;
      span {
        display: block;
        &:last-child {
          color: #999;
        }
      }
    }
  }
}
.list {
  &:nth-of-type(odd) {
    background: #f6f6f6;
  }
  .info {
    height: 60px;
    line-height: 60px;

    .p{
      line-height: 20px;
    }
  }
}
</style>