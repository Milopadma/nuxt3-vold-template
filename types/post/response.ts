interface LastEdited {
  at: string;
  email: string;
  id: string;
  name: string;
  role: string;
  role_id: string;
}

interface Category {
  client: string;
  created_at: string;
  description: {
    en: string;
  };
  featured: null;
  id: string;
  label: null;
  last_edited: LastEdited;
  parent: null;
  slug: {
    en: string;
  };
  title: {
    en: string;
  };
  type: string;
  updated_at: string;
}

interface PostData {
  PostAbstract?: string; // now called "Overview"
  PostContent?: string; // now called "Content"
  PostDate: string; // now called "Date"
}

interface MetaImage {
  aws_file_url: string;
  client: string;
  created_at: string;
  description: null;
  filename: {
    big: string;
    blur: string;
    medium: string;
    raw: string;
    webp: string;
  };
  folder: {
    client: string;
    created_at: string;
    id: string;
    last_edited: LastEdited;
    name: string;
    parent: null;
    type: null;
    updated_at: string;
    uri: string;
  };
  id: string;
  is_aws: boolean;
  last_edited: null;
  original: string;
  path: string;
  size: number;
  title: null;
  type: string;
  updated_at: string;
}

interface Meta {
  image?: MetaImage;
  title?: {
    en: string;
  };
}

interface Role {
  _id: string;
  client: string;
  created_at: string;
  disabled_create: string[];
  disabled_menu: string[];
  is_full_access: boolean;
  is_ignore_self_permission: boolean;
  last_edited: null;
  name: string;
  permission: string[];
  updated_at: string;
}

interface LastEditedBy {
  _id: string;
  email: string;
  name: string;
  role: Role;
}

interface PostType {
  client: string;
  components: null;
  created_at: string;
  data: {
    data: {
      cardDetail: {
        apiModel: {
          path: string;
          post_type: string;
        };
        group: Array<{
          fields: Array<{
            component: string;
            description?: string;
            hasLanguage: boolean | string;
            model: string;
            title: string;
            options?: {
              values: string[];
            };
          }>;
        }>;
      };
      title: string;
    };
    hasCategory: boolean;
    menu_position: {
      id: string;
    };
    order: boolean;
    path: string;
  };
  id: string;
  last_edited: LastEdited;
  slug: string;
  title: string;
  type: string;
  updated_at: string;
}

export interface Post {
  block: null;
  categories: Category[];
  components: null;
  created_at: string;
  customUrl: { en: string } | null;
  data: PostData;
  description: null;
  excerpt: null;
  featured: null;
  gallery: unknown[];
  id: string;
  index: null;
  last_edited: LastEdited;
  last_edited_by: LastEditedBy;
  meta: Meta | null;
  parent: null;
  path: null;
  post_type: PostType;
  published_at: null;
  relations: null;
  slug: {
    en: string;
  };
  status: 'published' | 'draft';
  title: {
    en: string;
  };
  type: string;
  updated_at: string;
}

export interface PostResponse {
  is_last: boolean;
  results: Post[];
  total: number;
  total_page: number;
}
