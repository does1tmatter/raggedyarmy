<script setup>
import { useWallet } from '@/composables/useWallet.js'
import { useUtils } from '@/composables/useUtils.js'
import { useUser } from '@/composables/useUser.js'
import { computed, ref } from 'vue'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled, sliceAddress } = useUtils()
const { isNetwork, username, ensAvatar, isAuthenticated, userLoading, connectUser, address } = useUser()

const usernameString = computed(() => isMetaMaskInstalled.value ? isAuthenticated.value ? username.value : 'Not connected' : 'No metamask')

const fallbackAvatar = computed(() => 'https://avatars.dicebear.com/api/identicon/' + usernameString.value +  '.svg')

const avatarString = computed(() => ensAvatar.value || fallbackAvatar.value)

const openUserData = ref(false)
const toggleUserData = () => openUserData.value = !openUserData.value
</script>

<template>
  <header class="flex justify-between max-w-[1000px] h-[60px] mx-auto items-center">
    <div class="relative">
      <div class="flex gap-2 items-center cursor-pointer" @click="toggleUserData">
        <div class="w-[25px] bg-white/[.2] rounded-full flex items-center justify-center overflow-hidden">
          <img :src="avatarString">
        </div>
        <span class="whitespace-nowrap">
          {{ usernameString }}
        </span>
      </div>
      <Transition name="slide-fade">
        <div v-if="openUserData" class="z-50 absolute w-full mt-4 bg-redish p-4 rounded-lg leading-none flex">
          <div>
            address:<br>
            {{ isAuthenticated ? sliceAddress(address) : 'Not connected' }}
          </div>
        </div>
      </Transition>
    </div>
    <div>
      <button v-if="!isNetwork" class="p-[10px] border border-gray-500 rounded-lg" @click="switchNetwork">
        Switch Network
      </button>
      <button v-if="!isAuthenticated" :disabled="userLoading || !isNetwork" @click="connectUser" class="disabled:cursor-not-allowed disabled:opacity-50 border border-gray-500 rounded-lg p-[10px]">
        Connect
      </button>
    </div>
  </header>
</template>
