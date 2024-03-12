<template>
  <Button size="large" type="primary" @click="getUploadData">上传</Button>
  <CDrawer :drawerVal='openDrawer.value' :selectedData="selectedData" :className="openDrawer.class" :width="'750px'"
    :title="openDrawer.title" @closeDrawer='closeDrawer' @onEmpty="onEmpty" @deleteItem="deleteItem">
    <vxe-table border style="width: 500px;" ref="tableRef" :data="tableData" @checkbox-all="selectAllChangeEvent"
      @checkbox-change="selectChangeEvent">
      <vxe-column type="checkbox" width="60"></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
      <vxe-column field="age" title="Age"></vxe-column>
      <vxe-column field="address" title="Address" show-overflow></vxe-column>
    </vxe-table>

  </CDrawer>


</template>



<script lang='ts' setup>
import { ref, reactive, onMounted } from 'vue';
import CDrawer from "./CDrawer";
import { VXETable, VxeTableInstance, VxeTableEvents } from 'vxe-table'
interface RowVO {
  id: number
  name: string
  role: string
  sex: string
  age: number
  address: string
}

const tableRef = ref<VxeTableInstance<RowVO>>()
const selectedData = ref()
const tableData = ref<RowVO[]>([
  { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
  { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
  { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
  { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 23, address: 'test abc' },
  { id: 10005, name: 'Test5', role: 'Develop', sex: 'Women', age: 30, address: 'Shanghai' }
])
// ==========================
const openDrawer = reactive({
  value: false, //是否打开抽屉
  class: '', //根据class来选取内容  
  title: '' //头部提示内容
})
const getUploadData = () => {
  //点击上传事件
  openDrawer.class = 'safeDrawer'
  openDrawer.title = '上传'
  openDrawer.value = true
}
//选中cer
const selectChangeEvent = () => {
  selectedData.value = tableRef.value?.getCheckboxRecords()

}
const selectAllChangeEvent = () => {
  selectedData.value = tableRef.value?.getCheckboxRecords()
}
const closeDrawer = () => {
  //关闭抽屉事件
  openDrawer.value = false
}
//删除每一小项
const deleteItem = (index: number) => {
  selectedData.value.splice(0, index)
}
const onEmpty = () => {
  tableRef.value?.clearCheckboxRow()
  selectedData.value = []
}

// =======================


</script>

<style lang='scss' scoped></style>