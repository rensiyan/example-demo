<template>
  <div class="SwiperBox" ref="SwiperBox" @mouseenter="MouseFun('移入')" @mouseleave="MouseFun('移出')">
    <!-- 图片 -->
    <div class="imgBox" :style="{ left: `-${leftVal}px`, transition: `${ition}s` }">
      <div class="Swiper-item" v-for="(item, index) in imgList" :key="index">
        <!-- <div style="display: flex;  justify-content: space-around;width: 100%;"> -->
          <div v-for="(items, indexs) in item" :key="indexs" style="width:20%;height:100px;border:1px solid grey;margin:20px">{{
            items.name }}</div>
          <!-- <img :src="items.imgUrl" alt="" v-for="(items, indexs) in item" :key="indexs"> -->
        <!-- </div> -->
      </div>
      <!-- 复制第一张放到最后,以实现无缝无线循环滚动效果 -->
      <div class="Swiper-item">
        <!-- <img :src="items.imgUrl" alt="" v-for="(items, indexs) in imgList[0]" :key="indexs"> -->
      </div>
    </div>
    <!-- 左箭头按钮 -->
    <div class="leftBtn" @click="PrevFun()">&larr;</div>
    <!-- 右箭头按钮 -->
    <div class="rightBtn" @click="NextFun()">&rarr;</div>


  </div>
</template>
 
<script lang='ts' setup>
import { onMounted, ref, reactive, nextTick } from "vue"
const imgList = ref()
const imgData = [
  { name: '1', imgUrl: "https://img14.360buyimg.com/pop/s590x470_jfs/t1/107362/20/24177/90602/6233decdE5627d944/b7194e538e3c8c7a.jpg" },
  { name: '12', imgUrl: "https://img12.360buyimg.com/pop/s590x470_jfs/t1/204028/36/25480/101429/62f507a7Ec62b0cd3/db5984ae24ce0212.jpg" },
  { name: '13', imgUrl: "https://imgcps.jd.com/ling4/100022552927/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6e6/075268d0/cr/s/q.jpg" },
  { name: '14', imgUrl: "https://imgcps.jd.com/ling4/100026667910/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5f3a47329785549f6bc7a6e3/d7b3695b/cr/s/q.jpg" },
  { name: '15', imgUrl: "https://img30.360buyimg.com/pop/s590x470_jfs/t1/201288/25/23710/64955/62f070fdE95cb4f47/22b916d938a43bb5.jpg" },
  { name: '16', imgUrl: "https://img20.360buyimg.com/babel/s590x470_jfs/t1/147050/6/31926/85670/6357a9afE26ff5c66/3a6823f7820fb72b.jpg" },
  { name: '17', imgUrl: "https://imgcps.jd.com/ling4/100003547337/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd8253082acdd181d02fa3b/52f28740/cr/s/q.jpg" },
  { name: '18', imgUrl: "https://imgcps.jd.com/ling4/100038004353/5Lqs6YCJ5aW96LSn/5L2g5YC85b6X5oul5pyJ/p-5bd8253082acdd181d02fa4b/665a2335/cr/s/q.jpg" },]
const leftVal = ref(0)// 轮播图盒子的偏移值
// const flag = ref(true) // 用来节流防止重复点击
// const start = ref(null) // 自动执行下一张定的时器
const imgWidth = ref()  // 在这里填写你需要的图片宽度
const ition = ref(0.6) // 设置轮播图过度时间
const imgShow = ref(0)// 表示当前显示的图片索引
// 这里定义一个鼠标移入移出事件，鼠标悬停时停止自动轮播，鼠标移出则重新执行自动轮播
const MouseFun = (type) => {// 停止定时器            // 重新执行定时器
}

//这里通过额外封装的节流函数触发 PrevFun() 和 NextFun(),以达到防止重复点击的效果
const throttle = (fun) => {
  // if (flag) {
  // 	flag = false;
  // 	fun(); // 此为模板中传递进来的PrevFun()或NextFun()函数
  //   setTimeout(() => {
  // 		flag = true;
  // 	}, 650); // 节流间隔时间
  // }
}
// 上一张
const PrevFun = () => {
  if (leftVal.value == 0) { // 判断显示的图片 是 第一张时执行
    // imgList.length是指循环图片数组的图片个数
    ition.value = 0 // 将过渡时间变成0，瞬间位移到最后一张图
    imgShow.value = imgList.value.length - 1 // 将高亮小点改为最后一张图
    leftVal.value = (imgList.value.length) * imgWidth.value // 瞬间移动
    nextTick(() => {
      setTimeout(() => {  // 通过延时障眼法,归原过渡时间,执行真正的“上一张”函数
        ition.value = 0.6
        leftVal.value -= imgWidth.value
      }, ition.value * 1000)
    })
  } else { // 判断显示的图片 不是 第一张时执行
    ition.value = 0.6
    leftVal.value -= imgWidth.value
    imgShow.value--
  }
}
// 下一张
const NextFun = () => {
  if (leftVal.value == (imgList.value.length - 1) * imgWidth.value) { // 判断显示的图片 是 最后一张时执行
    ition.value = 0.6
    leftVal.value += imgWidth.value
    imgShow.value = 0
    nextTick(() => {
      setTimeout(() => {
        ition.value = 0
        leftVal.value = 0
      }, ition.value * 1000)
    })
  } else { // 判断显示的图片 不是 最后一张时执行
    ition.value = 0.6
    leftVal.value += imgWidth.value
    imgShow.value++
  }
}
const getList = () => {

  let arr = [];
  let num = 4 // 填写需要分割成几个一组的数量
  if (imgData.length) {
    for (let i = 0; i < imgData.length; i += num) {
      arr.push(imgData.slice(i, i + num));
    }

    imgList.value = arr
    console.log(imgList.value, "imgList.value");

  }

  return imgList;
}

onMounted(() => {
  getList()
  imgWidth.value = window.innerWidth*0.2;
})

</script>
 
<style scoped>
/* 图片容器样式 */
.SwiperBox {
  position: relative;
  width: 100%;
  height: 300px;
  box-sizing: border-box;
  cursor: pointer;
  overflow: hidden;
}

.imgBox {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
}

/* 图片默认样式 */
.Swiper-item {
  flex-shrink: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}


/* 两个按钮共有的样式,也可直接使用箭头图片替代 */
.leftBtn,
.rightBtn {
  position: absolute;
  top: 50%;
  /* transform: translateY(-50%); */
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(109, 109, 109, 0.445);
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
}

.leftBtn {
  left: 10px;
}

.rightBtn {
  right: 10px;
}
</style>