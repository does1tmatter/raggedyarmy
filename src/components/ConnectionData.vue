<script setup>
import { useWallet } from '@/composables/useWallet.js'
import { useContract } from '@/composables/useContract.js'
import { useUtils } from '@/composables/useUtils.js'
import { useUser } from '@/composables/useUser.js'

const { requestAccounts, getChainId } = useWallet()
const { isMetaMaskInstalled, loader } = useUtils()
const { address, ensName, username, balance, chain, isAuthenticated, isNetwork, userLoading, ensAvatar } = useUser()
const { isContractConnected, name, minted, symbol, owner, isSaleOpen, isSaleComplete, isPresaleOpen, isPresaleComplete, contractAddress, contractLoading } = useContract()

</script>

<template>
  <div class="flex gap-[50px] justify-end flex-wrap break-words">
      <div class="max-w-[400px] w-full">
        <details class="font-medium bg-redish-500 rounded-lg tracking-tighter">
          <summary class="cursor-pointer py-4 text-sunflower bg-redish-300 hover:bg-redish-400 transition-all rounded-md pl-4">Contract info {{ contractLoading ? '(loading)' : isContractConnected ? '(connected)' : '(disconnected)' }}</summary>
          <Transition name="slide-fade">
            <div v-if="isContractConnected && !contractLoading" class="px-4 py-2">
              contract address:<br>
              <span class="font-light">{{ contractAddress }}</span><br>
              contract name:<br>
              <span class="font-light">{{ name }}</span><br>
              contract symbol:<br>
              <span class="font-light">{{ symbol }}</span><br>
              total supply:<br>
              <span class="font-light">{{ minted }}</span><br>
              contract owner:<br>
              <span class="font-light">{{ owner }}</span><br>
              sale open:<br>
              <span class="font-light">{{ isSaleOpen }}</span><br>
              sale complete:<br>
              <span class="font-light">{{ isSaleComplete }}</span><br>
              presale open:<br>
              <span class="font-light">{{ isPresaleOpen }}</span><br>
              presale complete:<br>
              <span class="font-light">{{ isPresaleComplete }}</span><br>
            </div>
            <div v-else-if="contractLoading">
              Loading contract data.
            </div>
            <div v-else-if="!isContractConnected && !contractLoading">
              Contract not connected.
            </div>
          </Transition>
        </details>
      </div>
    </div>
</template>
