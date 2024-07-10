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
        <doubleThumb style="height: 40px;" :min=0 :max=22 :step=1 :describe="describeByLevel" @filter="filterByLevel">
        </doubleThumb>
      </div>
      <label class="chooseMode">
        <checkbox size="width: 32px;height: 32px;" v-model="chooseMode"></checkbox>
        <span>使用定数筛选</span>
      </label>
    </div>
    <div class="switchVersion">
      <div class="switchItem active" @click="toOld">
        旧乐谱
      </div>
      <div class="switchItem" @click="toNew">
        DX 2024
      </div>
      <div class="switchItemLine"></div>
    </div>
    <div class="tableContainer">
      <div class="oldTable">
      </div>
      <div class="newTable"></div>
    </div>
  </div>
</template>

<script setup>
import checkbox from './components/checkbox.vue'
import doubleThumb from './components/doubleThumb.vue'
import { ref, watchEffect, computed, onMounted, nextTick } from 'vue'
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
  // console.log(index1, index2)
}
const doms = {}

onMounted(() => {
  doms.switchItem = document.querySelectorAll('.switchItem')
  doms.switchItemLine = document.querySelector('.switchItemLine')

  doms.switchItem[0].addEventListener('mousedown',async (e) => {
    let couldDestroy = false;
    console.log(couldDestroy)
    const left = e.clientX - doms.switchItem[0].getBoundingClientRect().left;
    const top = e.clientY - doms.switchItem[0].getBoundingClientRect().top;
    const deeperBack = document.createElement('div');
    deeperBack.style.position = 'absolute';
    deeperBack.style.width = '100px';
    deeperBack.style.height = '100px';
    deeperBack.style.borderRadius = '50%';
    deeperBack.style.transform = `translate(-50%,-50%) scale(0)`;
    deeperBack.style.transition = '0.5s';
    deeperBack.style.left = left + 'px';
    deeperBack.style.top = top + 'px';
    deeperBack.style.backgroundColor = deeperBackColor[0];
    doms.switchItem[0].appendChild(deeperBack);
    //强行渲染
    deeperBack.getBoundingClientRect();
    deeperBack.style.transform = `translate(-50%,-50%) scale(2.8)`;
    
    const removeMouseUpAndMouseLeaveListeners = () => {  
        doms.switchItem[0].removeEventListener('mouseup', handleMouseUp);  
        doms.switchItem[0].removeEventListener('mouseleave', handleMouseLeave);  
        console.log('removeEventListener');  
    };  
    const handleMouseUp = () => {  
        if (couldDestroy) {  
            console.log('destroy in mouseup');  
            doms.switchItem[0].removeChild(deeperBack);  
            removeMouseUpAndMouseLeaveListeners();  
        } else {  
            couldDestroy = true;  
        }  
    };  

    const handleMouseLeave = () => {  
        if (couldDestroy) {  
            console.log('destroy in mouseleave');  
            doms.switchItem[0].removeChild(deeperBack);  
            removeMouseUpAndMouseLeaveListeners();  
        } else {  
            couldDestroy = true;  
        }  
    };  
    
    deeperBack.addEventListener('transitionend', () => {
      console.log('transitionend')
      if (couldDestroy) {
        console.log('destroy in transitionend')
        doms.switchItem[0].removeChild(deeperBack);
        removeMouseUpAndMouseLeaveListeners();  
      } else {
        couldDestroy = true;
      }
    })
    doms.switchItem[0].addEventListener('mouseup', handleMouseUp);  
    doms.switchItem[0].addEventListener('mouseleave', handleMouseLeave);  
  })

  doms.switchItem[1].addEventListener('mousedown',async (e) => {
    let couldDestroy = false;
    console.log(couldDestroy)
    const left = e.clientX - doms.switchItem[1].getBoundingClientRect().left;
    const top = e.clientY - doms.switchItem[1].getBoundingClientRect().top;
    const deeperBack = document.createElement('div');
    deeperBack.style.position = 'absolute';
    deeperBack.style.width = '100px';
    deeperBack.style.height = '100px';
    deeperBack.style.borderRadius = '50%';
    deeperBack.style.transform = `translate(-50%,-50%) scale(0)`;
    deeperBack.style.transition = '0.5s';
    deeperBack.style.left = left + 'px';
    deeperBack.style.top = top + 'px';
    deeperBack.style.backgroundColor = deeperBackColor[1];
    doms.switchItem[1].appendChild(deeperBack);
    //强行渲染
    deeperBack.getBoundingClientRect();
    deeperBack.style.transform = `translate(-50%,-50%) scale(2.8)`;
    
    const removeMouseUpAndMouseLeaveListeners = () => {  
        doms.switchItem[1].removeEventListener('mouseup', handleMouseUp);  
        doms.switchItem[1].removeEventListener('mouseleave', handleMouseLeave);  
        console.log('removeEventListener');  
    };  
    const handleMouseUp = () => {  
        if (couldDestroy) {  
            console.log('destroy in mouseup');  
            doms.switchItem[1].removeChild(deeperBack);  
            removeMouseUpAndMouseLeaveListeners();  
        } else {  
            couldDestroy = true;  
        }  
    };  

    const handleMouseLeave = () => {  
        if (couldDestroy) {  
            console.log('destroy in mouseleave');  
            doms.switchItem[1].removeChild(deeperBack);  
            removeMouseUpAndMouseLeaveListeners();  
        } else {  
            couldDestroy = true;  
        }  
    };  
    
    deeperBack.addEventListener('transitionend', () => {
      console.log('transitionend')
      if (couldDestroy) {
        console.log('destroy in transitionend')
        doms.switchItem[1].removeChild(deeperBack);
        removeMouseUpAndMouseLeaveListeners();  
      } else {
        couldDestroy = true;
      }
    })
    doms.switchItem[1].addEventListener('mouseup', handleMouseUp);  
    doms.switchItem[1].addEventListener('mouseleave', handleMouseLeave);  
  })
 
  toOld()
  
})
let deeperBackColor = ["", ""]
const toOld = () => {
  doms.switchItem[0].classList.add('active')
  doms.switchItem[1].classList.remove('active')
  doms.switchItemLine.classList.remove('right')
  deeperBackColor[0] = 'rgba(25, 118, 210,0.3)'
  deeperBackColor[1] = 'rgba(0,0,0,0.3)'
}
const toNew = () => {
  doms.switchItem[1].classList.add('active')
  doms.switchItem[0].classList.remove('active')
  doms.switchItemLine.classList.add('right')
  deeperBackColor[1] = 'rgba(25, 118, 210,0.3)'
  deeperBackColor[0] = 'rgba(0,0,0,0.3)'

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
  pointer-events: none;
  user-select: none;
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



.track {
  flex: 1;
  position: relative;
}


.chooseMode {
  line-height: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  user-select: none;
}

.switchVersion {
  display: flex;
  align-items: center;
  margin-top: 20px;
  height: 50px;
  position: relative;
}

.switchItem {
  user-select: none;
  position: relative;
  width: 100px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: rgba(0, 0, 0, 0.6);
  cursor: pointer;
  overflow: hidden;
}

.switchItem:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.switchItem.active {
  color: #1976D2
}

.switchItem.active:hover {
  background-color: rgba(25, 118, 210, 0.1);
}

.switchItemLine {
  position: absolute;
  width: 100px;
  height: 1px;
  background-color: #1976D2;
  bottom: 0;
  left: 0;
  transition: 0.5s;
}

.switchItemLine.right {
  transform: translateX(100%);
}

.deeperBack {
  position: absolute;
  width: 100px;
  height: 100px;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 50%;
  /* transform: translate(-50%, -50%) scale(0); */
}
.deeperBackAnimation {
  animation: deeper 0.5s forwards;
}
@keyframes deeper {
  from {
    transform: translate(-50%, -50%) scale(0);
  }

  to {
    transform: translate(-50%, -50%) scale(2.8);
  }
}
</style>