import { ref, computed, reactive } from 'vue'
import { ethers } from 'ethers'
import { useWallet } from '@/composables/useWallet'
import { createSharedComposable } from '@vueuse/core'
import WLABI from '@/utils/WLABI.json'
import ABI from '@/utils/ABI.json'

export const useContract = createSharedComposable(() => {

  const contractAddress = '0x0FD909133BaBD4aA39Bd8d65456c2eA1B0fD3063'
  const WLContractAddress = '0x94a8792c012767AeDFD17473c854c920456D64aE'

  const { getProvider } = useWallet()

  const contractLoading = ref(false)

  let contract = reactive({})
  let wlContract = reactive({})

  const minted = ref(null)
  const owner = ref(null)
  const name = ref(null)
  const symbol = ref(null)
  const isSaleOpen = ref(null)
  const isSaleComplete = ref(null)
  const isPresaleOpen = ref(null)
  const isPresaleComplete = ref(null)
  const WLBalance = ref(null)

  const isContractConnected = computed(() => Boolean(name.value))
  const progress = computed(() => minted.value * 100 / 10000 || null)

  const connectContract = () => contract = new ethers.Contract(contractAddress, ABI, getProvider())

  const connectWLContract = (_address, _abi) => wlContract = new ethers.Contract(_address, _abi, getProvider())

  const getWLBalance = async (_address) => WLBalance.value = await wlContract.balanceOf(_address, 2)

  const getName = async () => name.value = await contract.name()

  const getSymbol = async () => symbol.value = await contract.symbol()

  const getOwner = async () => owner.value = await contract.owner()

  const getMinted = async () => minted.value = await contract.totalSupply()

  const getOwnedTokens = async (address) => await contract.balanceOf(address)

  const getSaleOpen = async () => isSaleOpen.value = await contract.isSaleOpen()

  const getSaleComplete = async () => isSaleComplete.value = await contract.isSaleComplete()

  const getPresaleOpen = async () => isPresaleOpen.value = await contract.isPresaleOpen()
  
  const getPresaleComplete = async () => isPresaleComplete.value = await contract.isPresaleComplete()

  const loadContractState = async () => {
    contractLoading.value = true
    try {
      connectContract()
      connectWLContract(WLContractAddress, WLABI)
      await getName()
      await getSymbol()
      await getMinted()
      await getOwner()
      await getSaleOpen()
      await getSaleComplete()
      await getPresaleOpen()
      await getPresaleComplete()
    } catch (e) {
      console.log(e)
      contractLoading.value = false
    } finally {
      contractLoading.value = false
    }
  }

  const resetContract = () => {
    name.value = null
    symbol.value = null
    owner.value = null
    minted.value = null
    isSaleOpen.value = null 
    isSaleComplete.value = null
    isPresaleOpen.value = null
    isPresaleComplete.value = null
  }

  return {
    contractLoading,
    minted,
    name,
    symbol,
    progress,
    contractAddress,
    loadContractState,
    isContractConnected,
    owner,
    isSaleOpen,
    isSaleComplete,
    isPresaleOpen,
    isPresaleComplete,
    resetContract,
    getOwnedTokens,
    getWLBalance,
    WLBalance
  }
})
