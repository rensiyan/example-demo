<template>
  <div class="main-container" id="container">
   
   
  </div>
</template>

<script lang="ts" setup>

</script>
<style lang="scss" scoped>
.main-container {
  .headr-tab {
    display: flex;
    position: relative;
    border-bottom: 1px #c1c1c1ff solid;
    .page-tabs {
      width: 97.5%;
      background: #fafafa;
    }
  }
}

.tabOption {
  height: 34px;
  line-height: 34px;
  width: 2.5%;
  background: #fafafa;
  cursor: pointer;
  text-align: center;
  border-left: 1px solid #c1c1c1ff;
  &-item {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    &:hover {
      background: #eee;
      .el-icon {
        animation: twinkle 0.3s ease-in-out;
      }
    }
  }
  .el-icon {
    color: #999;
    margin: 0 5px;
  }
}

.refresh-icon {
  transition: all 0.3s linear;
  transform: rotate(v-bind("`${rotate}deg`"));
}

@keyframes twinkle {
  0% {
    transform: scale(0);
  }
  80% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

@media screen and (max-width: 1661px) {
  .tabOption {
    .el-icon {
      font-size: 14px;
    }
  }
}

:deep(.el-tabs--card > .el-tabs__header .el-tabs__item.is-active.is-closable .is-icon-close) {
  visibility: initial;
}
:deep(.el-tabs__nav-wrap) {
  position: relative;
  // .el-tabs__nav-scroll {
  //   padding: 0 20px;
  // }

  .el-tabs__nav-prev {
    position: absolute;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    text-align: center;
    background: #fafafa;
    z-index: 5;
    border-right: 1px solid #c1c1c1ff;
    .el-icon {
      font-size: 18px;
      color: #b1b1b1;
    }
  }
  .el-tabs__nav-next {
    position: absolute;
    right: 0;
    width: 36px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #fafafa;
    border-left: 1px solid #c1c1c1ff;
    z-index: 5;
    .el-icon {
      font-size: 18px;
      color: #b1b1b1;

      svg {
        font-size: 18px;
      }
    }
  }
}
</style>
