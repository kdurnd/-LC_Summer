<template>
    <label>
        <div class="checkbox_container" :style="props.size">
            <input type="checkbox" v-model="model">
            <div class="checkbox_mark" ></div>
        </div>
    </label>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
    size: {
        type: String,
        default: ''
    },
})
const model = defineModel()


</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
label {
    display: inline-block;
}
.checkbox_container {

    border-radius: 50%;
    border: 1px;
    position: relative;
    transition: 0.1s;
    background-color: transparent;
}

.checkbox_container::before {
    width: 100%;
    height: 100%;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    background-color: #aaa;
    transform: scale(0);
    transition: 0.1s;

}

.checkbox_container input {
    width: 50%;
    height: 50%;
    opacity: 0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;

}

.checkbox_mark {
    box-sizing: border-box;
    width: 50%;
    height: 50%;
    border: 2px solid #555;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 10%;

}

.checkbox_mark::after {
    display: none;
    content: '';
    box-sizing: border-box;
    position: absolute;
    transform: translate(30%, 38%) rotate(-45deg);
    width: 65%;
    height: 45%;
    border: 0.15em solid white;
    border-top: none;
    border-right: none;
}

input:checked~.checkbox_mark {
    background-color: rgb(25, 118, 210);
    border: rgb(25, 118, 210);
}

input:checked~.checkbox_mark::after {
    display: block;
}

.checkbox_container:hover {
    cursor: pointer;
    background-color: #ccc;
}

.checkbox_container:active::before {
    transform: scale(1);
}

.checkbox_container:has(input:checked):hover {
    background-color: rgb(209, 228, 246);
}

.checkbox_container:has(input:checked)::before {
    background-color: #A3C9ED;
}
</style>