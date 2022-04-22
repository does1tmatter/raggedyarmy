<script setup>
import { useWallet } from '@/composables/useWallet.js'
import { useUtils } from '@/composables/useUtils.js'
import { useUser } from '@/composables/useUser.js'
import { useContract } from '@/composables/useContract.js'
import { computed, ref } from 'vue'

const { switchNetwork } = useWallet()
const { isMetaMaskInstalled, sliceAddress } = useUtils()
const { isNetwork, username, ensAvatar, isAuthenticated, userLoading, connectUser, address, balance, ownedTokens } = useUser()

const usernameString = computed(() => isMetaMaskInstalled.value ? isAuthenticated.value ? username.value : 'Not connected' : 'No metamask')

const fallbackAvatar = computed(() => 'https://avatars.dicebear.com/api/identicon/' + usernameString.value +  '.svg')

const avatarString = computed(() => ensAvatar.value || fallbackAvatar.value)

const openUserData = ref(false)
const toggleUserData = () => isAuthenticated.value ? openUserData.value = !openUserData.value : ''
</script>

<template>
  <header class="py-2 pt-8 transition-all">
    <div class="max-w-[1280px] mx-auto h-[60px] px-4 flex justify-between items-center">
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
              <div class="mt-2">owned tokens</div>
            </div>
            <div class="text-sunflower text-right">
              <div>{{ balance }} eth</div>
              <div class="mt-2">{{ ownedTokens }}</div>
            </div>
          </div>
        </Transition>
      </div>
      <div>
        <Transition name="fadeout">
          <button v-if="!isNetwork" class="p-[10px] border border-redish-300 text-redish-300 rounded-lg mr-4 hover:bg-redish hover:text-white transition-all" @click="switchNetwork">
            Switch Network
          </button>
        </Transition>
        <Transition name="fadeout">
          <button
            v-if="!isAuthenticated"
            :disabled="userLoading || !isNetwork"
            @click="connectUser"
            class="disabled:cursor-not-allowed disabled:opacity-50 border border-redish-300 text-redish-300 rounded-lg p-[10px] hover:bg-redish hover:text-white transition-all"
          >
            Connect
          </button>
        </Transition>
      </div>
    </div>
  </header>
</template>
