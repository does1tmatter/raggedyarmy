<script setup>
import { computed, ref } from 'vue'
import { useWallet, useUtils, useUser } from '@/composables/'
import UserProfile from '@/components/UserProfile.vue'
import MenuIcon from '@/components/MenuIcon.vue'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { isNetwork, isAuthenticated, userLoading, connectUser } = useUser()

const menuOpen = ref(false)
</script>

<template>
  <header class="block md:hidden py-4 transition-all bg-redish-600 bg-opacity-80 fixed top-0 left-0 w-full backdrop-blur-sm z-40 text-[12px] sm:text-base">
    <div class="max-w-[1280px] mx-auto px-8 flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <Transition name="slide-profile">
          <UserProfile v-if="isAuthenticated" class="text-base" />
        </Transition>
        <div>
          <Transition name="fadeout">
            <button
              v-if="!isAuthenticated"
              :disabled="userLoading || !isNetwork || !isMetaMaskInstalled"
              @click="connectUser"
              class="disabled:cursor-not-allowed disabled:opacity-60 bg-redish rounded-lg p-[10px] transition-all"
            >
              {{ isMetaMaskInstalled ? userLoading ? 'Connecting' : 'Connect' : 'No metamask' }}
            </button>
          </Transition>
          <Transition name="fadeout">
            <button v-if="!isNetwork && isMetaMaskInstalled" class="p-[10px] bg-redish-600 text-redish-300 rounded-lg ml-4 hover:bg-redish hover:text-white transition-all" @click="switchNetwork">
              Switch Network
            </button>
          </Transition>
        </div>
      </div>
      <MenuIcon :menu-open="menuOpen" class="w-[35px] cursor-pointer transition-all duration-500 z-50" @click="menuOpen = !menuOpen" />
      <div
        :class="
          menuOpen 
          ? 
          'overflow-hidden fixed top-0 right-0 w-[30vw] h-[100vh] bg-redish text-white text-center z-40 transition-all duration-[700ms]' 
          : 
          'overflow-hidden fixed top-0 right-0 w-[30vw] h-0 bg-redish text-white text-center z-40 transition-all duration-300'
        "
      >
        <a href="#home" class="block hover:text-redish-300 transition-all uppercase mt-[120px]" @click="menuOpen = !menuOpen">Home</a>
        <a href="#mint" class="block hover:text-redish-300 transition-all uppercase mt-8" @click="menuOpen = !menuOpen">Mint</a>
        <a href="#roadmap" class="block hover:text-redish-300 transition-all uppercase mt-8" @click="menuOpen = !menuOpen">Roadmap</a>
      </div>
    </div>
  </header>
</template>
