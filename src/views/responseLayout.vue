<!-- <template>
  <div style="display: flex;">
  <button @click="prev">Prev</button>
  <div class="carousel-container">


    <div class="carousel" style="height: 50px;" :style="carouselStyle">

      <div v-for="(item, index) in items" :key="index" class="carousel-item" :style="itemStyle(index)">
        {{ item }}
      </div>
    </div>


  </div> <button @click="next">Next</button>
</div>
</template>
 
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 6', 'Item 7', 'Item 8']
const currentIndex = ref(0)
const itemWidth = 200// 假设每个元素宽度为200px
function itemStyle(index: any) {
  return {
    width: `${itemWidth}px`,
    transform: `translateX(${index * itemWidth}px)`
  }
}
const next = () => {
  if (currentIndex.value < items.length - 4) {
    currentIndex.value += 4;
  }
}
const prev = () => {
  if (currentIndex.value > 0) {
    currentIndex.value -= 4;
  }
}
const carouselStyle = computed<string>(() => {
  return {
    width: `${items.length * itemWidth}px`,
    transform: `translateX(-${currentIndex.value * itemWidth}px)`,
    transition: 'transform 0.3s'
  };
})

//   data() {
//     return {
//       items: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
//       currentIndex: 0,
//       itemWidth: 200, // 假设每个元素宽度为200px
//     };
//   },

// computed: {
//   carouselStyle() {
//     return {
//       width: `${this.items.length * this.itemWidth}px`,
//       transform: `translateX(-${this.currentIndex * this.itemWidth}px)`,
//       transition: 'transform 0.3s'
//     };
//   }
// },
// methods: {
//   itemStyle(index) {
//     return {
//       width: `${this.itemWidth}px`,
//       transform: `translateX(${index * this.itemWidth}px)`
//     };
//   },
//   next() {
//     if (this.currentIndex < this.items.length - 2) {
//       this.currentIndex += 2;
//     }
//   },
//   prev() {
//     if (this.currentIndex > 0) {
//       this.currentIndex -= 2;
//     }
//   }
// }
// };
</script>
 
<style scoped>
.carousel-container {
  width: 1000px;
  /* display: flex;
  align-items: center;
  justify-content: center; */
  overflow: hidden;
  position: relative;
}

.carousel {
  display: flex;
  will-change: transform;
  width: 1000px;
}

.carousel-item {
  position: absolute;
  top: 0;
  left: 0;
}
</style> -->
<!-- <template>
  <div class="carousel-container">
    <transition-group name="carousel" tag="div" class="carousel">
      <div v-for="(item) in items" :key="item.id" class="carousel-item">
        {{ item.text }}
      </div>
    </transition-group>
  </div>
  <button @click="next">next</button>
</template>
 
<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
const  items= [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
        { id: 4, text: 'Item 4' },
        { id: 3, text: 'Item 6' },
        { id: 4, text: 'Item 7' },
        // ...可以添加更多的项
      ]
     const  currentIndex=ref( 0)
    const next=()=>{
        currentIndex.value = (currentIndex.value + 1) % items.length;
  }

</script>
 
<style scoped>
.carousel-container {
  overflow: hidden;
  width: 400px; /* 假设每个项的宽度是100px */
}
 
.carousel {
  display: flex;
  width: 200%; /* 总宽度是所有项的2倍 */
  transition: transform 0.5s;
}
 
.carousel-item {
  flex: 0 0 auto; /* 不允许缩放 */
  width: 100px; /* 每个项的宽度 */
  /* 其他样式 */
}
 
.carousel-enter-active, .carousel-leave-active {
  transition: all 0.5s;
}
 
.carousel-enter-from, .carousel-leave-to {
  opacity: 0;
  transform: translateX(100px); /* 根据需要调整位置 */
}
</style> -->
<template>
  <div class="carousel" style="height:3000px">
    <transition-group name="fade" tag="div">
      <div v-for="(item, index) in items" :key="item.id" class="carousel-item" :class="{'active': index === currentIndex}" @click="switchItem(index)">
        {{ item.text }}
      </div>
    </transition-group>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
        // ... more items
      ]
    };
  },
  methods: {
    switchItem(index) {
      this.currentIndex = index;
    }
  }
};
</script>
 
<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
.carousel-item {
  position: absolute;
  width: 100%;
  border: 1px solid red;
  background-color: blue;
  /* other styles */
}
.active {
  z-index: 1;
}
</style>