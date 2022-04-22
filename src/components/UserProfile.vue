<script setup>
import { useWallet } from '@/composables/useWallet.js'
import { useUtils } from '@/composables/useUtils.js'
import { useUser } from '@/composables/useUser.js'
import { computed } from 'vue'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { isNetwork, username, ensAvatar, isAuthenticated, chain, userLoading, resetUser, connectUser, address } = useUser()

const usernameString = computed(() => isMetaMaskInstalled.value ? isAuthenticated.value ? username.value : 'Not connected' : 'No metamask')

const fallbackAvatar = computed(() => 'https://avatars.dicebear.com/api/identicon/' + usernameString.value +  '.svg')

const avatarString = computed(() => ensAvatar.value || fallbackAvatar.value)
</script>

<template>
  <header class="flex justify-between max-w-[1000px] h-[60px] mx-auto items-center">
    <div class="flex gap-2 items-center">
      <div class="w-[25px] bg-white/[.2] rounded-full flex items-center justify-center overflow-hidden">
        <img :src="avatarString">
      </div>
      <span class="whitespace-nowrap">
        {{ usernameString }}
      </span>
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
