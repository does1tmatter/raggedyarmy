import { ref, computed } from 'vue'
import { useWallet } from '@/composables/useWallet'
import { useUtils } from '@/composables/useUtils'
import { createSharedComposable } from '@vueuse/core'

export const useUser = createSharedComposable(() => {
  const { getChainId, getBalance, lookupAddress, getCurrentUser, requestAccounts } = useWallet()
  const { formatBalance } = useUtils()

  const address = ref(null)
  const ensName = ref(null)
  const username = computed(() => ensName.value || address.value)
  const balance = ref(null)
  const chain = ref(null)

  const userLoading = ref(false)
  const isNetwork = computed(() => Boolean(chain.value === '0x1'))
  const isAuthenticated = computed(() => Boolean(address.value))

  const setChain = (_chain) => chain.value = _chain


  const loadUserData = async (accounts) => {
    if (accounts.length === 0) {
      const ch = await getChainId()
      return ({
        address: null,
        ensName: null,
        username: null,
        balance: null,
        chain: ch
      })
    } else {
      const ens = await lookupAddress(accounts[0])
      const bal = await getBalance(accounts[0])
      const ch = await getChainId()
      return ({
        address: accounts[0],
        ensName: ens,
        balance: parseFloat(formatBalance(bal)),
        chain: ch
      })
      }
  }

  const setUserData = (data) => {
    address.value = data.address
    ensName.value = data.ensName
    balance.value = data.balance
    chain.value = data.chain
  }
  
  const loadConnectedUser = async () => {
    userLoading.value = true
    await getCurrentUser()
      .then((res) => loadUserData(res)
        .then((data) => {
          setUserData(data)
          userLoading.value = false
        })
      )
  }

  const detectChain = () => getChainId().then(res => chain.value = res)

  const resetUser = () => {
    address.value = null,
    ensName.value = null,
    username.value = null,
    balance.value = null
  }

  const connectUser = async () => {
    userLoading.value = true
    await requestAccounts()
      .then((res) => loadUserData(res)
        .then((data) => {
          setUserData(data)
          userLoading.value = false
        })
      )
  }

  return {
    address,
    ensName,
    username,
    balance,
    chain,
    userLoading,
    loadConnectedUser,
    isNetwork,
    isAuthenticated,
    setChain,
    detectChain,
    resetUser,
    connectUser,
    loadUserData
  }
})
