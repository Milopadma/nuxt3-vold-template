<template>
  <section class="post-list-section">
    <div v-if="loading" class="loading">Loading posts...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else-if="posts.length" class="post-list">
      <CardPress v-for="post in posts" :key="post.id" :data="post" />
    </div>
    <p v-else>No posts found.</p>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { PostListSection } from '~/types/common';
import type { PostResponse } from '~/types/post/response';

interface Post {
  id: string;
  title: { en: string };
  data: {
    PostDate: string;
    PostAbstract: string;
    PostContent: string;
  };
  meta: {
    image: {
      aws_file_url: string;
      path: string;
      filename: {
        raw: string;
      };
    };
  };
  customUrl?: { en: string };
}

const props = defineProps<{
  data: PostListSection;
}>();

const { $crud } = useNuxtApp();
const posts = ref<Post[]>([]);
const loading = ref<boolean>(true);
const error = ref<string | null>(null);

try {
  const postData: PostResponse | null = await $crud.getAllPostsByType('press', 10);
  if (postData && postData.results) {
    posts.value = postData.results as Post[];
  } else {
    error.value = 'No posts found or invalid data structure.';
  }
} catch (err: unknown) {
  console.error('Error fetching posts:', err);
  error.value = 'Failed to load posts. Please try again later.';
} finally {
  loading.value = false;
}
</script>

<style scoped lang="scss">
.post-list-section {
  padding: 0 fn.toVw(var.$container);

  @include mx.mobile {
    padding: 0;
  }

  h2 {
    @extend .font-subheading3;
  }

  .loading,
  .error {
    @extend .font-body2;
    text-align: center;
    margin-top: fn.toVw(20);
  }

  .post-list {
    display: flex;
    flex-direction: column;
  }
}
</style>
