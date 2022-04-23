<template>
  <button :class="menuOpen ? '-translate-x-[6vw] sm:-translate-x-[8.3vw]' : ''">
    <div :class="[ menuOpen ? 'w-[30px] h-[4px] bg-white rounded-lg transition-all duration-500 rotate-45 translate-y-2' : 'w-[30px] h-[4px] bg-redish-300 rounded-lg transition-all duration-500' ]" />
    <div :class="[ menuOpen ? 'w-[30px] h-[4px] bg-white rounded-lg transition-all duration-500 mt-1 bg-transparent' : 'w-[30px] h-[4px] bg-redish-300 rounded-lg transition-all duration-500 mt-1' ]" />
    <div :class="[ menuOpen ? 'w-[30px] h-[4px] bg-white rounded-lg transition-all duration-500 mt-1 -rotate-45 -translate-y-2' : 'w-[30px] h-[4px] bg-redish-300 rounded-lg transition-all duration-500 mt-1' ]" />
  </button>
</template>

<script>
export default {
  props: {
    menuOpen: {
      type: Boolean,
      default: false
    }
  }
}
</script>
