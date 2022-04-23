<script setup>
import { useScroll } from '@vueuse/core'
import { useContract, useUser } from '@/composables/'
import ProgressBar from '@/components/ProgressBar.vue'
import bg from '@/assets/img/mint.jpg'
import { ref, computed } from 'vue'

const { isPresaleOpen, isPresaleComplete, isSaleOpen, isSaleComplete, minted, salePrice, WLPrice, mintPublic, mintPresale, parseEther, WLBalance } = useContract()
const { isAuthenticated, address } = useUser()

const isWLTokens = ref(false)
const count = ref(1)
const isMaxCount = computed(() => Boolean(count.value === 5))
const isMinCount = computed(() => Boolean(count.value === 1))
const mintPrice = computed(() => isWLTokens.value ? WLPrice : salePrice)
const total = computed(() => (count.value * mintPrice.value).toFixed(3))

const disableWL = computed(() => Boolean(parseFloat(WLBalance.value) === 0))
</script>

<template>
  <div id="mint" class="h-[1000px] bg-[#181818] pt-[250px] px-4 bg-top bg-no-repeat bg-blend-soft-light" :style="{
    backgroundSize: 'cover',
    backgroundImage: `url(${bg})`,
  }">
    <div class="font-black text-[69px] text-right leading-[0.75] pointer-events-none max-w-[400px] mx-auto">
      <div class="text-sunflower">MINT</div>
      <div class="text-redish-300">RAGDOLL</div>
    </div>
    <div class="whitespace-nowrap bg-redish/[.6] p-8 rounded-tl-3xl rounded-br-3xl max-w-[400px] mx-auto">
      <template v-if="!isPresaleOpen && !isPresaleComplete">
        <div class="text-[30px] uppercase font-bold leading-none text-center">Presale</div>
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
            <button class="cursor-pointer px-4 border border-redish-300 hover:bg-redish-300 transition-all rounded-lg" @click="isMinCount ? '' : count--">-</button>
            <span>{{ count }}</span>
            <button class="cursor-pointer px-4 border border-redish-300 hover:bg-redish-300 transition-all rounded-lg" @click="isMaxCount ? '' : count++">+</button>
          </div>
          <button
            :disabled="false"
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
            @click="mintPresale(count, isWLTokens, { value: parseEther(total) })"
          >
            MINT
          </button>
          <ProgressBar :progress="{ minted, total: 7777 }" class="mx-auto" />
        </div>
      </template>
      <template v-else-if="isSaleOpen && !isSaleComplete">
        <div class="text-[30px] uppercase font-bold leading-none text-center">Public Sale</div>
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
            <button class="cursor-pointer px-4 border border-redish-300 hover:bg-redish-300 transition-all rounded-lg" @click="isMinCount ? '' : count--">-</button>
            <span>{{ count }}</span>
            <button class="cursor-pointer px-4 border border-redish-300 hover:bg-redish-300 transition-all rounded-lg" @click="isMaxCount ? '' : count++">+</button>
          </div>
          <button
            :disabled="false"
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
            @click="mintPublic(count, { value: parseEther(total) })"
          >
            MINT
          </button>
          <ProgressBar :progress="{ minted, total: 7777 }" class="mx-auto" />
        </div>
      </template>
      <template v-else>
        <div class="text-[30px] uppercase font-bold leading-none text-center">Sale closed</div>
        <div class="text-center text-redish-200">try again later</div>
      </template>
    </div>
  </div>
</template>
