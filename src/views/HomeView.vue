<template>
    <div class="carousel">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="carousel-item"
        :style="{ backgroundColor: item.color }"
      >
        {{ item.text }}
      </div>
      <button @click="prev">Prev</button>
      <button @click="next">Next</button>
    </div>
  </template>
   
  <script>
  import { ref, computed } from 'vue';
   
  export default {
    setup() {
      const items = ref([
        { text: 'Item 1', color: 'lightblue' },
        { text: 'Item 2', color: 'lightgreen' },
        { text: 'Item 3', color: 'lightsalmon' },
        { text: 'Item 4', color: 'lightseagreen' },
        // ...可以添加更多的项目
      ]);
      const currentIndex = ref(0);
   
      const next = () => {
        currentIndex.value = (currentIndex.value + 2) % items.value.length;
      };
   
      const prev = () => {
        currentIndex.value = (currentIndex.value - 2 + items.value.length) % items.value.length;
      };
   
      const visibleItems = computed(() => {
        const start = currentIndex.value;
        return items.value.slice(start, start + 2);
      });
   
      return {
        items: visibleItems,
        next,
        prev,
      };
    },
  };
  </script>
   
  <style>
  .carousel {
    display: flex;
    overflow-x: auto;
  }
  .carousel-item {
    flex: 0 0 auto;
    width: 0px;
    padding: 10px;
    text-align: center;
    transition: all 0.3s ease;
  }
  </style>

  <!-- <template>
    <div class="carousel-container">
      <div class="carousel" :style="carouselStyle">
        <div
          class="carousel-item"
          v-for="(item, index) in items"
          :key="index"
          :style="itemStyle(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </template>
   
  <script  >
import { ref, onMounted } from 'vue'

  export default {
    // props: {
    //   items: {
    //     type: Array,
    //     required: true
    //   }
    // },
    data() {
      return {
        currentIndex:0,
        items:[1,2,3,4,5]
      };
    },
    computed: {
      carouselStyle() {
        return {
          transform: `translateX(-${this.currentIndex * 100}%)`
        };
      },
      itemStyle() {
        return (index) => {
          return {
            width: `${100 / this.items.length}%`,
            transform: `translateX(${index * 100}%)`
          };
        };
      }
    },
    mounted() {
      setInterval(() => {
        this.currentIndex = (this.currentIndex + 2) % this.items.length;
      }, 3000);
    }
  };
  </script>
   
  <style scoped>
  .carousel-container {
    overflow: hidden;
    position: relative;
  }
   
  .carousel {
    display: flex;
    transition: transform 0.5s ease;
  }
   
  .carousel-item {
    will-change: transform;
  }
  </style> -->