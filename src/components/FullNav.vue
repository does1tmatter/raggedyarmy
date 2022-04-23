<script setup>
import { computed } from 'vue'
import { useScroll } from '@vueuse/core'
import { useWallet, useUtils, useUser } from '@/composables/'
import UserProfile from '@/components/UserProfile.vue'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { isNetwork, isAuthenticated, userLoading, connectUser } = useUser()

const scroll = useScroll(window)
const isScrolled = computed(() => Boolean(scroll.y.value > 100))

</script>

<template>
  <header :class="isScrolled ? 'py-4 transition-all bg-redish-600 bg-opacity-80 fixed top-0 left-0 w-full backdrop-blur-sm z-40' : 'py-8 transition-all bg-redish-600 bg-opacity-10 fixed top-0 left-0 w-full backdrop-blur-sm z-40'">
    <div class="max-w-[1280px] mx-auto px-4 flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <UserProfile />
        <div>
          <Transition name="fadeout">
            <button
              v-if="!isAuthenticated"
              :disabled="userLoading || !isNetwork"
              @click="connectUser"
              class="disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:bg-redish-600 disabled:hover:text-redish-300 bg-redish-600 text-redish-300 rounded-lg p-[10px] hover:bg-redish hover:text-white transition-all"
            >
              Connect
            </button>
          </Transition>
          <Transition name="fadeout">
            <button v-if="!isNetwork" class="p-[10px] bg-redish-600 text-redish-300 rounded-lg ml-4 hover:bg-redish hover:text-white transition-all" @click="switchNetwork">
              Switch Network
            </button>
          </Transition>
        </div>
      </div>
      <div class="cursor-pointer flex gap-6 font-bold uppercase">
        <a href="#home" class="hover:text-redish-300 transition-all">Home</a>
        <a href="#mint" class="hover:text-redish-300 transition-all">Mint</a>
        <a href="#roadmap" class="hover:text-redish-300 transition-all">Roadmap</a>
      </div>
    </div>
  </header>
</template>
