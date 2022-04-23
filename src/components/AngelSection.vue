<script setup>
import angel from '@/assets/img/angel.jpg'
</script>

<template>
  <div class="h-[700px] bg-fixed bg-cover flex items-center justify-center" :style="{
    backgroundImage: `url(${angel})`,
    backgroundPosition: 'top' 
  }">
    <div class="font-black md:text-[80px] text-right mix-blend-color-burn pointer-events-none">
        <span class="text-redish-300">ROAD</span>
        <span class="text-sunflower">MAP</span>
      </div>
  </div>
</template>