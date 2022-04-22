<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { useWallet } from '@/composables/useWallet.js'
import { useUser } from '@/composables/useUser.js'
import { useUtils } from '@/composables/useUtils.js'
import { useContract } from '@/composables/useContract.js'

const { connectProvider, provider } = useWallet()
const { isMetaMaskInstalled } = useUtils()
const { loadConnectedUser, detectChain, setChain, isNetwork, resetUser } = useUser()
const { loadContractState, contractLoading, resetContract } = useContract()

const setListeners = (bool) => {
  if (bool) {
    provider.value.on('accountsChanged', onAccountChanged)
    provider.value.on('chainChanged', onChainChanged)
  } else {
    provider.value.removeAllListeners()
  }
}

const onAccountChanged = () => {
  resetUser()
  resetContract()
  detectChain().then(() => {
    if (isNetwork.value) { 
      loadConnectedUser()
      loadContractState()
    }
  })
}

const onChainChanged = (_chain) => {
  setChain(_chain)
  if (_chain === '0x1') {
    connectProvider(window.ethereum)
    loadConnectedUser()
    loadContractState()
  } else {
    resetUser()
    resetContract()
  }
}

onMounted(() => {
  if (isMetaMaskInstalled) {
    connectProvider(window.ethereum)
    detectChain().then(() => {
      if (isNetwork.value) { 
        loadConnectedUser()
        loadContractState()
      }
    })
    setListeners(true)
  } else {
    console.error('Non Ethereum Browser. Please install metamask.')
  }
})

onUnmounted(() => {
  if (isMetaMaskInstalled) {
    setListeners(false)
  }
})
</script>

<template>
  <Transition name="slide-profile">
    <div v-if="!isNetwork" class="text-center bg-redish text-[10px] uppercase">
      wrong network detected. please switch to ethereum mainnet
    </div>
  </Transition>
  <RouterView />
</template>

<style>
@import '@/assets/base.css';
html {
  background: #181818;
  color: #FFFFFF;
}
</style>
