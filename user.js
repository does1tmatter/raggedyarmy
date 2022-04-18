import { ethers } from 'ethers'
import { defineStore } from 'pinia'
import { ref, computed, reactive } from 'vue'

export const useUserStore = defineStore('user', () => {
  const address = ref(null)
  const ensName = ref(null)
  const balance = ref(0)
  const loading = ref(false)
  let provider = reactive(null)
  const username = computed(() => ensName.value || address.value)
  const isAuthenticated = computed(() => Boolean(address.value))
  const isMetaMaskInstalled = ref(false)

  async function loadProvider () {
    setLoader(true)
    if (window.ethereum) {
      isMetaMaskInstalled.value = true
      provider = new ethers.providers.Web3Provider(window.ethereum)
      getCurrentUser(onAccountChanged)
    } else {
      console.log('Non ethereum browser')
    }
    setLoader(false)
  }

  function getCurrentUser (callbackFn) {
    provider.send('eth_accounts', [])
      .then(callbackFn)
  }

  function onAccountChanged (accounts) {
    if (accounts.length === 0) {
      address.value = null
      ensName.value = null
    } else {
      address.value = accounts[0]
      handleEnsName()
      getBalance()
    }
  }

  async function getBalance () {
    await provider.getBalance(address.value)
      .then(res => {
        balance.value = ethers.utils.formatEther(res.toNumber())
        balance.value = parseFloat(balance.value)
        balance.value = balance.value.toFixed(4)
      })
      .catch(e => console.log(e))
  }

  async function handleEnsName () {
    await provider.lookupAddress(address.value)
      .then((res) => {
        ensName.value = res
      })
      .catch(e => console.log(e))
  }

  function setLoader (bool) {
    loading.value = bool
  }

  async function login () {
    provider.send('eth_requestAccounts', [])
      .then(onAccountChanged)
  }

  return {
    address,
    ensName,
    username,
    balance,
    loading,
    provider,
    loadProvider,
    setLoader,
    login,
    isAuthenticated,
    onAccountChanged,
    isMetaMaskInstalled
  }
})