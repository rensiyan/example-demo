
<template>
  <div class="layout">
      <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
          <Menu active-name="1-1" theme="dark" width="auto" :open-names="['1']" >
              <Submenu name="1">
                  <template #title>
                      <Icon type="ios-navigate"></Icon>
                      Item 1
                  </template>
                  <MenuItem name="1-1" @on-select="onchange" to="./about">Option 1</MenuItem>
                  <MenuItem name="1-2" to="./Demo">Option 2</MenuItem>
                  <MenuItem name="1-3">Option 3</MenuItem>
              </Submenu>
              <Submenu name="2">
                  <template #title>
                      <Icon type="ios-keypad"></Icon>
                      Item 2
                  </template>
                  <MenuItem name="2-1">Option 1</MenuItem>
                  <MenuItem name="2-2">Option 2</MenuItem>
              </Submenu>
              <Submenu name="3">
                  <template #title>
                      <Icon type="ios-analytics"></Icon>
                      Item 3
                  </template>
                  <MenuItem name="3-1">Option 1</MenuItem>
                  <MenuItem name="3-2">Option 2</MenuItem>
              </Submenu>
          </Menu>
      </Sider>
      <Layout :style="{marginLeft: '200px'}">
          <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
          <Content :style="{padding: '0 16px 16px'}">
              <Breadcrumb :style="{margin: '16px 0'}">
                  <BreadcrumbItem>Home</BreadcrumbItem>
                  <BreadcrumbItem>Components</BreadcrumbItem>
                  <BreadcrumbItem>Layout</BreadcrumbItem>
              </Breadcrumb>
          <router-view></router-view>
          </Content>
      </Layout>
  </div>
</template>
<script  lang="ts" setup>
import {onMounted} from "vue"
import {useRoute,useRouter} from 'vue-router'
const route=useRoute()


</script>
<style scoped lang='scss'>
  .layout{
      border: 1px solid #d7dde4;
      background: #f5f7f9;
      position: relative;
      border-radius: 4px;
      overflow: hidden;
  }
  .layout-header-bar{
      background: #fff;
      box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .dev-run-preview .dev-run-preview-edit{ display: none }
</style>