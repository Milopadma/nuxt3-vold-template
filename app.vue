<script setup>
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import mobilebar from './utils/mobilebar';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const tlTransition = useTlTransition();
const isTransition = useIsTransition();
const elPageTransition = ref();
const isHeaderHidden = useHeaderHidden();

onMounted(() => {
  configDefault();
  resize();
  mobilebar();

  ScrollTrigger.refresh();
});

useHead({
  titleTemplate: `%s ― Elementis`,
});

useSeoMeta({
  title: 'Elementis',
  ogTitle: 'Elementis',
  description: 'A lifestyle revolution for a sustainable fulfilling future',
  ogDescription: 'A lifestyle revolution for a sustainable fulfilling future',
  ogImage: '/hero.jpg',
  twitterCard: 'summary_large_image',
});

const pageTransition = {
  name: 'page',
  mode: 'out-in',
  onEnter: (el, done) => {
    setTimeout(() => {
      tlTransition.value.reverse();

      // TODO: improve later
      ScrollTrigger.refresh();
    }, 200);

    done();
    isTransition.value = false;

    setTimeout(() => {
      if (!isHeaderHidden.value) return;
      isHeaderHidden.value = false;
    }, 300);
  },
  onLeave: (el, done) => {
    isTransition.value = true;
    tlTransition.value.play();

    tlTransition.value.eventCallback('onComplete', () => {
      done();
      elPageTransition.value.isRotate = true;
    });
  },
};
</script>

<template>
  <Html lang="en">
    <Body>
      <!-- Header -->
      <BaseHeader />

      <BasePageTransition ref="elPageTransition" />

      <DebugGrid />
      <DebugBorders />

      <BaseCursor />

      <BasePreloader />

      <PopupCookies />

      <!-- Layout -->
      <NuxtLayout :class="{ 'is--transition': isTransition }">
        <NuxtPage :transition="pageTransition" />
      </NuxtLayout>

      <!-- Footer -->
      <BaseFooter />
    </Body>
  </Html>
</template>
