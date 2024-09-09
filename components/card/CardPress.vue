<template>
  <NuxtLink class="post-item" :to="`/press/${props.data.customUrl ? props.data.customUrl.en : props.data.id}`">
    <p class="post-date">{{ useFormattedDate(props.data.data.PostDate) }}</p>

    <div class="post-title-wrapper">
      <h2 class="post-title">{{ props.data.title.en }}</h2>

      <ButtonLink class="more" text="See Details" />
    </div>

    <div class="image-wrapper">
      <div class="image">
        <NuxtPicture :src="getImage(props.data.meta.image)" :img-attrs="{ alt: props.data.title.en }" />
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  data: {
    type: [Object, Array],
    required: true,
  },
});
</script>

<style scoped lang="scss">
.post-item {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);
  padding: fn.toVw(40) 0;
  border-top: 1px solid rgba($color: var.$color-text, $alpha: 0.5);

  @include mx.mobile {
    display: flex;
    flex-direction: column;
    gap: fn.toVw(24);
    padding-left: fn.toVw(var.$container-m);
    padding-right: fn.toVw(var.$container-m);
    padding-top: fn.toVw(24);
    padding-bottom: fn.toVw(64);
  }

  &:hover {
    .more {
      &:deep(.border),
      &:deep(.border-fill) {
        transform: scaleX(1);
        transform-origin: left;
      }
    }

    .image-wrapper {
      .image {
        &:deep(img) {
          transform: scale(1.1);
        }
      }
    }
  }
}

.post-date {
  @extend .font-button3;
  grid-column: 1 / 3;
  opacity: 0.5;

  @include mx.mobile {
    order: 2;
  }
}

.post-title-wrapper {
  grid-column: 3 / 7;
  width: 100%;

  @include mx.mobile {
    order: 3;
    max-width: fn.toVw(298);
  }

  .post-title {
    @extend .font-subheading3;
    margin-bottom: fn.toVw(48);

    @include mx.mobile {
      margin-bottom: fn.toVw(32);
    }
  }

  .more {
    width: 100%;
    max-width: fn.toVw(248);
    gap: fn.toVw(118);

    @include mx.mobile {
      gap: fn.toVw(16);
      max-width: fit-content;
    }

    &:deep(.border) {
      @include mx.mobile {
        display: none;
      }
    }
  }
}

.image-wrapper {
  width: 100%;
  overflow: hidden;
  grid-column: 8 / -1;
  padding-left: fn.toVw(53);

  @include mx.mobile {
    height: fn.toVw(224);
    order: 1;
    padding-left: 0;
  }

  .image {
    width: 100%;
    height: fn.toVw(306);
    overflow: hidden;

    &:deep(img) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var.$transition-default;
    }
  }
}
</style>
