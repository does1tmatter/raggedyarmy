<script setup>
import pretransform from '@/assets/img/pretransform.jpg'
</script>

<template>
  <div class="h-[550px] bg-fixed bg-cover" :style="{
    backgroundImage: `url(${pretransform})`,
    backgroundPosition: 'top' 
  }"></div>
</template>