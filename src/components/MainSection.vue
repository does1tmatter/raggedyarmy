<script setup>
import { computed, onMounted } from 'vue'
import { useScroll } from '@vueuse/core'
import { useUtils } from '@/composables/useUtils'
import { useAnimation } from '@/composables/useAnimation'
import bg1 from '@/assets/img/bg1.jpg'
import bg2 from '@/assets/img/bg2.jpg'

const scroll = useScroll(window)
const { randomNumber } = useUtils()
const { setTimeline, animateFrom, animateTo } = useAnimation()

const bgArray = [bg1, bg2]
const randomBackground = bgArray[randomNumber(2) - 1]

const bgStyle = computed(() => ({
  backgroundSize: 'cover',
  backgroundImage: `url(${randomBackground})`,
  backgroundPositionY: `${scroll.y.value * 0.8}px`
}))

onMounted(() => {
  setTimeline()
  animateFrom('#home', { scale: 1.8, opacity: 0 })
  animateTo('.headline', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, opacity: 1, duration: 2 }, '-=1.2')
  animateTo('.clip', { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0 }, '-=0.9')
})
</script>

<template>
  <div id="home" class="min-h-screen bg-no-repeat transition-none" :style="bgStyle">
    <main class="pt-[25vh] md:pr-[5%] max-w-[1280px] mx-auto px-4 z-0">
      <div class="font-black md:text-[69px] text-right mix-blend-color-dodge pointer-events-none headline">
        <span class="text-sunflower">RAGGEDY</span>
        <span class="text-redish-300">ARMY</span>
      </div>
      <div class="max-w-[450px] ml-auto bg-redish/[.2] rounded-3xl backdrop-blur-sm p-4 font-medium text-[20px] tracking-tighter leading-none clip">
        <p>The Raggedy Army consists of 7,777 Rag Dolls that were given life to bring balance to the Aethirverse.</p>
        <p class="mt-2">They live alongside many types of dangerous creatures and do not serve Good or Evil.</p>
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
  clip-path: polygon(0 0, 100% 0, 100% 0, 0 0);
  transform: translateY(-1em);
}
</style>