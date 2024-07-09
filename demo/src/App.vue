<template>
  <div class="container">
    <div class="header">
      <span class="title">舞萌 DX 成绩表格</span>
      <label class="highLevelSet">
        <checkbox size="width: 32px;height: 32px;" v-model="highLevelSet"></checkbox>
        <span>使用高级设置</span>
      </label>
      <div class="relative search">
        <input type="text" class="searchMusic" v-model="searchMusic">
        <span class="searchMusic-placeholder">查找乐曲</span>
        <div class="searchMusic-bottom"></div>
      </div>
    </div>
    <div class="basic-level">
      底分:10541 + 4460 = 15001
    </div>
    <div class="filter">
      <span>{{ mode }}</span>
      <div class="track">
        <doubleThumb style="height: 40px;" :min=0 :max=22 :step=1 :describe="describeByLevel" @filter="filterByLevel"></doubleThumb>
      </div>
      <label class="chooseMode">
        <checkbox size="width: 32px;height: 32px;" v-model="chooseMode"></checkbox>
        <span>使用定数筛选</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import checkbox from './components/checkbox.vue'
import doubleThumb from './components/doubleThumb.vue'
import { ref, watchEffect, computed } from 'vue'
const searchMusic = ref('')
const highLevelSet = ref(false)
const chooseMode = ref(false)
const mode = computed(() => {
  return chooseMode.value ? '等级' : '定数'
})
const describeByLevel = (e) => {
  const arr = ['1', '2', '3', '4', '5', '6', '7', '7+', '8', '8+', '9', '9+', '10', '10+', '11', '11+', '12', '12+', '13', '13+', '14', '14+', '15']
  return arr[e]
}
const filterByLevel = (index1, index2) => {
  console.log(index1, index2)
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.relative {
  position: relative;
}

.container {
  width: 90%;
  margin: 0 auto;
  padding: 0 20px;
  color: rgba(0, 0, 0, 0.87);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;

}

.title {
  font-size: 20px;
  font-weight: 500;
  line-height: 100px;
  flex: 1;
}

.highLevelSet {
  user-select: none;
  margin-right: 20px;
  font-size: 16px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
  display: flex;

}

.highLevelSet span {
  line-height: 32px;
  vertical-align: 1px;
  font-size: 16px;
}

.search {
  flex: 1;
}

.searchMusic {
  outline: none;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.6);
  border-width: 0 0 1px 0;
  height: 32px;
}

.searchMusic-placeholder {
  color: rgba(0, 0, 0, 0.6);
  font-size: 16px;
  position: absolute;
  left: 0;
  top: 0;
}

.searchMusic-bottom {
  width: 0;
  height: 2px;
  background-color: rgb(25, 118, 210);
  position: absolute;
  bottom: 0;
  left: 50%;
  transition: 0.6s;
}

.searchMusic:focus+.searchMusic-placeholder {
  display: none;
}

.searchMusic:focus+.searchMusic-placeholder+.searchMusic-bottom {
  width: 100%;
  left: 0;
}

.basic-level {
  color: rgba(0, 0, 0, 0.6);
  font-size: 14px;
}

.filter {
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 30px;
  height: 40px;
}

input[type="range"] {
  width: 100%;
  height: 2px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.track {
  flex: 1;
  position: relative;
}

input[type="range"]::-webkit-slider-thumb {
  background: #008cff;
  /* Chrome, Safari, Opera, Edge, IE */
}

input[type="range"]::-webkit-slider-runnable-track {
  background: rgba(0, 0, 0, 1);
  /* Chrome, Safari, Opera, Edge */
}

.chooseMode {
  line-height: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  user-select: none;
}
</style>