<template>
  <section class="label-description">
    <div class="container">
      <TextLabel class="label" :text="props.data.LabelDescriptionLabel" />

      <div class="title-wrapper">
        <MotionSplittext>
          <!-- eslint-disable-next-line vue/no-v-html -->
          <h3 class="font-heading3" v-html="description" />
        </MotionSplittext>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { LabelDescription } from '~/types/common';

const description = useHighlightedText(() => props.data.LabelDescriptionDescription);

const props = defineProps<{
  data: LabelDescription;
}>();
</script>

<style scoped lang="scss">
.label-description {
  padding-top: fn.toVw(200);
  padding-bottom: fn.toVw(120);

  @include mx.mobile {
    padding-top: fn.toVw(144);
    padding-bottom: fn.toVw(80);
  }

  .label {
    margin-bottom: fn.toVw(64);

    @include mx.mobile {
      margin-bottom: fn.toVw(49);
    }
  }

  .title-wrapper {
    width: 100%;
    max-width: fn.toVw(832);
  }
}
</style>
