import { ref, computed } from 'vue'
import { useWallet } from '@/composables/useWallet'
import { useContract } from '@/composables/useContract'
import { useUtils } from '@/composables/useUtils'
import { createSharedComposable } from '@vueuse/core'

export const useUser = createSharedComposable(() => {
  const { getChainId, getBalance, lookupAddress, getCurrentUser, requestAccounts, getAvatar, getSigner } = useWallet()
  const { getOwnedTokens, getWLBalance, contractInstance, connectContract, resetSigner } = useContract()
  const { formatBalance, sliceAddress } = useUtils()

  const address = ref(null)
  const ensName = ref(null)
  const ensAvatar = ref(null)
  const username = computed(() => ensName.value || sliceAddress(address.value))
  const balance = ref(0)
  const chain = ref(null)
  const ownedTokens = ref(0)

  const userLoading = ref(false)
  const isNetwork = computed(() => Boolean(chain.value === '0x1'))
  const isAuthenticated = computed(() => Boolean(address.value))

  const setChain = (_chain) => chain.value = _chain


  const loadUserData = async (accounts) => {
    try {
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
        const ensAv = await getAvatar(ens || '')
        const bal = await getBalance(accounts[0])
        const ch = await getChainId()
        const ownd = await getOwnedTokens(accounts[0])
        await getWLBalance(accounts[0])
        connectContract(getSigner())
        return ({
          address: accounts[0],
          ensName: ens,
          eAvatar: ensAv,
          balance: parseFloat(formatBalance(bal)),
          chain: ch,
          ownedCount: ownd
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const setUserData = (data) => {
    address.value = data.address
    ensName.value = data.ensName
    ensAvatar.value = data.eAvatar
    balance.value = data.balance
    chain.value = data.chain
    ownedTokens.value = data.ownedCount
  }
  
  const loadConnectedUser = async () => {
    try {
      userLoading.value = true
      await getCurrentUser()
        .then((res) => loadUserData(res)
          .then((data) => {
            setUserData(data)
            userLoading.value = false
          })
        )
    } catch (error) {
      console.log(error)
      userLoading.value = false
    }
  }

  const detectChain = () => getChainId().then(res => chain.value = res)

  const resetUser = () => {
    address.value = null
    ensName.value = null
    ensAvatar.value = null
    balance.value = null
    ownedTokens.value = null
  }

  const connectUser = async () => {
    try {
      userLoading.value = true
      await requestAccounts()
        .then((res) => loadUserData(res)
          .then((data) => {
            setUserData(data)
            userLoading.value = false
          })
        )
    } catch (error) {
      userLoading.value = false
    }
  }

  return {
    address,
    ensName,
    ensAvatar,
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
    loadUserData,
    ownedTokens
  }
})
