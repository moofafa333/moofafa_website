<template>
  <div class="home">
    <TheNavbar />
    <HomeBanner />
    <FeatureGrid />
    <StepsGuide />
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import TheNavbar from '@/components/TheNavbar.vue'
import HomeBanner from '@/components/HomeBanner.vue'
import FeatureGrid from '@/components/FeatureGrid.vue'
import StepsGuide from '@/components/StepsGuide.vue'
import TheFooter from '@/components/TheFooter.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style> 