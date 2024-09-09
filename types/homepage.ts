// response from /homepage
export interface HomePageData {
  components: HomePageComponent[];
  created_at: string;
  customUrl: {
    en: string;
  };
  data: any;
  description: string | null;
  featured: boolean | null;
  id: string;
  index: number | null;
  is_exclude_path: boolean;
  is_frontpage: boolean;
  last_edited: {
    at: string;
    email: string;
    id: string;
    name: string;
    role: string;
    role_id: string;
  };
  last_edited_by: LastEditedBy | null;
  meta: any;
  pageId: string | null;
  path: string | null;
  slug: {
    en: string;
  };
  status: string;
  title: {
    en: string;
  };
  updated_at: string;
}

export interface HomePageComponent {
  id: string;
  section: string;
  sectionId: string;
  title: string;
  section_title?: string;
  data?: {
    [key: string]: any;
  };
}

export interface LastEditedBy {
  _id: string;
  email: string;
  name: string;
  role: {
    _id: string;
    client: string;
    created_at: string;
    disabled_create: any[];
    disabled_menu: any[];
    is_full_access: boolean;
    is_ignore_self_permission: boolean;
    last_edited: string | null;
    name: string;
    permission: any[];
    updated_at: string;
  };
}
