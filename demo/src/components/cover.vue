<template>
    <div class="modal">
        <div class="board">
            <div class="header">
                <span>查看封面</span>
                <span>x</span>
            </div>
            <div class="name">

            </div>
            <img src="" alt="">
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>
.modal{
    position: fixed;
    width: 100%;
    height: 100%;
}
.board{
    position: absolute;
    top:0;
    left:0;
    transform: translate(-50%,-50%);
    overflow: auto;
}
</style>