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
  <div class="flex gap-[50px] flex-wrap break-words">
      <div class="max-w-[400px] w-full">
        <details class="font-medium bg-gray-800/[.6] py-4 px-8 rounded-lg" open>
          <summary class="cursor-pointer py-2">User info {{ userLoading ? '(loading)' : isAuthenticated ? '(connected)' : '(disconnected)' }}</summary>
          <Transition name="slide-fade">
            <div v-if="isAuthenticated">
              address: <br>
              <span class="font-light">{{ address }}</span><br>
              ENS name: <br>
              <span class="font-light">{{ ensName ? 'Resolves to ' + ensName : 'Doesnt resolve' }}</span><br>
              username: <br>
              <span class="font-light">{{ username }}</span><br>
              balance:<br>
              <span class="font-light">{{ balance }} ETH</span><br>
              chain id: <br>
              <span class="font-light">{{ chain }}</span><br>
            </div>
            <div v-else-if="userLoading">
              Loading user data.
            </div>
            <div v-else-if="!isAuthenticated && !userLoading">
                User is not connected.
            </div>
          </Transition>
        </details>
      </div>
      <div class="max-w-[400px] w-full">
        <details class="font-medium bg-gray-800/[.6] py-4 px-8 rounded-lg">
          <summary class="cursor-pointer py-2">Contract info {{ contractLoading ? '(loading)' : isContractConnected ? '(connected)' : '(disconnected)' }}</summary>
          <Transition name="slide-fade">
            <div v-if="isContractConnected && !contractLoading">
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
