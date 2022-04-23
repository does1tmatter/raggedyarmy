<script setup>
import pretransform from '@/assets/img/pretransform.jpg'
</script>

<template>
  <div class="h-[40vh] bg-fixed bg-cover" :style="{
    backgroundImage: `url(${pretransform})`,
    backgroundPosition: '0 300px' 
  }"></div>
</template>