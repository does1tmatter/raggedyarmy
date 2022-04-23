<script setup>
import { computed, ref } from 'vue'
import { useContract, useUser, useUtils } from '@/composables/'

const { isMetaMaskInstalled } = useUtils()
const { username, ensAvatar, isAuthenticated, balance, ownedTokens } = useUser()
const { WLBalance } = useContract()

const usernameString = computed(() => isMetaMaskInstalled.value ? isAuthenticated.value ? username.value : 'Not connected' : 'No metamask')

const fallbackAvatar = computed(() => 'https://avatars.dicebear.com/api/initials/' + usernameString.value +  '.svg')

const avatarString = computed(() => ensAvatar.value || fallbackAvatar.value)

const openUserData = ref(false)
const toggleUserData = () => isAuthenticated.value ? openUserData.value = !openUserData.value : ''
</script>

<template>
  <div class="relative text-white">
    <div
      :class="
        isAuthenticated ?
        'flex gap-2 items-center bg-redish hover:bg-redish-300 transition-all py-3 px-4 rounded-md cursor-pointer' :
        'flex gap-2 items-center bg-redish py-3 px-4 rounded-md pointer-events-none'
      "
      @click="toggleUserData"
    >
      <div class="w-[25px] bg-redish-300 rounded-full flex items-center justify-center overflow-hidden">
        <img :src="avatarString">
      </div>
      <span class="whitespace-nowrap">
        {{ usernameString }}
      </span>
    </div>
    <Transition name="slide-profile">
      <div v-if="openUserData && isAuthenticated" class="z-50 absolute w-full mt-2 bg-redish-400 p-2 rounded-md text-[11px] uppercase leading-none flex justify-between whitespace-nowrap">
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
</template>
