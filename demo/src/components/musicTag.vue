<template>
    <div class="musicTag" :class="musicType">
       {{ text }} {{ level }}
    </div>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    name: {
        type: String,
        required: true
    },
    level: {
        type: String,
        default: ''
    }
})
let musicType = ''
let text = ''
switch(props.name){
    case 'Basic':
        musicType = 'basic'
        text = 'Basic'
        break
    case 'Advanced':
        musicType = 'advanced'
        text = 'Advanced'
        break
    case 'Expert':
        musicType = 'expert'
        text = 'Expert'
        break
    case 'Master':
        musicType = 'master'
        text = 'Master'
        break
    case 'ReMaster':
        musicType = 'reMaster'
        text = 'Re:Master'
        break
    case 'Utage':
        musicType = 'utage'
        text = 'Utage'
        break
    case 'SSS+':
        musicType = 'SSS_'
        text = 'SSS+'
        break
    case 'SSS':
        musicType = 'SSS'
        text = 'SSS'
        break
    case 'SS+':
        musicType = 'SS_'
        text = 'SS+'
        break
    case 'SS':
        musicType = 'common'
        text = 'SS'
        break
    case 'S+':
        musicType = 'common'
        text = 'S+'
        break
    case 'S':
        musicType = 'common'
        text = 'S'
        break
    case 'A':
        musicType = 'common'
        text = 'A'
        break

}

</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.musicTag{
    display: inline-block;
    padding: 0 10px;
    border-radius: 32px;
    height: 32px;
    min-width: 32px;
    line-height: 32px;
    font-size: 14px;
    text-align: center;
    color:white;

}
.advanced{
    background-color: #FB9C2D;
}
.basic{
    background-color: #22BB5B;
}
.expert{
    background-color: #F64861;
}
.master{
    background-color: #9E45E2;
}
.reMaster{
    background-color: #BA67F8;
}
.utage{
    background-color: #FF70FF;
}
.SSS_{
    border :1px solid #F44336;
    color :#F44336;
}
.SSS_:hover{
    background-color: #EFE8E7;
}
.SSS{
    border :1px solid #1E88E5;
    color :#1E88E5;
}
.SSS:hover{
    background-color: #E6EAEE;
}
.SS_{
    border :1px solid #FFA000;
    color :#FFA000;
}
.SS_:hover{
    background-color: #EFEBE5;
}
.common{
    border :1px solid #D1D1D1;
    color:black
}
.common:hover{
    background-color: #E6E6E6;
}
</style>