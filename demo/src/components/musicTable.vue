<template>
    <table style="border: none; border-collapse: collapse;">
        <tr>
            <th class="couldSort" @click="sortByRank">排名<span class="up"><i class="ri-arrow-up-line"></i></span></th>
            <th>乐曲名</th>
            <th>难度</th>
            <th class="couldSort" @click="sortByConcreteLevel">定数<span class="up"><i
                        class="ri-arrow-up-line"></i></span></th>
            <th class="couldSort" @click="sortByAchievement">达成率<span class="up"><i class="ri-arrow-up-line"></i></span>
            </th>
            <th class="couldSort" @click="sortByRating">DX Rating<span class="up"><i
                        class="ri-arrow-up-line"></i></span></th>
            <th>操作</th>
        </tr>
        <tr v-for="(item, index) in showMusicList" :key="index">
            <td class="musicRank">
                <div>{{ item.rank }}</div>
            </td>
            <td class="musicName">
                <div class="hoverItem" :class="item.category === 'DX' ? 'isDx' : ''" @mouseenter="showDescription">{{
                item.name }}
                    <div class="musicDescription">
                        <p>id:841</p>
                        <p>Artist:hehehe</p>
                        <p>Version:hehehe</p>
                        <p>Genre:hehehe</p>
                        <p>BPM:222</p>
                    </div>
                </div>

            </td>
            <td class="musicDifficulty">
                <div class="hoverItem" @mouseenter="showDescription">
                    <musicTag :name="item.difficulty" :level="item.level" />
                    <div class="musicDescription">
                        <p>Charter:0_o</p>
                        <p>Tap:100</p>
                        <p>Hold:100</p>
                        <p>Slide:79</p>
                        <p>Break:39</p>
                    </div>
                </div>
            </td>
            <td class="musicConcreteLevel">
                <div>{{ item.concreteLevel }}</div>
            </td>
            <td class="musicAchievement">
                <div>{{ item.achievement }}
                    <musicTag :name="item.getAchievementLevel()" />
                </div>
            </td>
            <td class="musicRating">
                <div class="hoverItem" @mouseenter="showDescription">
                    {{ item.dxRating }}
                    <div class="musicDescription">
                        <p>已达成本曲最高DX Rating</p>
                    </div>
                </div>

            </td>
            <td class="operate">
                <div class="hoverItem" @mouseenter="showDescription" @click.stop="showCover">
                    <i class="ri-file-image-line"></i>
                    <div class="musicDescription">
                        <p>查看封面</p>
                    </div>
                    <div class="modal" @click.stop="hideCover">
                        <div class="board" @click.stop>
                            <div class="header">
                                <span>查看封面</span>
                                <span class="hideCover" @click="hideCover">×</span>
                            </div>
                            <div class="name">
                                {{ item.name }}
                            </div>
                            <!-- <img src="../../public/image.png" alt=""> -->
                        </div>
                    </div>
                </div>
            </td>
        </tr>
    </table>

</template>

<script setup>
import { nextTick, ref, defineProps, watchEffect, watch } from 'vue'
import musicTag from './musicTag.vue'

const props = defineProps({
    musicTableData: {
        type: Array,
        required: true
    }
})
const musicList = []
const showMusicList = ref([])
let isSorting = null;
watchEffect(() => {
    musicList.length = 0
    showMusicList.value.length = 0
    props.musicTableData.forEach(e => {
        musicList.push(e)
        showMusicList.value.push(e)
    })
    if(isSorting){
        switch(isSorting){
            case 'sortByRankFromLowToHigh':
                showMusicList.value.sort((a, b) => {
                    return a.rank - b.rank
                })
                 break
            case 'sortByRankFromHighToLow':
                showMusicList.value.sort((a, b) => {
                    return b.rank - a.rank
                })
                break
            case 'sortByConcreteLevelFromLowToHigh':
                showMusicList.value.sort((a, b) => {
                    return a.concreteLevel - b.concreteLevel
                })
                break
            case 'sortByConcreteLevelFromHighToLow':
                showMusicList.value.sort((a, b) => {
                    return b.concreteLevel - a.concreteLevel
                })
                break
            case 'SortByAchievementFromLowToHigh':
                showMusicList.value.sort((a, b) => {
                    return a.achievement - b.achievement
                })
                break
            case 'SortByAchievementFromHighToLow':
                showMusicList.value.sort((a, b) => {
                    return b.achievement - a.achievement
                })
                break
            case 'sortByRatingFromLowToHigh':
                showMusicList.value.sort((a, b) => {
                    return a.dxRating - b.dxRating
                })
                break
            case 'sortByRatingFromHighToLow':
                showMusicList.value.sort((a, b) => {
                    return b.dxRating - a.dxRating
                })    
                break
        }
    }
})





const showDescription = (e) => {
    // console.log('mouseenter')
    const target = e.target
    const description = target.querySelector('.musicDescription')
    if (description.classList.contains('animate')) {
        return
    }
    const targetRect = target.getBoundingClientRect()
    const descriptionRect = description.getBoundingClientRect()
    const left = (targetRect.left + targetRect.right) / 2
    let top = targetRect.top - descriptionRect.height - 10
    if (top < 0) {
        top = 10
    }
    description.style.left = left + 'px'
    description.style.top = top + 'px'
    description.classList.add('animate')
    const controller = new AbortController()
    let couldDisappear = false
    // console.log(couldDisappear)
    target.addEventListener('mouseleave', () => {
        // console.log('mouseleave', couldDisappear)
        if (couldDisappear) {
            description.classList.remove('animate')
            controller.abort()
            couldDisappear = false
        } else {
            couldDisappear = true
        }
    }, { signal: controller.signal })
    description.addEventListener('animationend', () => {
        // console.log('animationend', couldDisappear)
        if (couldDisappear) {
            description.classList.remove('animate')
            controller.abort()
            couldDisappear = false
        } else {
            couldDisappear = true
        }
    }, { signal: controller.signal })
}

const showCover = (e) => {
    const target = e.target
    const parent = target.parentElement
    const description = parent.querySelector('.musicDescription')
    description.classList.remove('animate')
    console.log(parent)
    const modal = parent.querySelector('.modal')
    console.log(modal)
    modal.style.display = 'block'
    //强行渲染
    modal.offsetHeight
    modal.style.transform = 'scale(1)'
    modal.style.opacity = '1'
}
const hideCover = async (e) => {
    const target = e.target
    let modal
    if (target.classList.contains('modal')) {
        modal = target
    } else if (target.classList.contains('hideCover')) {
        modal = target.parentElement.parentElement.parentElement
    }
    modal.style.transform = 'scale(0.5)'
    modal.style.opacity = '0'
    modal.addEventListener('transitionend', () => {
        modal.style.display = 'none'

    }, { once: true })


}

const clearActive = (th) => {
    const ths = document.querySelectorAll('th')
    ths.forEach(element => {
        if (th !== element && element.classList.contains('couldSort')) {
            element.classList.remove('active')
            const icon = element.querySelector('span')
            // console.log(icon)
            icon.classList.remove('down')
            icon.classList.add('up')
        }
    })
}
const sortByRank = (e) => {
    // console.log(e.target)
    let icon
    let th
    if (e.target.tagName === 'TH') {
        th = e.target
        icon = e.target.querySelector('span')
    } else if (e.target.tagName === 'SPAN') {
        th = e.target.parentElement
        icon = e.target
    } else if (e.target.tagName === 'I') {
        th = e.target.parentElement.parentElement
        icon = e.target.parentElement
    } else {
        console.log('error in sortByRank')
        return
    }
    clearActive(th)
    if (th.classList.contains('active')) {
        if (icon.classList.contains('up')) {
            isSorting = 'sortByRankFromHighToLow'
            showMusicList.value.reverse()
            icon.classList.toggle('down')
            icon.classList.toggle('up')
        }
        else if (icon.classList.contains('down')) {
            showMusicList.value = [...musicList]
            icon.classList.toggle('down')
            icon.classList.toggle('up')
            th.classList.remove('active')
            isSorting = null
            return
        }
    } else {
        isSorting = 'sortByRankFromLowToHigh'
        showMusicList.value.sort((a, b) => {
            return a.rank - b.rank
        })
        icon.classList.remove('down')
        icon.classList.add('up')
        th.classList.add('active')
    }
}

const sortByConcreteLevel = (e) => {
    console.log(e.target)
    let icon
    let th
    if (e.target.tagName === 'TH') {
        th = e.target
        icon = e.target.querySelector('span')
    } else if (e.target.tagName === 'SPAN') {
        th = e.target.parentElement
        icon = e.target
    } else if (e.target.tagName === 'I') {
        th = e.target.parentElement.parentElement
        icon = e.target.parentElement
    } else {
        console.log('error in sortByConcreteLevel')
        return
    }
    clearActive(th)
    if (th.classList.contains('active')) {
        if (icon.classList.contains('up')) {
            isSorting = 'sortByConcreteLevelFromHighToLow'
            showMusicList.value.reverse()
            icon.classList.toggle('down')
            icon.classList.toggle('up')
        }
        else if (icon.classList.contains('down')) {
            showMusicList.value = [...musicList]
            icon.classList.toggle('down')
            icon.classList.toggle('up')
            th.classList.remove('active')
            isSorting = null
            return
        }
    } else {
        isSorting = 'sortByConcreteLevelFromLowToHigh'
        showMusicList.value.sort((a, b) => {
            return a.concreteLevel - b.concreteLevel
        })
        icon.classList.remove('down')
        icon.classList.add('up')
        th.classList.add('active')
    }
}

const sortByAchievement = (e) => {
    let icon
    let th
    if (e.target.tagName === 'TH') {
        th = e.target
        icon = e.target.querySelector('span')
    } else if (e.target.tagName === 'SPAN') {
        th = e.target.parentElement
        icon = e.target
    } else if (e.target.tagName === 'I') {
        th = e.target.parentElement.parentElement
        icon = e.target.parentElement
    } else {
        console.log('error in SortByAchievement')
        return
    }
    clearActive(th)

    if (th.classList.contains('active')) {
        if (icon.classList.contains('up')) {
            isSorting = 'SortByAchievementFromHighToLow'
            showMusicList.value.reverse()
            icon.classList.toggle('down')
            icon.classList.toggle('up')
        }
        else if (icon.classList.contains('down')) {
            showMusicList.value = [...musicList]
            icon.classList.toggle('down')
            icon.classList.toggle('up')
            th.classList.remove('active')
            isSorting = null
            return
        }
    } else {
        isSorting = 'SortByAchievementFromLowToHigh'
        showMusicList.value.sort((a, b) => {
            return a.achievement - b.achievement
        })
        icon.classList.remove('down')
        icon.classList.add('up')
        th.classList.add('active')
    }
}

const sortByRating = (e) => {
    let icon
    let th
    if (e.target.tagName === 'TH') {
        th = e.target
        icon = e.target.querySelector('span')
    } else if (e.target.tagName === 'SPAN') {
        th = e.target.parentElement
        icon = e.target
    } else if (e.target.tagName === 'I') {
        th = e.target.parentElement.parentElement
        icon = e.target.parentElement
    } else {
        console.log('error in sortByRating')
        return
    }
    clearActive(th)

    if (th.classList.contains('active')) {
        if (icon.classList.contains('up')) {
            isSorting = 'sortByRatingFromHighToLow'
            showMusicList.value.reverse()
            icon.classList.toggle('down')
            icon.classList.toggle('up')
        }
        else if (icon.classList.contains('down')) {
            showMusicList.value = [...musicList]
            icon.classList.toggle('down')
            icon.classList.toggle('up')
            th.classList.remove('active')
            isSorting = null
            return
        }
    } else {
        isSorting = 'sortByRatingFromLowToHigh'
        showMusicList.value.sort((a, b) => {
            return a.dxRating - b.dxRating
        })
        icon.classList.remove('down')
        icon.classList.add('up')
        th.classList.add('active')
    }
}
</script>

<style scoped>
table {
    width: 100%;
}

th {
    user-select: none;
    text-align: left;
    height: 20px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-size: 16px;
    color: #aaa
}

.couldSort:hover {
    color: #000;
}

.couldSort:hover span {
    opacity: 1;
    color: #aaa;
}

.couldSort.active {
    color: #000
}

.couldSort.active span {
    opacity: 1;
    color: #000;
}

.couldSort span {
    display: inline-block;
    transition: .3s;
    opacity: 0;
    /* background-color: aqua; */
}

.couldSort span.down {
    transform: rotate(180deg);
}

.couleSort span.up {
    transform: rotate(0);
}

td {
    height: 20px;
    padding: 10px;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
}

tr:first-child:hover {
    background-color: transparent;
}

tr:hover {
    background-color: #f9f9f9;
}

.musicRank {
    font-weight: 600;
}

.isDx::before {
    content: 'DX';
    color: #1976D2;
    margin-right: 5px;
}

.hoverItem {
    display: inline-block;
}

.musicDescription {
    padding: 10px;

    position: fixed;
    opacity: 0;
    transform: translate(-50%);
    background-color: rgba(0, 0, 0, 0.3);
    color: white;
    pointer-events: none;
    z-index: 1000;
}

.musicDescription p {
    margin: 5px;
}

.modal {
    display: none;
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.3);
    transform: scale(0.5);
    transition: .1s;
    opacity: 0;
}

.board {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    overflow: auto;
    border-radius: 5px;
    padding: 10px 20px;
    width: 500px;
    max-height: 560px;
    height: 90%;
}

.board .header {
    display: flex;
    justify-content: space-between;
}

.hideCover {
    cursor: pointer;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    font-size: 20px;
}

.hideCover:hover {
    background-color: rgba(0, 0, 0, 0.3);
}
</style>

<style>
.animate {
    animation: fadeIn 0.3s forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translate(-50%) scale(0);
    }

    to {
        opacity: 1;
        transform: translate(-50%) scale(1);
    }

}

.operate i {
    font-size: 24px;
}
</style>