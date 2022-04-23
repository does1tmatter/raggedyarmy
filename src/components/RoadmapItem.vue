<script setup>
import road1 from '@/assets/img/roadmap/1.jpg'
import road2 from '@/assets/img/roadmap/2.jpg'
import road3 from '@/assets/img/roadmap/3.jpg'
import road4 from '@/assets/img/roadmap/4.jpg'

const images = [road1, road2, road3, road4]
</script>

<template>
  <div id="roadmap" class="w-full min-h-screen bg-[#080808]">
    <img v-for="(image, i) in images" :key="i" :src="image" class="mx-auto">
  </div>
</template>