<template>
    <div class="doubleThumb_container">
        <div class="relative">
            <div class="doubleThumb_track"></div>
            <div class="highlight"></div>
            <div class="doubleThumb_wrapper">
                <div class="doubleThumb_thumb"></div>
                <div class="floatWindow">{{ describe(index1) }}</div>
            </div>
            <div class="doubleThumb_wrapper">
                <div class="doubleThumb_thumb"></div>
                <div class="floatWindow">{{ describe(index2) }}</div>
            </div>
        </div>

    </div>

</template>

<script setup>
import { defineProps, ref, defineModel, onMounted, watchEffect, computed,defineEmits } from 'vue'
const props = defineProps({
    min: {
        type: Number,
        default: 0
    },
    max: {
        type: Number,
        default: 100
    },
    step: {
        type: Number,
        default: 1,
    },
    describe: {
        type: Function,
        default: (e) => e
    }
})
const emits = defineEmits(['filter'])
let min = props.min
let max = props.max
let step = props.step
let offset = 0
if (props.min != 0) {
    min = 0
    max -= props.min
    offset = props.min

}
const index1 = ref(min+offset);
const index2 = ref(max+offset);
watchEffect(() => {
    emits('filter', index1.value, index2.value)
})
onMounted(() => {
    const highlight = document.querySelector('.highlight')
    const floatWindow = document.querySelectorAll('.floatWindow')
    const container = document.querySelector('.doubleThumb_container')
    const thumb = document.querySelectorAll('.doubleThumb_thumb')
    const doubleThumb_wrapper = document.querySelectorAll('.doubleThumb_wrapper')
    const track = document.querySelector('.doubleThumb_track')
    const thumbWidth = thumb[0].offsetWidth
    let trackWidth = track.offsetWidth
    let trackRect = track.getBoundingClientRect()
    doubleThumb_wrapper[0].style.left = `0px`
    doubleThumb_wrapper[1].style.left = `${trackWidth}px`
    window.addEventListener('resize', () => {
        console.log('resize')
        trackWidth = track.offsetWidth
        trackRect = track.getBoundingClientRect()
        updateUi()
    })
    const updateUi = () => {
        const left1 = getLeft(index1.value - offset)
        const left2 = getLeft(index2.value - offset)
        doubleThumb_wrapper[0].style.left = `${left1}px`
        doubleThumb_wrapper[1].style.left = `${left2}px`
        setHighlight()
    }
    const getIndex = (x) => {
        if (x < trackRect.left) {
            return min
        }
        if (x > trackRect.right) {
            return max
        }
        const left = x - trackRect.left
        const percent = left / trackWidth
        const index = Math.round(min + percent * (max - min) / step) * step + min
        return index
    }
    const getLeft = (index) => {
        const percent = index / (max - min)
        return percent * trackWidth
    }
    const setHighlight = () => {
        const left1 = parseInt(doubleThumb_wrapper[0].style.left)
        const left2 = parseInt(doubleThumb_wrapper[1].style.left)
        const left = Math.min(left1, left2)
        const width = Math.abs(left1 - left2)
        highlight.style.left = `${left}px`
        highlight.style.width = `${width}px`
    }
    setHighlight()
    const moveThumb1 = (e) => {
        const index = getIndex(e.pageX)
        index1.value = index + offset
        const left = getLeft(index)
        if (left > trackWidth) {
            doubleThumb_wrapper[0].style.left = `${trackWidth}px`
            setHighlight()
        }
        else {
            doubleThumb_wrapper[0].style.left = `${left}px`
            setHighlight()
        }
    }
    const moveThumb2 = (e) => {
        const index = getIndex(e.pageX)
        index2.value = index + offset
        const left = getLeft(index)
        if (left > trackWidth) {
            doubleThumb_wrapper[1].style.left = `${trackWidth}px`
            setHighlight()
        }
        else {
            doubleThumb_wrapper[1].style.left = `${left}px`
            setHighlight()
        }
    }
    thumb[0].addEventListener('mousedown', (e) => {
        e.stopPropagation()
        floatWindow.forEach(e => e.classList.add('active'))
        document.addEventListener('mousemove', moveThumb1)
        document.addEventListener('mouseup', () => {
            floatWindow.forEach(e => e.classList.remove('active'))
            document.removeEventListener('mousemove', moveThumb1)
        })
    })
    thumb[1].addEventListener('mousedown', (e) => {
        e.stopPropagation()
        floatWindow.forEach(e => e.classList.add('active'))
        document.addEventListener('mousemove', moveThumb2)
        document.addEventListener('mouseup', () => {
            floatWindow.forEach(e => e.classList.remove('active'))
            document.removeEventListener('mousemove', moveThumb2)
        })
    })

    container.addEventListener('mousedown', (e) => {
        floatWindow.forEach(e => e.classList.add('active'))
        if (Math.abs(parseInt(doubleThumb_wrapper[0].getBoundingClientRect().left + thumb[0].style.width/2) - e.pageX) < Math.abs(parseInt(doubleThumb_wrapper[1].getBoundingClientRect().left+ thumb[0].style.width/2) - e.pageX)) {
            const index = getIndex(e.pageX)
            const left = getLeft(index)
            doubleThumb_wrapper[0].style.left = `${left}px`
            setHighlight()
            index1.value = index+offset
            document.addEventListener('mousemove', moveThumb1)
            document.addEventListener('mouseup', () => {
                floatWindow.forEach(e => e.classList.remove('active'))
                document.removeEventListener('mousemove', moveThumb1)
            })
        }
        else {
            const index = getIndex(e.pageX)
            const left = getLeft(index)
            doubleThumb_wrapper[1].style.left = `${left}px`
            setHighlight()
            index2.value = index + offset
            document.addEventListener('mousemove', moveThumb2)
            document.addEventListener('mouseup', () => {
                floatWindow.forEach(e => e.classList.remove('active'))
                document.removeEventListener('mousemove', moveThumb2)
            })
        }
    })


})
</script>

<style scoped>
.doubleThumb_container {
    position: relative;
    display: flex;
    align-items: center;
}

.relative {
    position: relative;
    width: 100%;
}

.doubleThumb_track {
    user-select: none;
    width: 100%;
    height: 1px;
    background-color: #8AC5FF;
}

.highlight {
    user-select: none;
    background-color: #1975D2;
    height: 1px;
    position: absolute;
    top: 0;
}

.doubleThumb_thumb {
    user-select: none;
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #1975D2;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
}

.doubleThumb_thumb::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: rgba(25, 117, 210, 0.3);
    transform: scale(0);
    transition: .5s;
    z-index: -10;
}

.doubleThumb_thumb:hover::after {
    transform: scale(3);
}

.doubleThumb_thumb:active::after {
    transform: scale(5);
}

.floatWindow {
    transition: .5s;
    z-index: -1;
    position: absolute;
    width: 30px;
    height: 30px;
    top: 0;
    left: 0;
    transform-origin: center;
    transform: translate(-50%, -50%) scale(0);
    background-color: #1976D2;
    border-radius: 50%;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    user-select: none;
    opacity: 0;
    z-index: 10;
    color: white;
}

.floatWindow::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 10px solid;
    border-color: #1976D2 transparent transparent transparent;
    top: 85%;
    left: 50%;
    transform: translate(-50%, 4%);
}

.floatWindow.active {
    transform: translate(-50%, -150%) scale(1);
    opacity: 1;
}

.doubleThumb_wrapper {
    position: absolute;
    top: 0;
    left: 0;
}
</style>