import { $fetch } from 'ofetch';
import { defineNuxtPlugin, useRoute, useRuntimeConfig } from '#app';
import type { PostResponse } from '~/types/post/response';

interface ApiResponse<T> {
  results?: T[];
  [key: string]: unknown;
}

interface CrudOptions {
  method?: 'GET' | 'POST';
  body?: unknown;
}

type FetchFunction = <T>(endpoint: string, options?: CrudOptions) => Promise<T | null>;

const createApiPath = (apiUrl: string, tokenId: string): string => `${apiUrl}/${tokenId}`;

const createFetchFunction = (apiPath: string): FetchFunction => {
  return async <T>(endpoint: string, options: CrudOptions = {}): Promise<T | null> => {
    const { method = 'GET', body } = options;
    try {
      const response = await $fetch<T>(`${apiPath}/${endpoint}`, {
        method,
        body: body ? JSON.stringify(body) : undefined,
        headers: body ? { 'Content-Type': 'application/json' } : undefined,
      });
      return response;
    } catch (error) {
      console.error(`DEBUG: Error fetching ${endpoint}:`, error);
      return null;
    }
  };
};

export default defineNuxtPlugin({
  name: 'crud',
  enforce: 'pre',
  setup() {
    const runtimeConfig = useRuntimeConfig();
    const apiPath = createApiPath(runtimeConfig.public.apiUrl, runtimeConfig.public.tokenId);
    const fetchData = createFetchFunction(apiPath);

    const crud = {
      async get<T>(type: string, query: string = ''): Promise<T | null> {
        return await fetchData<T>(`${type}${query ? `?${query}` : ''}`);
      },

      async getPostTypeByCategory<T>(type: string, cat: string, limit: number): Promise<T | null> {
        return await this.get<T>(`post/type/${type}`, `sort=id,DESC&where={"status":"published"}&categories=${cat}&size=${limit}`);
      },

      async getPostTypeCategory<T>(type: string): Promise<T | null> {
        return await this.get<T>(`category/type/${type}`);
      },

      async getSinglePost<T>(slugCheck: string | null = null): Promise<T | null> {
        const route = useRoute();
        const status = route.query.editing ? 'draft' : 'publish';
        const slug = slugCheck ?? (route.params.slug as string);
        return await this.get<T>(`post/slug/${slug}`, `status=${status}`);
      },

      async getPage<T>(slugCheck: string | null = null): Promise<T | null> {
        const route = useRoute();
        const status = route.query.editing ? 'draft' : 'publish';
        const slug = slugCheck ?? 'index';
        const response = await this.get<ApiResponse<T>>('page', `where={"customUrl.en":"${slug}"}&status=${status}`);
        return response?.results?.[0] ?? null;
      },

      async getHomepage<T>(): Promise<T | null> {
        return await this.get<T>('homepage');
      },

      async getSingleById<T>(id: string, type: string = 'page'): Promise<T | null> {
        return id ? await this.get<T>(`${type}/${id}`) : null;
      },

      async post<T>(slug: string, body: unknown): Promise<T | null> {
        return await fetchData<T>(slug, { method: 'POST', body });
      },

      async getCptDetail<T>(params: { post: string }): Promise<T | null> {
        if (!params?.post) return null;
        const data = await this.get<ApiResponse<T>>('website-setting', `where={"slug":"${params.post}"}`);
        return data?.results?.length ? data.results[0] : null;
      },

      async getWebconfig<T>(): Promise<T | null> {
        return await this.get<T>('webconfig');
      },

      async getNavigation<T>(): Promise<T | null> {
        return await this.get<T>('navigation');
      },

      async getAllPosts(): Promise<PostResponse | null> {
        return await this.get<PostResponse>('post');
      },

      async getAllPostsByType(type: string, limit: number): Promise<PostResponse | null> {
        return await this.get<PostResponse>(`post/type/${type}`, `sort=index,ASC&where={"status":"published"}&size=${limit}`);
      },

      async getRelatedPosts<T>(postId: string): Promise<T | null> {
        return await this.get<T>(`post/${postId}/relevant`);
      },
    };

    return {
      provide: { crud },
    };
  },
});
