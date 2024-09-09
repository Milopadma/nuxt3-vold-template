<template>
  <div class="post-page">
    <div v-if="loading" class="loading">Loading post...</div>
    <div v-else-if="error" class="error">{{ error }}</div>

    <article v-else-if="post" class="post-content">
      <div class="post-head">
        <div class="post-head-inner">
          <p class="parent">Press Room</p>
          <p class="date">{{ useFormattedDate(post.data.PostDate) }}</p>
        </div>
      </div>

      <div class="post-banner">
        <div class="title-wrapper">
          <MotionSplittext :delay="0.2">
            <h1 class="title">{{ $utils.translate(post.title) }}</h1>
          </MotionSplittext>
        </div>
      </div>

      <div class="post-image">
        <div ref="elImg" class="image">
          <NuxtPicture
            :src="$utils.renderImagePath(post.meta?.image ?? { path: '/fallback-image.jpg', filename: { webp: '/fallback-image.jpg' } })"
            :img-attrs="{ alt: $utils.translate(post.title) }" />
        </div>
      </div>

      <div class="post-wrapper">
        <div class="sticky">
          <p class="category">Press Room — {{ useFormattedDate(post.data.PostDate) }}</p>
          <p class="title">{{ $utils.translate(post.title) }}</p>

          <div v-if="post.data.pdf" class="pdf">
            <ButtonLink :href="`${post.data.pdf.aws_file_url}${post.data.pdf.path}/${post.data.pdf.filename}`" text="Download PDF" :external="true" />
          </div>
        </div>

        <div class="post-text-wrapper">
          <div class="overview">
            <h2>{{ $utils.translate(post.data.PostAbstract) }}</h2>
          </div>

          <div v-if="post.data.PostContent" class="post-text" v-html="$utils.translate(post.data.PostContent)" />
        </div>
      </div>
    </article>
    <p v-else>Post not found.</p>

    <div v-if="relatedPosts.length" class="post-list">
      <div class="title-wrapper">
        <p class="title">Press Releases</p>
      </div>
      <CardPress v-for="relatedPost in relatedPosts" :key="relatedPost.id" :data="relatedPost" />
    </div>

    <div class="post-inquiry">
      <p class="title">Global Media Inquiries</p>
      <p class="desc">
        Media Contact : <br />
        <a class="link" href="mailto:pressroom@elementis.co">pressroom@ELEMENTIS.co</a><br /><br />
        ELEMENTIS Media Relations responds only to inquiries from journalists.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Post } from '~/types/post/response';

const route = useRoute();
const { $utils, $crud } = useNuxtApp();

const post = ref<Post | null>(null);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);
const relatedPosts = ref<Post[]>([]);

// Dummy data
const dummyPost: Post = {
  id: '1',
  title: { en: 'Sample Post Title' },
  slug: { en: 'dummy' },
  data: {
    PostDate: '2023-05-15',
    PostAbstract: 'This is a sample post abstract. It provides a brief overview of the post content.',
    PostContent:
      '<p>This is the main content of the post. It can include <strong>formatted text</strong>, <em>italics</em>, and even <a href="#">links</a>.</p><p>You can add multiple paragraphs and other HTML elements as needed.</p>',
  },
  meta: {
    image: {
      folder: {
        client: 'dummy',
        created_at: 'dummy',
        id: 'dummy',
        last_edited: {
          _id: 'dummy',
          email: 'dummy',
          name: 'dummy',
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          role: {
            _id: 'dummy',
            client: 'dummy',
            created_at: 'dummy',
            disabled_create: [],
          },
        },
        name: 'dummy',
        parent: null,
        type: null,
        updated_at: 'dummy',
        uri: 'dummy',
      },
      is_aws: false,
      original: 'dummy',
      path: 'dummy',
      aws_file_url: '/public',
      client: 'dummy',
      created_at: 'dummy',
      description: null,
      id: 'dummy',
      last_edited: null,
      type: 'dummy',
      updated_at: 'dummy',
      filename: {
        raw: 'fallback-image.jpg',
        webp: 'fallback-image.jpg',
        big: 'fallback-image.jpg',
        blur: 'fallback-image.jpg',
        medium: 'fallback-image.jpg',
      },
    },
    title: { en: 'Sample Post SEO Title' },
  },
  categories: [],
  created_at: '2023-05-15T10:00:00Z',
  updated_at: '2023-05-15T10:00:00Z',
  status: 'published',
  type: 'post',
  customUrl: { en: 'dummy' },
};

try {
  const slug = route.params.slug as string;

  if (slug === 'dummy') {
    // Use dummy data for '/post/dummy'
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API delay
    post.value = dummyPost;
  } else {
    const postData: Post | null = await $crud.getSinglePost(slug);
    if (postData) {
      post.value = postData;
      // Fetch related posts
      const relatedPostsData = await $crud.getRelatedPosts<Post[]>(postData.id);
      if (relatedPostsData) {
        relatedPosts.value = relatedPostsData;
      }
    } else {
      error.value = 'Post not found.';
    }
  }

  if (post.value) {
    const meta = $utils.headerMeta({
      title: post.value.title.en,
      meta: {
        description: { en: post.value.data.PostAbstract ?? '' },
        image: post.value.meta?.image,
      },
    });
    useSeoMeta(meta);
  }
} catch (err: unknown) {
  console.error('DEBUG: Error fetching post:', err);
  error.value = 'Failed to load post. Please try again later.';
} finally {
  loading.value = false;
}

const elImg = ref<HTMLElement | null>(null);

useParallax(elImg, {
  speed: 30,
});
</script>

<style scoped lang="scss">
.post-page {
  padding-top: fn.toVw(334);

  @include mx.mobile {
    padding-top: fn.toVw(230);
  }

  .loading,
  .error {
    @extend .font-body2;
    text-align: center;
    margin-top: fn.toVw(20);
  }

  .post-content {
    .post-head {
      width: 100%;
      padding: 0 fn.toVw(var.$container);
      @extend .font-body2;

      @include mx.mobile {
        padding: 0;
      }

      .post-head-inner {
        width: 100%;
        border-bottom: 1px solid rgba($color: var.$color-text, $alpha: 0.5);
        display: grid;
        grid-template-columns: repeat(var.$grid-col, 1fr);
        column-gap: fn.toVw(var.$grid-gap);
        padding: fn.toVw(24) 0;

        @include mx.mobile {
          display: flex;
          justify-content: space-between;
          padding: fn.toVw(16) fn.toVw(var.$container-m);
        }
      }

      .parent {
        grid-column: 1 / 3;
      }

      .date {
        grid-column: 5 / -1;
      }
    }

    .post-banner {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(var.$grid-col, 1fr);
      column-gap: fn.toVw(var.$grid-gap);
      padding: 0 fn.toVw(var.$container);

      @include mx.mobile {
        display: flex;
        padding: 0 fn.toVw(var.$container-m);
        padding-top: fn.toVw(40);
        padding-bottom: fn.toVw(72);
      }

      .title-wrapper {
        grid-column: 5 / 11;
        padding-top: fn.toVw(64);
        padding-bottom: fn.toVw(104);
        padding-right: fn.toVw(37);
        @extend .font-heading3;

        @include mx.mobile {
          padding-right: fn.toVw(0);
          padding-top: 0;
          padding-bottom: 0;
          line-height: calc(26 / 24);
        }
      }
    }

    .post-image {
      width: 100%;
      height: fn.toVw(732);

      @include mx.mobile {
        height: fn.toVw(562);
      }

      .image {
        width: 100%;
        height: 100%;
      }
    }

    .post-wrapper {
      display: grid;
      grid-template-columns: repeat(var.$grid-col, 1fr);
      column-gap: fn.toVw(var.$grid-gap);
      padding: 0 fn.toVw(var.$container);
      position: relative;
      margin-top: fn.toVw(144);
      margin-bottom: fn.toVw(144);

      @include mx.mobile {
        display: block;
        padding: 0 fn.toVw(var.$container-m);
        margin-top: fn.toVw(64);
        margin-bottom: fn.toVw(64);
      }

      .sticky {
        grid-column: 1 / 4;
        top: fn.toVw(100);
        max-width: fn.toVw(240);
        width: 100%;
        height: fit-content;
        position: sticky;
        @extend .font-body3;

        @include mx.mobile {
          max-width: 100%;
          position: relative;
          top: initial;
          margin-bottom: fn.toVw(64);
        }

        .category {
          color: var.$color-teriary;
          margin-bottom: fn.toVw(24);

          @include mx.mobile {
            max-width: fn.toVw(215);
          }
        }

        .title {
          @include mx.mobile {
            max-width: fn.toVw(215);
          }
        }

        .pdf {
          width: 100%;
          margin-top: fn.toVw(64);

          @include mx.mobile {
            margin-top: fn.toVw(48);
          }

          &:deep(.button-link) {
            gap: fn.toVw(80);
          }
        }
      }

      .post-text-wrapper {
        grid-column: 5 / 11;

        .overview {
          margin-bottom: fn.toVw(80);
          font-size: fn.toVw(38);
          font-weight: 300;
          line-height: calc(38 / 34);

          @include mx.mobile {
            margin-bottom: fn.toVw(64);
            font-size: fn.toVw(26);
          }
        }
      }
    }
  }
}

.post-text {
  h1 {
    @extend .font-heading2;
    margin-bottom: fn.toVw(48);

    @include mx.mobile {
      margin-bottom: fn.toVw(32);
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

.post-list {
  padding: fn.toVw(144) fn.toVw(var.$container);
  background-color: var.$color-secondary;

  @include mx.mobile {
    padding: fn.toVw(96) 0;
  }

  .title-wrapper {
    display: grid;
    grid-template-columns: repeat(var.$grid-col, 1fr);
    column-gap: fn.toVw(var.$grid-gap);
    margin-bottom: fn.toVw(64);

    .title {
      @extend .font-subheading3;
      grid-column: 3 / -1;
      margin-bottom: fn.toVw(32);
    }

    @include mx.mobile {
      display: block;
      padding: 0 fn.toVw(var.$container-m);
    }
  }
}

.post-inquiry {
  padding: fn.toVw(70) fn.toVw(20);
  background-color: var.$color-background2;
  color: var.$color-primary;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  @include mx.mobile {
    padding: fn.toVw(63) fn.toVw(50);
  }

  .title {
    @extend .font-subheading3;
    margin-bottom: fn.toVw(24);
  }

  .desc {
    width: 100%;
    max-width: fn.toVw(360);

    @include mx.mobile {
      max-width: 100%;
    }
  }
}
</style>
