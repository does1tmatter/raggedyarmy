<template>
  <div class="w-64 mt-2 text-center">
    <div class="relative w-full max-w-[200px] mx-auto rounded-lg bg-redish-300 h-[8px] overflow-hidden">
      <span :style="{ width: `${progress.minted * 100 / 7777}%` }" class="block rounded-lg bg-sunflower h-full" />
    </div>
    <span class="text-xs">{{ progress.minted }} / {{ progress.total.toLocaleString() }} minted</span>
  </div>
</template>

<script>
export default {
  name: 'ProgressBar',
  props: {
    progress: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
