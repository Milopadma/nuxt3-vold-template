<script setup>
useHead({
  titleTemplate: null,
});

const app = useNuxtApp();
await app.$utils.getWebConfig();
const data = await app.$utils.getPageDetail();
useSeoMeta(app.$utils.headerMeta());
</script>

<template>
  <div ref="el" class="wellness">
    <SectionWellnessSlideshow />
    <SectionSlider />
  </div>
</template>
