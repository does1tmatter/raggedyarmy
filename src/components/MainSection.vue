<script setup>
import { computed } from 'vue'
import { useScroll } from '@vueuse/core'
import { useUtils } from '@/composables/useUtils'
import ConnectionData from '@/components/ConnectionData.vue'
import UserProfile from '@/components/UserProfile.vue'
import bg1 from '@/assets/img/bg1.jpg'
import bg2 from '@/assets/img/bg2.jpg'
import bg3 from '@/assets/img/bg3.jpg'

const scroll = useScroll(window)
const { randomNumber } = useUtils()

const bgArray = [bg1, bg2, bg3]
const randomBackground = bgArray[randomNumber(3) - 1]

const bgStyle = computed(() => ({
  backgroundSize: 'cover',
  backgroundImage: `url(${randomBackground})`,
  backgroundPositionY: `${scroll.y.value * 0.8}px`
}))
</script>

<template>
  <div class="min-h-screen bg-no-repeat" :style="bgStyle">
    <UserProfile />
    <main class="mt-[40px] max-w-[1280px] mx-auto px-4">
      {{ scroll }}
      <ConnectionData />
    </main>
  </div>
</template>
