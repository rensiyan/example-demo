<template>
  <Drawer :model-value="props.drawerVal" :class-name='props.className' :mask='props.mask' :mask-style='props.maskStyle'
    :styles='props.styles' :title="title" :closable='closable' :mask-closable='maskClosable' :scrollable='scrollable'
    :placement='placement' :transfer='transfer' :inner='inner' @on-close='closeDrawer'
    @on-visible-change='visibleChange'>
    <!-- slot 添加自定义配置项 -->
    <div style="display: flex;">
      <slot></slot>
      <div>
        <div style="display: flex;justify-content: space-between;width:200px">
          <div>
            已选{{ props.selectedData?.length }}个
          </div>
          <div @click="onEmpty">
            清空
          </div>

        </div>
        <div style="display: flex;">
          <div v-for="(item, index) in props.selectedData" :key="index"
            style="width: 40px;height: 40px;border: 1px solid grey;margin:5px" @click="deleteItem(index)">{{ item.name
            }}
          </div>
        </div>
      </div>

    </div>
    <div class="demo-drawer-footer">
      <Button style="margin-right: 8px" @click=visibleChange>Cancel</Button>
      <Button type="primary" @click=visibleChange>Submit</Button>
    </div>

  </Drawer>
</template>

<script setup lang='ts'>
import { ref, reactive, onMounted, defineProps, defineEmits } from 'vue';


const props = defineProps({
  drawerVal: { //抽屉是否显示
    type: Boolean,
    default: false
  },
  mask: { //是否显示遮罩层
    type: Boolean,
    default: true
  },
  closable: { //是否显示右上角的关闭按钮
    type: Boolean,
    default: false
  },
  maskClosable: { //是否允许点击遮罩层关闭
    type: Boolean,
    default: true
  },
  scrollable: { //页面是否可以滚动
    type: Boolean,
    default: false
  },
  transfer: { //是否将抽屉放置于 body 内
    type: Boolean,
    default: true
  },
  inner: { //是否设置抽屉在某个元素内打开，开启此属性时，应当关闭 transfer 属性
    type: Boolean,
    default: false
  },
  maskStyle: Object,//遮罩层样式
  styles: Object,//抽屉中间样式

  placement: String,//抽屉的方向，可选值为 left 或 right
  title: String,//抽屉标题，如果使用 slot 自定义了页头，则 title 无效
  className: String,//在这里设置class名除了更改样式需要，选择内容也需要
  selectedData: Object//选择的数据


})

const emits = defineEmits(['closeDrawer', 'visibleChange', 'onEmpty', 'deleteItem'])

const onEmpty = () => {
  emits('onEmpty', 0)
}
const deleteItem = (index: number) => {
  emits('deleteItem', index)
}

const closeDrawer = () => {//关闭抽屉时触发
  emits('closeDrawer');
}
const visibleChange = (data) => {//状态发生改变触发
  emits('visibleChange', data);
}


</script>
<style scoped>
.demo-drawer-footer {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  border-top: 1px solid #e8e8e8;
  padding: 10px 16px;
  text-align: right;
  background: #fff;
}
</style>