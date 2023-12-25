<template>
  <header class="app-header">
    <div class="rigth-wrap">
     
    </div>
  </header>
 
</template>
<script lang="ts" setup>

</script>
<style scoped lang="scss">
:deep(.el-drawer__footer) {
  padding: 0px;
}
:deep(.el-drawer) {
  width: 18% !important;
}
.person-info {
  width: 200px;
  border: 1px solid gray;
}
.orgName {
  font-size: 14px;
  color: #000;
  margin-right: 0px;

  &:hover {
    color: #267cf9;
  }
}

.help-assistant {
  width: 126px;
  padding: 9px 0;
  img {
    width: 12px;
    margin-right: 10px;
  }

  &:deep(.el-dropdown-menu__item) {
    font-size: 12px;
    color: #000;
    padding: 2px 10px;
  }
}
.pop-class {
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  img,
  div {
    width: 100%;
    text-align: center;
    color: #666;
  }
  div {
    // margin-top: -17px;
  }
}

.nickName {
  font-size: 14px;
  color: #666;
  margin: 0 6px;
}
:deep(#useCenter) {
  padding: 18px 20px;
  align-items: center;
  justify-items: center;
  border-bottom: 1px solid rgba(230, 230, 230, 1);
  font-size: 14px;
  color: #333;
}
:deep(.selfDialogs) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  margin-top: 0 !important;
  .fixedDialog {
    .el-dialog__body {
      padding: 0 !important;
    }
  }
}
</style>
<style lang="scss">
.help-popper-class {
  height: 154px;
  display: flex;
  align-items: center;
}
</style>
