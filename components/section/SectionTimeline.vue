<script setup lang="ts">
import type { TimelineSection } from '~/types/common';

const props = defineProps<{
  data: TimelineSection;
}>();

function processTimelinePoints(pointsString: string): string[] {
  // Remove <p> tags if present
  const cleanedString = pointsString.replace(/<\/?p>/g, '');
  // Split the string by <br> or <br/> tags
  return cleanedString
    .split(/<br\s*\/?>/i)
    .map((point) => point.trim())
    .filter(Boolean);
}
</script>

<template>
  <section class="timeline-section">
    <div class="marquee-container-wrapper">
      <TextMarquee :text="props.data.TimelineMarqueeText" />
    </div>

    <div class="homepage-grid">
      <div v-for="(contentGroup, groupIndex) in props.data.TimelineContent" :key="groupIndex" class="content-group">
        <div class="content-label">
          <p>/ {{ contentGroup.TimelineContentLabel }}</p>
        </div>

        <template v-for="(block, blockIndex) in contentGroup.TimelineContentBlock" :key="`${groupIndex}-${blockIndex}`">
          <div class="block-container">
            <div class="block-number">
              <p>{{ blockIndex + 1 < 10 ? `0${blockIndex + 1}` : blockIndex + 1 }}</p>
            </div>
            <div class="block-content">
              <p>{{ block.TimelineContentBlock }}</p>
            </div>
            <div class="block-points">
              <template
                v-for="(point, pointIndex) in processTimelinePoints(block.TimelineContentPoints)"
                :key="`${groupIndex}-${blockIndex}-${pointIndex}`">
                <p :class="{ 'last-point': pointIndex === processTimelinePoints(block.TimelineContentPoints).length - 1 }">{{ point }}</p>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.timeline-section {
  background-color: var.$color-secondary;
  padding-top: fn.toVw(200);
  padding-bottom: fn.toVw(200);

  @include mx.mobile {
    padding-top: fn.toVw(144);
    padding-bottom: fn.toVw(144);
  }
}

.homepage-grid {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);
  padding-left: fn.toVw(var.$container);
  padding-right: fn.toVw(var.$container);

  @include mx.mobile {
    grid-template-columns: repeat(7, 1fr);
    column-gap: 0;
    padding-left: 0;
    padding-right: 0;
  }
}

.marquee-container-wrapper {
  padding-bottom: fn.toVw(144);
  @extend .font-heading1;
  color: var.$color-text;

  @include mx.mobile {
    font-size: fn.toVw(72);
    padding-bottom: fn.toVw(72);
  }
}

.content-group {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: subgrid;

  &:nth-child(2) {
    padding-top: fn.toVw(156);

    @include mx.mobile {
      padding-top: fn.toVw(96);
    }
  }
}

.content-label {
  grid-column: 4 / 8;
  padding-bottom: fn.toVw(28);
  text-transform: uppercase;

  @include mx.mobile {
    grid-column: 2 / -1;
    padding-bottom: fn.toVw(20);
  }

  &:deep(p) {
    @extend .font-body3;
    margin-bottom: 0;
    opacity: 0.5;
  }
}

.block-container {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: subgrid;

  border-top: 1px solid rgba(var.$color-text, 0.5);
  padding-top: fn.toVw(24);

  @include mx.mobile {
    padding-top: fn.toVw(20);
    padding-left: fn.toVw(16);

    &:not(:last-child) {
      margin-bottom: fn.toVw(40);
    }
  }
}

.block-number {
  grid-column: 1 / 1;

  &:deep(p) {
    @extend .font-body3;
  }
}

.block-content {
  grid-column: 4 / 6;

  @include mx.mobile {
    grid-column: 2 / -1;
    margin-bottom: fn.toVw(40);
  }

  &:deep(p) {
    @extend .font-subheading3;
  }
}

.block-points {
  @extend .font-body2;
  grid-column: 8 / 13;

  @include mx.mobile {
    grid-column: 2 / -1;
  }

  &:deep(p) {
    color: var.$color-text;
    margin-bottom: fn.toVw(20);
    padding-bottom: fn.toVw(20);
    border-bottom: 1px solid rgba(var.$color-text, 0.5);

    @include mx.mobile {
      margin-bottom: fn.toVw(12);
      padding-bottom: fn.toVw(12);
      padding-right: fn.toVw(16);
    }

    &.last-point {
      border-bottom: none;
      margin-bottom: 0;
      padding-bottom: fn.toVw(24);

      @include mx.mobile {
        padding-bottom: 0;
      }
    }
  }
}
</style>
