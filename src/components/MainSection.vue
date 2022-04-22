<script setup>
import { useScroll } from '@vueuse/core'
import { useUtils } from '@/composables/useUtils'
import ConnectionData from '@/components/ConnectionData.vue'
import UserProfile from '@/components/UserProfile.vue'
import bg1 from '@/assets/img/bg1.jpg'
import bg2 from '@/assets/img/bg2.jpg'
import bg3 from '@/assets/img/bg3.jpg'

const scroll = useScroll(window)
const { randomNumber } = useUtils()

const bgArray = [null, bg1, bg2, bg3]
const randomBackground = bgArray[randomNumber(3)]
</script>

<template>
  <div class="min-h-screen" :style="{
    backgroundSize: 'cover',
    backgroundImage: `url(${randomBackground})`,
    backgroundPositionY: `${scroll.y} px`
  }">
    <UserProfile />
    <main class="mt-[40px] max-w-[1280px] mx-auto px-4">
      {{ scroll }}
      <ConnectionData />
    </main>
  </div>
</template>
