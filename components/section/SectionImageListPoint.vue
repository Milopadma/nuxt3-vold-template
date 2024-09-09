<template>
  <section id="wood-construction" class="image-list-point">
    <TextMarquee class="marquee" :text="props.data.MarqueeText" />

    <div class="grid">
      <div class="text">
        <TextLabel class="label" :text="props.data.Label" />
      </div>

      <div class="topdesc">
        <MotionSplittext>
          <p class="font-body2">
            {{ props.data.TopDescription }}
          </p>
        </MotionSplittext>
      </div>
    </div>

    <div ref="elList" class="list">
      <div class="image">
        <NuxtPicture :src="getImage(props.data.Image)" :img-attrs="{ alt: props.data.Label }" />
      </div>

      <div ref="elItems" class="items">
        <ButtonListText v-for="(item, index) in props.data.ListItem" :key="index" href="/" :number="index + 1" :text="item.Text" />
      </div>

      <div class="bottomdesc">
        <MotionSplittext>
          <p class="font-body2">
            {{ props.data.BottomDescription }}
          </p>
        </MotionSplittext>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import type { ImageListPointSection } from '~/types/common';

const props = defineProps<{
  data: ImageListPointSection;
}>();

const el = ref();
const elItems = ref();

let ctx: gsap.Context;

onMounted(() => {
  if (useDevice().isMobile) return;

  ctx = gsap.context(() => {
    gsap.from('.image img', {
      scale: 1.2,
      ease: 'none',
      scrollTrigger: {
        trigger: elItems.value,
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
    });
  }, el.value);
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
.image-list-point {
  padding: fn.toVw(200) 0;
  background-color: var.$color-background2;
  color: var.$color-primary;

  ::selection {
    color: var.$color-background2;
    background: var.$color-primary;
  }

  @include mx.mobile {
    padding: fn.toVw(120) 0;
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(var.$grid-col, 1fr);
    column-gap: fn.toVw(var.$grid-gap);
    padding: 0 fn.toVw(var.$container);

    @include mx.mobile {
      display: block;
      padding: 0 fn.toVw(var.$container-m);
    }
  }

  .marquee {
    margin-bottom: fn.toVw(104);
    overflow: hidden;
  }

  .text {
    grid-column: 1 / 5;
  }

  .topdesc {
    grid-column: 6 / 10;

    @include mx.mobile {
      margin-top: fn.toVw(40);
    }
  }

  .list {
    display: grid;
    grid-template-columns: repeat(var.$grid-col, 1fr);
    column-gap: fn.toVw(var.$grid-gap);
    padding: 0 fn.toVw(var.$container);
    margin-top: fn.toVw(96);
    position: relative;

    @include mx.mobile {
      display: block;
      padding: 0 fn.toVw(var.$container-m);
      margin-top: fn.toVw(64);
    }

    .image {
      grid-column: 1 / 4;
      height: fn.toVw(392);
      place-self: flex-end;
      margin-bottom: 0;
      position: sticky;
      bottom: fn.toVw(24);
      overflow: hidden;

      @include mx.mobile {
        padding: 0 fn.toVw(13);
        margin-bottom: fn.toVw(64);
      }
    }

    .items {
      grid-column: 6 / -1;

      @include mx.mobile {
        margin-left: calc(fn.toVw(var.$container-m) * -1);
        width: calc(100% + fn.toVw(var.$container-m) * 2);

        &:deep(.text) {
          font-size: fn.toVw(16);
        }
      }
    }
  }

  .bottomdesc {
    grid-column: 6 / 12;
    padding-right: fn.toVw(77);
    margin-top: fn.toVw(96);

    @include mx.mobile {
      margin-top: fn.toVw(64);
      padding-right: 0;
    }
  }
}
</style>
