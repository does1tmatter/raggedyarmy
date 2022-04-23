<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { useWallet, useContract, useUser, useUtils } from '@/composables/'

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
    <div v-if="!isNetwork && isMetaMaskInstalled" class="fixed top-0 left-0 w-full z-[100] text-center bg-redish text-[10px] uppercase">
      wrong network detected. please switch to ethereum mainnet
    </div>
  </Transition>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
@import '@/assets/base.css';
html {
  background: #181818;
  color: #FFFFFF;
  scroll-behavior: smooth;
}
</style>
