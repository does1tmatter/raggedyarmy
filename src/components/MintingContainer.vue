<script setup>
import { useScroll } from '@vueuse/core'
import { useContract } from '@/composables/useContract'
import { useUser } from '@/composables/useUser'
import ConnectionData from '@/components/ConnectionData.vue'
import ProgressBar from '@/components/ProgressBar.vue'
import bg from '@/assets/img/mint.jpg'
import { onMounted } from 'vue'

const { isPresaleOpen, isPresaleComplete, isSaleOpen, isSaleComplete, minted, getWLBalance } = useContract()
const { isAuthenticated, address } = useUser()

onMounted(() => {
  if (isAuthenticated.value) {
    getWLBalance(address.value)
    console.log('this')
  }
})

</script>

<template>
  <div id="mint" class="h-[1000px] bg-[#181818] pt-[250px] px-4 bg-top bg-no-repeat bg-blend-soft-light" :style="{
    backgroundSize: 'cover',
    backgroundImage: `url(${bg})`,
  }">
    <div class="font-black text-[69px] text-right leading-[0.75] pointer-events-none max-w-[400px] mx-auto pr-4">
      <div class="text-sunflower">MINT</div>
      <div class="text-redish-300">RAGDOLL</div>
    </div>
    <div class="whitespace-nowrap bg-redish/[.6] p-8 rounded-3xl max-w-[400px] mx-auto">
      <template v-if="isPresaleOpen && !isPresaleComplete">
        <div class="text-[20px] uppercase font-bold leading-none">Presale</div>
      </template>
      <template v-else-if="!isSaleOpen && !isSaleComplete">
        <div class="text-[30px] uppercase font-bold leading-none text-center">Public Sale</div>
        <div class="text-center mt-4">
          <div>Mint price:</div>
          <div>Total:</div>
          <div class="font-black text-[30px] flex justify-center gap-6 mt-2">
            <span class="cursor-pointer">-</span>
            <span>{{ 1 }}</span>
            <span class="cursor-pointer">+</span>
          </div>
          <button
            :disabled="false"
            class="
              disabled:cursor-not-allowed
              disabled:opacity-60
              disabled:hover:bg-redish-600
              border
              border-transparent
              hover:border-redish-600
              disabled:hover:text-redish-300
              bg-redish-600
              text-redish-300
              rounded-lg
              p-[10px]
              hover:bg-redish-400
              hover:text-white
              transition-all
              my-2
            "
          >
            MINT
          </button>
          <ProgressBar :progress="{ minted, total: 7777 }" class="mx-auto" />
        </div>
      </template>
      <!-- <template v-else>
        <div class="text-[30px] uppercase font-bold leading-none text-center">Sale closed</div>
        <div class="text-center text-redish-200">try again later</div>
      </template> -->
    </div>
  </div>
</template>
