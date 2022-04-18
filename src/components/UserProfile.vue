<script setup>
import { useWallet } from '@/composables/useWallet.js'
import { useUtils } from '@/composables/useUtils.js'
import { useUser } from '@/composables/useUser.js'
import { computed, inject } from 'vue'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { isNetwork, username, isAuthenticated, chain, userLoading, resetUser, connectUser } = useUser()

</script>

<template>
  <header class="flex justify-between max-w-[1000px] mx-auto">
    <div class="flex items-center gap-4">
      <div>
        {{ isMetaMaskInstalled ? isAuthenticated ? username : 'Not connected' : 'No metamask' }} <br>
        isNetwork: {{ isNetwork }}<br>
        chain: {{ chain }}<br>
      </div>
      <div>
        <button v-if="!isNetwork" class="p-[10px] border border-gray-500 rounded-lg" @click="switchNetwork">
          Switch Network
        </button>
      </div>
    </div>
    <div>
      <button v-if="!isAuthenticated" :disabled="userLoading || !isNetwork" @click="connectUser" class="disabled:cursor-not-allowed disabled:opacity-50 border border-gray-500 rounded-lg p-[10px]">
        Connect
      </button>
    </div>
  </header>
</template>
