<script setup>
import { computed } from 'vue'
import { useScroll } from '@vueuse/core'
import { useUtils } from '@/composables/useUtils'
import bg1 from '@/assets/img/bg1.jpg'
import bg2 from '@/assets/img/bg2.jpg'

const scroll = useScroll(window)
const { randomNumber } = useUtils()

const bgArray = [bg1, bg2]
const randomBackground = bgArray[randomNumber(2) - 1]

const bgStyle = computed(() => ({
  backgroundSize: 'cover',
  backgroundImage: `url(${randomBackground})`,
  backgroundPositionY: `${scroll.y.value * 0.8}px`
}))
</script>

<template>
  <div id="home" class="min-h-screen bg-no-repeat transition-none" :style="bgStyle">
    <main class="pt-[40vh] md:pr-[5%] max-w-[1280px] mx-auto px-4 z-0">
      <div class="font-black md:text-[69px] text-right mix-blend-color-dodge pointer-events-none">
        <span class="text-sunflower">RAGGEDY</span>
        <span class="text-redish-300">ARMY</span>
      </div>
      <div class="max-w-[450px] ml-auto bg-black/[.1] p-4 rounded-lg backdrop-blur-sm font-medium text-[20px] tracking-tighter leading-none">
        <p>The Raggedy Army consists of 7,777 Rag Dolls that were given life to bring balance to the Aethirverse.</p>
        <p class="mt-2">They live alongside many types of dangerous creatures and do not serve Good or Evil.</p>
      </div>
    </main>
  </div>
</template>
