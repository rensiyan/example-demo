<template>
    <div class="app-left-container">
        <div class="title toplogo"></div>
        <module-menu style="border-top: 1px solid rgba(55, 57, 65, 1)" class="menus-wrap"></module-menu>
        <div class="bottom-logo"></div>
    </div>
</template>

<script lang="ts" setup></script>

<style lang="scss" scoped>
    .app-left-container {
        width: v-bind(width);
    }
    .menus-wrap {
        margin-left: 0;
    }
    .title-span {
        color: white;
        text-align: center;
        // margin-left: 80px;
        font-size: 20px;
    }
    // .bottom-logo,.toplogo{
    //   justify-content: flex-start !important;
    // }
</style>
