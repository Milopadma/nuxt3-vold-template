<script setup lang="ts">
import { useSeoMeta } from '#imports';
import SectionsWrapper from '~/components/shared/SectionsWrapper.vue';
import type { PageData } from '~/types/page';

const { $utils, $crud } = useNuxtApp();
await $utils.getWebConfig();
const route = useRoute();

// Fetch page data
const pageData = (await $crud.getPage(route.params.page as string)) as PageData | null;

// Set SEO meta
const meta = $utils.headerMeta(pageData);
useSeoMeta(meta);

if (!pageData) {
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' });
}

// Filter and prepare components for the current page
const pageComponents = computed(() => {
  if (!pageData) return [];
  // @ts-ignore
  return pageData.components || [];
});
</script>

<template>
  <div :class="$route.name">
    <SectionsWrapper :components="pageComponents" />
    <SectionForm />
  </div>
</template>

<style scoped></style>
