<script setup>
import { computed, ref } from 'vue'
import { useScroll } from '@vueuse/core'
import { useWallet } from '@/composables/useWallet.js'
import { useUtils } from '@/composables/useUtils.js'
import { useUser } from '@/composables/useUser.js'
import { useContract } from '@/composables/useContract.js'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled, sliceAddress } = useUtils()
const { isNetwork, username, ensAvatar, isAuthenticated, userLoading, connectUser, address, balance, ownedTokens } = useUser()
const { WLBalance } = useContract()

const scroll = useScroll(window)
const isScrolled = computed(() => Boolean(scroll.y.value > 100))

const usernameString = computed(() => isMetaMaskInstalled.value ? isAuthenticated.value ? username.value : 'Not connected' : 'No metamask')

const fallbackAvatar = computed(() => 'https://avatars.dicebear.com/api/identicon/' + usernameString.value +  '.svg')

const avatarString = computed(() => ensAvatar.value || fallbackAvatar.value)

const openUserData = ref(false)
const toggleUserData = () => isAuthenticated.value ? openUserData.value = !openUserData.value : ''
</script>

<template>
  <header :class="isScrolled ? 'py-4 transition-all bg-redish-600 bg-opacity-80 fixed top-0 left-0 w-full backdrop-blur-sm z-40' : 'py-8 transition-all bg-redish-600 bg-opacity-10 fixed top-0 left-0 w-full backdrop-blur-sm z-40'">
    <div class="max-w-[1280px] mx-auto px-4 flex justify-between items-center">
      <div class="flex gap-4 items-center">
        <div class="relative text-white">
          <div
            :class="
              isAuthenticated ?
              'flex gap-2 items-center bg-redish hover:bg-redish-300 transition-all py-3 px-4 rounded-md cursor-pointer' :
              'flex gap-2 items-center bg-redish py-3 px-4 rounded-md pointer-events-none'
            "
            @click="toggleUserData"
          >
            <div class="w-[25px] bg-white/[.2] rounded-full flex items-center justify-center overflow-hidden">
              <img :src="avatarString">
            </div>
            <span class="whitespace-nowrap">
              {{ usernameString }}
            </span>
          </div>
          <Transition name="slide-profile">
            <div v-if="openUserData" class="z-50 absolute w-full mt-2 bg-redish-400 p-2 rounded-md text-[11px] uppercase leading-none flex justify-between whitespace-nowrap">
              <div class="text-white">
                <div>balance:</div>
                <div class="mt-2">WL balance:</div>
                <div class="mt-2">owned dolls:</div>
              </div>
              <div class="text-sunflower text-right">
                <div>{{ balance }} eth</div>
                <div class="mt-2">{{ WLBalance }}</div>
                <div class="mt-2">{{ ownedTokens }}</div>
              </div>
            </div>
          </Transition>
        </div>
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
      <div class="cursor-pointer flex gap-6">
        <a href="#home">Home</a>
        <a href="#mint">Mint</a>
        <a href="#roadmap">Roadmap</a>
      </div>
    </div>
  </header>
</template>
