<template>
  <div class="bg">
    <div class="container">
      <div v-if="DEV" class="w-full max-w-full text-left mt-6">
        <p class="text-xl white-space-normal font-bold mb-3">{{ props?.error?.message }}</p>
        <div class="bg-black text-white p-5 text-xl white-space-normal" v-html="props?.error?.stack"></div>
      </div>
      <section class="error">
        <!-- 500 -->
        <BaseError
          v-if="props?.error?.statusCode === 500"
          title="Internal Server Error"
          message="Oops! Something Went Wrong, Please try again later" />

        <!-- 404 -->
        <BaseError v-if="props?.error?.statusCode === 404" title="Page Not Found" message="Oops! Something Went Wrong, Please try again later" />

        <!-- 400 -->
        <BaseError v-if="props?.error?.statusCode === 400" title="Bad Request" message="Oops! Something Went Wrong, Please try again later" />

        <div class="cta">
          <a class="link" href="/">Go To Homepage</a>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: Object,
});

useSeoMeta({
  title: props?.error?.statusMessage,
});
</script>

<style scoped lang="scss">
.bg {
  min-height: 100%;
  height: 100vh;
  width: 100%;
}
.error {
  margin: 0;
  min-height: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;

  &:deep(.animation) {
    margin: 4rem auto;
    max-width: 40rem;
  }

  &:deep(h1) {
    text-transform: none;
    margin-bottom: 1rem;
  }
}

.cta {
  margin-top: 2rem;
}
</style>
