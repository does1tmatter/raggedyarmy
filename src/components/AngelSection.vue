<script setup>
import angel from '@/assets/img/angel.jpg'
</script>

<template>
  <div class="h-[700px] bg-fixed bg-cover flex items-center justify-center" :style="{
    backgroundImage: `url(${angel})`,
    backgroundPosition: 'top' 
  }">
    <div class="font-black text-[14vw] md:text-[80px] text-right mix-blend-color-dodge pointer-events-none">
        <span class="text-redish-300">ROAD</span>
        <span class="text-sunflower">MAP</span>
      </div>
  </div>
</template>