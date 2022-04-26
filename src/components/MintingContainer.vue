<script setup>
import { useScroll } from '@vueuse/core'
import { useContract, useUser, useUtils } from '@/composables/'
import ProgressBar from '@/components/ProgressBar.vue'
import bg from '@/assets/img/mint.jpg'
import { ref, computed } from 'vue'

const { isPresaleOpen, isPresaleComplete, isSaleOpen, isSaleComplete, minted, salePrice, WLPrice, mintPublic, mintPresale, parseEther, WLBalance, contractLoaded, contractLoading } = useContract()
const { isAuthenticated, address, isNetwork } = useUser()
const { isMetaMaskInstalled } = useUtils()

const isWLTokens = ref(false)
const count = ref(1)
const isMaxCount = computed(() => Boolean(count.value === 5))
const isMinCount = computed(() => Boolean(count.value === 1))
const mintPrice = computed(() => isWLTokens.value ? WLPrice : salePrice)
const total = computed(() => (count.value * mintPrice.value).toFixed(3))

const disableWL = computed(() => Boolean(parseFloat(WLBalance.value) === 0))

const tokenMinted = ref(false)
const isMinting = ref(false)

const mintWLSale = async (count, bool, overrides) => {
  try {
    isMinting.value = true
    const tx = await mintPresale(count, bool, overrides)
    tx.wait().then(() => success())
  } catch (error) {
    alert(error.message)
    isMinting.value = false
  }
}

const mintPublicSale = async (count, overrides) => {
  try {
    isMinting.value = true
    const tx = await mintPublic(count, overrides)
    tx.wait().then(() => success())
  } catch (error) {
    alert(error.message)
    isMinting.value = false
  }
}

const success = () => {
  isMinting.value = false
  tokenMinted.value = true
  setTimeout(() => {
    tokenMinted.value = false
  }, 3000)
}
</script>
  
<template>
  <div id="mint" class="h-[1000px] bg-[#181818] pt-[250px] px-4 bg-center bg-no-repeat bg-blend-soft-light" :style="{
    backgroundSize: 'cover',
    backgroundImage: `url(${bg})`,
  }">
    <div class="font-black text-[10vw] md:text-[69px] text-right leading-[0.75] pointer-events-none max-w-[400px] mx-auto">
      <div class="text-sunflower">MINT</div>
      <div class="text-redish-300">RAGDOLL</div>
    </div>
    <template v-if="isMetaMaskInstalled && isNetwork">
      <div class="whitespace-nowrap bg-redish/[.6] p-8 rounded-tl-3xl rounded-br-3xl max-w-[400px] mx-auto">
        <template v-if="contractLoading && !contractLoaded">
          <div class="text-[10vw] sm:text-[30px] uppercase font-bold leading-none text-center">Loading contract</div>
          <div class="text-center text-redish-200">Please wait</div>
        </template>
        <template v-else-if="!contractLoading && !contractLoaded">
          <div class="text-[10vw] sm:text-[30px] uppercase font-bold leading-none text-center">Error</div>
          <div class="text-center text-redish-200">Could not connect to contract.</div>
        </template>
        <template v-else-if="!isPresaleOpen && !isPresaleComplete && contractLoaded">
          <div class="text-[10vw] sm:text-[30px] uppercase font-bold leading-none text-center">Presale</div>
          <div class="text-center mt-4">
            <div class="w-full max-w-[200px] mx-auto flex justify-between">
              <div class="text-left">
                <div>Mint price:</div>
                <div>Total:</div>
              </div>
              <div class="text-right text-sunflower">
                <div>{{ mintPrice }} ETH</div>
                <div>{{ total }} ETH</div>
              </div>
            </div>
            <div :class="disableWL ? 'flex items-center justify-center py-4 gap-2 opacity-30' : 'flex items-center justify-center py-4 gap-2'">
              <input type="checkbox" id="wltokens" v-model="isWLTokens" :disabled="disableWL" class="w-[20px] h-[20px] accent-redish-300 cursor-pointer bg-redish-500 disabled:cursor-not-allowed" />
              <label for="wltokens" :class="disableWL ? 'cursor-not-allowed' : 'cursor-pointer'">Use WL Tokens</label>
            </div>
            <div class="font-black text-[30px] flex justify-center gap-6 mt-2">
              <button
                :disabled="isMinCount"
                class="disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer px-4 border border-redish-300 hover:bg-redish-300 transition-all rounded-lg"
                @click="count--"
              >
                -
              </button>
              <span>{{ count }}</span>
              <button
                :disabled="isMaxCount"
                class="disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer px-4 border border-redish-300 hover:bg-redish-300 transition-all rounded-lg"
                @click="count++"
              >
                +
              </button>
            </div>
            <button
              :disabled="!isAuthenticated || !isNetwork || isMinting"
              class="
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:bg-redish-600
                border
                border-redish-300
                disabled:hover:text-redish-300
                rounded-lg
                p-[10px]
                hover:bg-redish-400
                transition-all
                mb-2
                mt-6
              "
              @click="mintWLSale(count, isWLTokens, { value: parseEther(total) })"
            >
              {{ tokenMinted ? 'MINTED !' : isMinting ? 'MINTING' : 'MINT' }}
            </button>
            <ProgressBar :progress="{ minted, total: 7777 }" class="mx-auto" />
          </div>
        </template>
        <template v-else-if="isSaleOpen && !isSaleComplete && contractLoaded">
          <div class="text-[10vw] sm:text-[30px] uppercase font-bold leading-none text-center">Public Sale</div>
          <div class="text-center mt-4">
            <div class="w-full max-w-[200px] mx-auto flex justify-between">
              <div class="text-left">
                <div>Mint price:</div>
                <div>Total:</div>
              </div>
              <div class="text-right">
                <div class="text-sunflower">{{ salePrice }} ETH</div>
                <div class="text-sunflower">{{ total }} ETH</div>
              </div>
            </div>
            <div class="font-black text-[30px] flex justify-center gap-6 mt-2">
              <button
                :disabled="isMinCount"
                class="disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer px-4 border border-redish-300 hover:bg-redish-300 transition-all rounded-lg"
                @click="isMinCount ? '' : count--"
              >
                -
              </button>
              <span>{{ count }}</span>
              <button class="cursor-pointer px-4 border border-redish-300 hover:bg-redish-300 transition-all rounded-lg" @click="count++">
                +
              </button>
            </div>
            <button
              :disabled="!isAuthenticated || !isNetwork || isMinting"
              class="
                disabled:cursor-not-allowed
                disabled:opacity-60
                disabled:hover:bg-redish-600
                border
                border-redish-300
                disabled:hover:text-redish-300
                rounded-lg
                p-[10px]
                hover:bg-redish-400
                transition-all
                mb-2
                mt-6
              "
              @click="mintPublicSale(count, { value: parseEther(total) })"
            >
              {{ tokenMinted ? 'MINTED !' : isMinting ? 'MINTING' : 'MINT' }}
            </button>
            <ProgressBar v-if="isNetwork" :progress="{ minted, total: 7777 }" class="mx-auto" />
          </div>
        </template>
        <template v-else-if="!isPresaleOpen && !isSaleOpen && contractLoaded">
          <div class="text-[10vw] sm:text-[30px] uppercase font-bold leading-none text-center">Sale closed</div>
          <div class="text-center text-redish-200">try again later</div>
        </template>
      </div>
    </template>
    <template v-else-if="isMetaMaskInstalled && !isNetwork">
      <div class="whitespace-nowrap bg-redish/[.6] p-8 rounded-tl-3xl rounded-br-3xl max-w-[400px] mx-auto">
        <div class="text-[10vw] sm:text-[30px] uppercase font-bold leading-none text-center">Wrong network</div>
        <div class="text-center text-redish-200">Please switch to Ethereum Mainnet</div>
      </div>
    </template>
    <template v-else-if="!isMetaMaskInstalled">
      <div class="whitespace-nowrap bg-redish/[.6] p-8 rounded-tl-3xl rounded-br-3xl max-w-[400px] mx-auto">
        <div class="text-[10vw] sm:text-[30px] uppercase font-bold leading-none text-center">No metamask</div>
        <div class="text-center text-redish-200">Install metamask to mint</div>
      </div>
    </template>
  </div>
</template>
