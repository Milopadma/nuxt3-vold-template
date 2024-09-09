<template>
  <section ref="el" class="terms">
    <div class="grid">
      <div class="sections">
        <p class="sections__title">Sections</p>
        <ul>
          <li
            v-for="(item, index) in sectionsList"
            :key="index"
            class="sections__item font-button3"
            :class="{ active: item.active }"
            @click="scrollToChapter(index)">
            {{ item.title }}
          </li>
        </ul>
      </div>

      <div class="content">
        <h1>{{ props.data.Title }}</h1>
        <p class="date">Last updated: {{ useFormattedDate(props.data.Date) }}</p>
        <p class="description">{{ props.data.Description }}</p>

        <div v-for="(item, index) in props.data.List" :key="index" ref="elChapters" class="chapter" :class="[`chapter-${index}`]">
          <h2 class="title font-subheading3">{{ item.Title }}</h2>

          <article ref="elArticles" class="article">
            <div v-html="item.Content" />
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import type { PrivacyTermsSection } from '~/types/cms';

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger);
}

const el = ref();
const elChapters = ref([]);
const elArticles = ref([]);

const props = defineProps<{
  data: PrivacyTermsSection;
}>();

const sectionsList = ref(
  props.data.List.map((item) => ({
    title: item.Title,
    active: false,
  })),
);

const detectLink = (content: string) => {
  const regex = /<a href="([^"]*)">([^<]*)<\/a>/g;
  return content.replace(regex, '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>');
};

const lenis: any = useNuxtApp().$lenis;

const scrollToChapter = (index: number) => {
  nextTick(() => {
    ctx = gsap.context(() => {
      lenis.lenis.scrollTo(`.chapter-${index}`, {
        duration: 1,
        force: true,
        offset: (window.innerHeight / 4) * -1,
      });
    }, el.value);
  });
};

let ctx: gsap.Context;

onMounted(() => {
  elArticles.value.forEach((article: HTMLElement) => {
    const content = article.innerHTML;
    article.innerHTML = detectLink(content);
  });

  ctx = gsap.context(() => {
    (gsap.utils.toArray(elChapters.value) as HTMLElement[]).forEach((item, index: number) => {
      ScrollTrigger.create({
        trigger: item,
        start: 'top center+=90vw',
        end: 'bottom center',
        invalidateOnRefresh: true,
        onEnter: () => {
          sectionsList.value[index].active = true;
        },
        onEnterBack: () => {
          sectionsList.value[index].active = true;
        },
        onLeave: () => {
          sectionsList.value[index].active = false;
        },
        onLeaveBack: () => {
          sectionsList.value[index].active = false;
        },
      });
    });
  }, el.value);
});

onUnmounted(() => {
  ctx && ctx.revert();
});
</script>

<style scoped lang="scss">
.terms {
  display: block;
  padding: fn.toVw(310) 0;

  @include mx.mobile {
    padding: fn.toVw(200) 0;
  }
}

.grid {
  display: grid;
  grid-template-columns: repeat(var.$grid-col, 1fr);
  column-gap: fn.toVw(var.$grid-gap);
  padding: 0 fn.toVw(var.$container);
  position: relative;

  @include mx.mobile {
    display: block;
    padding: 0 fn.toVw(var.$container-m);
  }

  .sections {
    grid-column: 1 / 4;
    top: fn.toVw(100);
    height: fit-content;
    position: sticky;

    @include mx.mobile {
      display: none;
    }

    .sections__title {
      color: var.$color-teriary;
      margin-bottom: calc(fn.toVw(40) - fn.toVw(6));
    }

    ul {
      display: flex;
      flex-direction: column;
    }

    .sections__item {
      padding: fn.toVw(6) 0;
      cursor: pointer;
      opacity: 0.5;
      transition: opacity 0.3s;

      &:hover,
      &.active {
        opacity: 1;
      }
    }
  }

  .content {
    grid-column: 6 / 11;

    .date {
      opacity: 0.5;
      margin-bottom: fn.toVw(48);

      @include mx.mobile {
        margin-bottom: fn.toVw(32);
      }
    }

    .description {
      margin-bottom: fn.toVw(80);

      @include mx.mobile {
        margin-bottom: fn.toVw(64);
      }
    }

    h1 {
      @extend .font-heading2;
      margin-bottom: fn.toVw(48);

      @include mx.mobile {
        margin-bottom: fn.toVw(32);
      }
    }

    .chapter {
      &:not(:last-child) {
        margin-bottom: fn.toVw(80);

        @include mx.mobile {
          margin-bottom: fn.toVw(64);
        }
      }
    }

    h2,
    &:deep(h2) {
      @extend .font-subheading3;
      margin-bottom: fn.toVw(40);

      @include mx.mobile {
        margin-bottom: fn.toVw(32);
      }
    }

    h3,
    &:deep(h3),
    h4,
    &:deep(h4),
    h5,
    &:deep(h5),
    h6,
    &:deep(h6) {
      @extend .font-body1;
      margin-bottom: fn.toVw(32);
      margin-left: 0.2em;
    }

    p,
    &:deep(p) {
      @extend .font-body2;
    }

    b,
    &:deep(b),
    strong,
    &:deep(strong) {
      font-weight: bold;
    }

    i,
    &:deep(i),
    em,
    &:deep(em) {
      font-style: italic;
    }

    u,
    &:deep(u) {
      text-decoration: underline;
    }

    a,
    &:deep(a) {
      @include mx.text-underline;
      @extend .active;

      &:hover {
        &::before {
          transform-origin: right !important;
          transform: scale3d(0, 1, 1) !important;
        }
      }
    }

    ul,
    &:deep(ul) {
      padding-left: 1em;
      margin: initial;
      list-style: initial;
      @extend .font-body2;
    }

    li,
    &:deep(li) {
      padding: initial;
      margin: initial;
    }
  }
}
</style>
