<script setup>
import MainSection from '@/components/MainSection.vue'
import AngelSection from '@/components/AngelSection.vue'
import PreSection from '@/components/PreSection.vue'
import UserProfile from '@/components/UserProfile.vue'
import MintingContainer from '@/components/MintingContainer.vue'
</script>

<template>
  <UserProfile />
  <MainSection />
  <MintingContainer />
  <AngelSection />
  <div id="roadmap" class="h-screen bg-[#181818]">
  </div>
  <PreSection />
  <div class="h-[400px]">
  </div>
</template>
