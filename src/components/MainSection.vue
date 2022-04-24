<script setup>
import { computed, onMounted } from 'vue'
import { useScroll } from '@vueuse/core'
import { useAnimation, useUtils } from '@/composables/'
import bg1 from '@/assets/img/bg1.jpg'
import bg2 from '@/assets/img/bg2.jpg'

const scroll = useScroll(window)
const { randomNumber } = useUtils()
const { setTimeline, animateFrom, animateTo } = useAnimation()

const bgArray = [bg1, bg2]
const randomBackground = bgArray[randomNumber(2) - 1]

onMounted(() => {
  setTimeline()
  animateFrom('#home', { scale: 1.8, opacity: 0 })
  animateTo('.headline', { opacity: 1, y: 0, duration: 2 }, '-=1.5')
  animateTo('.clip', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0 }, '-=1')
})
</script>

<template>
  <div id="home" class="min-h-screen bg-no-repeat transition-none" :style="{
    backgroundSize: 'cover',
    backgroundImage: `url(${randomBackground})`,
    backgroundPositionY: `${scroll.y.value * 0.8}px`
  }">
    <main class="pt-[35vh] max-w-[1280px] mx-auto px-4 z-0">
      <div class="max-w-[600px] ml-auto">
        <div class="font-black text-[10vw] md:text-[69px] text-left pointer-events-none headline dodge leading-[0.75]">
          <span class="text-sunflower">RAGGEDY</span>
          <span class="text-redish-300">ARMY</span>
        </div>
        <div class="bg-redish/[.6] rounded-tr-3xl rounded-bl-3xl p-6 font-bangers font-medium text-[30px] text-justify leading-none clip">
          <p>The Raggedy Army consists of <span class="text-redish-300 dodge">7,777</span> <span class="text-sunflower">Rag Dolls</span> that were given life to bring balance to the Aethirverse.</p>
          <p class="mt-2">They live alongside many types of dangerous creatures and do not serve Good or Evil.</p>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.clip {
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  transform: translateY(3em);
}
.headline {
  opacity: 0;
  transform: translateY(-1em);
}
</style>