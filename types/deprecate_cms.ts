// seen in Landing Page
export interface WellnessSection {
  'elementis-wellness-title': string;
  'elementis-wellness-description': string;
  'elementis-wellness-details': string;
  'elementis-wellness-button': string | null;
  'elementis-wellness-image': {
    aws_file_url: string;
    client: string;
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent: string | null;
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  };
}

export interface StorySection {
  'elementis-story-title': string;
  'elementis-story-description': string;
  'elementis-story-button-1-text': string;
  'elementis-story-button-2-text': string;
  'elementis-story-gallery': {
    aws_file_url: string;
    client: {
      _id: string;
      created_at: string;
      domain: string | null;
      featured: boolean;
      id: string;
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string | null;
      };
      master: boolean;
      name: string;
      options: {
        featured: boolean;
        menu_enabled_post: boolean;
        v2_editor: boolean;
      };
      status: string;
      template: string | null;
      updated_at: string;
      websiteName: string | null;
    };
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent: string | null;
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  }[];
}

export interface SustainabilitySection {
  'elementis-sustainability-marquee-text': string;
  'elementis-sustainability-description-1': string;
  'elementis-sustainability-description-2': string;
  'elementis-sustainability-button-list': {
    'elementis-sustainability-button-text': string;
    Link: string;
  }[];
}

// seen in Integrative Wellness Page
export interface IntegrativeSection {
  'elementis-integrative-wellness-page-title': string;
  'elementis-integrative-wellness-page-description': string;
  'elementis-integrative-wellness-page-image': {
    aws_file_url: string;
    client: string;
    created_at: string;
    path: string;
    filename: {
      big: string;
      blur: string;
      medium: string;
      raw: string;
      webp: string;
    };
  };
  'elementis-integrative-wellness-page-details': string;
}

export interface HeroSection {
  'elementis-hero-marquee-image': {
    aws_file_url: string;
    client: string;
    created_at: string;
    path: string;
    filename: {
      big: string;
      blur: string;
      medium: string;
      raw: string;
      webp: string;
    };
  };
  'elementis-hero-marquee-image-m': {
    aws_file_url: string;
    client: string;
    created_at: string;
    path: string;
    filename: {
      big: string;
      blur: string;
      medium: string;
      raw: string;
      webp: string;
    };
  };
  'elementis-hero-marquee-text': string;
}

export interface TextImageSlide {
  elementisTextImageSlideTitle: string;
  elementisTextImageSlideDescription: string;
  elementisTextImageSlideImage: {
    aws_file_url: string;
    client:
      | {
          _id: string;
          created_at: string;
          domain: string | null;
          featured: boolean;
          id: string;
          last_edited: {
            at: string;
            email: string;
            id: string;
            name: string;
            role: string;
            role_id: string | null;
          };
          master: boolean;
          name: string;
          options: {
            featured: boolean;
            menu_enabled_post: boolean;
            v2_editor: boolean;
          };
          status: string;
          template: string | null;
          updated_at: string;
          websiteName: string | null;
        }
      | string;
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent:
        | {
            client: string;
            created_at: string;
            id: string;
            last_edited: {
              at: string;
              email: string;
              id: string;
              name: string;
              role: string;
              role_id: string;
            };
            name: string;
            parent: string | null;
            type: string | null;
            updated_at: string;
            uri: string;
          }
        | string;
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  };
}

export interface TextImageSliderSection {
  elementisSectionTitle: string;
  elementisSectionSubtitle: string;
  elementisTextImageSlide: TextImageSlide[];
  elementisTextImageSlideM: TextImageSlide[];
}

export interface HorizontalScrollSection {
  HorizontalScrollSubtitle: string;
  HorizontalScrollSlide: Array<{
    HorizontalScrollSlideDescription: string;
    HorizontalScrollSlideImage: {
      aws_file_url: string;
      client: string;
      created_at: string;
      description: string | null;
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
        last_edited: {
          at: string;
          email: string;
          id: string;
          name: string;
          role: string;
          role_id: string;
        };
        name: string;
        parent: string;
        type: string | null;
        updated_at: string;
        uri: string;
      };
      id: string;
      is_aws: boolean;
      last_edited: string | null;
      original: string;
      path: string;
      size: number;
      title: string | null;
      type: string;
      updated_at: string;
    };
    HorizontalScrollSlideImageM: {
      aws_file_url: string;
      client: string;
      created_at: string;
      description: string | null;
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
        last_edited: {
          at: string;
          email: string;
          id: string;
          name: string;
          role: string;
          role_id: string;
        };
        name: string;
        parent: string;
        type: string | null;
        updated_at: string;
        uri: string;
      };
      id: string;
      is_aws: boolean;
      last_edited: string | null;
      original: string;
      path: string;
      size: number;
      title: string | null;
      type: string;
      updated_at: string;
    };
    HorizontalScrollSlideSubTitle: string;
    HorizontalScrollSlideTitle: string;
    HorizontalScrollSlideLink: string;
  }>;
}

export interface TextAreaDragSliderSection {
  TextAreaDragSliderSubtitle: string;
  TextAreaDragSliderDescription: string;
  TextAreaDragSliderSlide: TextAreaDragSliderSlide[];
}

export interface TextAreaDragSliderSlide {
  TextAreaDragSliderSlideTitle: string;
  TextAreaDragSliderSlideDescription: string;
  TextAreaDragSliderSlideImage: {
    aws_file_url: string;
    client: string;
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent: string;
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  };
}

export interface ImageMultiPointsSection {
  ImageMultiPointsImage: {
    aws_file_url: string;
    client: string;
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent: string | null;
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  };
  ImageMultiPointsList: Array<{
    ImageMultiPointsPointDescription: string;
    ImageMultiPointsPointTitle: string;
  }>;
  ImageMultiPointsSubtitle: string;
}

export interface TwoDescriptionsGallerySection {
  TwoDescriptionsGallerySectionTitle: string;
  TwoDescriptionsGallerySectionDescription: string;
  TwoDescriptionsGallerySectionDetailsContainer: Array<{
    TwoDescriptionsGallerySectionDetail: string;
  }>;
  TwoDescriptionsGallerySectionImages: Array<{
    aws_file_url: string;
    client: {
      _id: string;
      created_at: string;
      domain: string | null;
      featured: boolean;
      id: string;
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string | null;
      };
      master: boolean;
      name: string;
      options: {
        featured: boolean;
        menu_enabled_post: boolean;
        v2_editor: boolean;
      };
      status: string;
      template: string | null;
      updated_at: string;
      websiteName: string | null;
    };
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent: {
        client: string;
        created_at: string;
        id: string;
        last_edited: {
          at: string;
          email: string;
          id: string;
          name: string;
          role: string;
          role_id: string;
        };
        name: string;
        parent: string;
        type: string | null;
        updated_at: string;
        uri: string;
      };
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  }>;
}

export interface ImageListPoint {
  MarqueeText: string;
  Label: string;
  TopDescription: string;
  BottomDescription: string;
  ListItem: Array<{
    Text: string;
  }>;
  Image: {
    aws_file_url: string;
    client: {
      _id: string;
      created_at: string;
      domain: string | null;
      featured: boolean;
      id: string;
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string | null;
      };
      master: boolean;
      name: string;
      options: {
        featured: boolean;
        menu_enabled_post: boolean;
        v2_editor: boolean;
      };
      status: string;
      template: string | null;
      updated_at: string;
      websiteName: string | null;
    };
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent: {
        client: string;
        created_at: string;
        id: string;
        last_edited: {
          at: string;
          email: string;
          id: string;
          name: string;
          role: string;
          role_id: string;
        };
        name: string;
        parent: string;
        type: string | null;
        updated_at: string;
        uri: string;
      };
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  };
}

export interface ScrollChapter {
  List: Array<{
    Title: string;
    TopDescription: string;
    Image: {
      aws_file_url: string;
      client: {
        _id: string;
        created_at: string;
        domain: string | null;
        featured: boolean;
        id: string;
        last_edited: {
          at: string;
          email: string;
          id: string;
          name: string;
          role: string;
          role_id: string | null;
        };
        master: boolean;
        name: string;
        options: {
          featured: boolean;
          menu_enabled_post: boolean;
          v2_editor: boolean;
        };
        status: string;
        template: string | null;
        updated_at: string;
        websiteName: string | null;
      };
      created_at: string;
      description: string | null;
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
        last_edited: {
          at: string;
          email: string;
          id: string;
          name: string;
          role: string;
          role_id: string;
        };
        name: string;
        parent: {
          client: string;
          created_at: string;
          id: string;
          last_edited: {
            at: string;
            email: string;
            id: string;
            name: string;
            role: string;
            role_id: string;
          };
          name: string;
          parent: string;
          type: string | null;
          updated_at: string;
          uri: string;
        };
        type: string | null;
        updated_at: string;
        uri: string;
      };
      id: string;
      is_aws: boolean;
      last_edited: string | null;
      original: string;
      path: string;
      size: number;
      title: string | null;
      type: string;
      updated_at: string;
    };
    List: Array<{
      Text: string;
    }>;
    BottomDescription: string;
  }>;
}

export interface LabelDescriptionSection {
  LabelDescriptionDescription: string;
  LabelDescriptionLabel: string;
}

export interface PostListSection {
  PostListCollection: string;
}

export interface DescriptionImageDetailSection {
  SectionDescriptionImageDetailTitle: string;
  SectionDescriptionImageDetaiImageDetail: string;
  SectionDescriptionImageDetailDescription: string;
  SectionDescriptionImageDetailImage: {
    aws_file_url: string;
    client: {
      _id: string;
      created_at: string;
      domain: string | null;
      featured: boolean;
      id: string;
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string | null;
      };
      master: boolean;
      name: string;
      options: {
        featured: boolean;
        menu_enabled_post: boolean;
        v2_editor: boolean;
      };
      status: string;
      template: string | null;
      updated_at: string;
      websiteName: string | null;
    };
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent: {
        client: string;
        created_at: string;
        id: string;
        last_edited: {
          at: string;
          email: string;
          id: string;
          name: string;
          role: string;
          role_id: string;
        };
        name: string;
        parent: string | null;
        type: string | null;
        updated_at: string;
        uri: string;
      };
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  };
}

export interface BigImageSection {
  BigImageImage: {
    aws_file_url: string;
    client: {
      _id: string;
      created_at: string;
      domain: string | null;
      featured: boolean;
      id: string;
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string | null;
      };
      master: boolean;
      name: string;
      options: {
        featured: boolean;
        menu_enabled_post: boolean;
        v2_editor: boolean;
      };
      status: string;
      template: string | null;
      updated_at: string;
      websiteName: string | null;
    };
    created_at: string;
    description: string | null;
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
      last_edited: {
        at: string;
        email: string;
        id: string;
        name: string;
        role: string;
        role_id: string;
      };
      name: string;
      parent: {
        client: string;
        created_at: string;
        id: string;
        last_edited: {
          at: string;
          email: string;
          id: string;
          name: string;
          role: string;
          role_id: string;
        };
        name: string;
        parent: string | null;
        type: string | null;
        updated_at: string;
        uri: string;
      };
      type: string | null;
      updated_at: string;
      uri: string;
    };
    id: string;
    is_aws: boolean;
    last_edited: string | null;
    original: string;
    path: string;
    size: number;
    title: string | null;
    type: string;
    updated_at: string;
  };
}

export interface TimelineSection {
  TimelineContent: Array<{
    TimelineContentBlock: Array<{
      TimelineContentBlock: string;
      TimelineContentPoints: string;
    }>;
    TimelineContentLabel: string;
  }>;
  TimelineMarqueeText: string;
}

// Add this interface to the file
export interface NewDevelopmentsSection {
  newDevelopmentsTitle: string;
  countries: Array<{
    name: string;
    developments: string[];
  }>;
  pipeline: Array<{
    name: string;
    developments: string[];
  }>;
}

export interface TeamSection {
  TeamSectionTitle: string;
  TeamSectionList: Array<{
    TeamSectionListingName: string;
    TeamSectionListingOccupation: string;
    TeamSectionListingImage: {
      aws_file_url: string;
      path: string;
      filename: {
        raw: string;
      };
    };
    TeamSectionListingDescription: string;
    TeamSectionListingQuote?: string;
  }>;
}

export interface MarqueeAccordionSection {
  MarqueeAccordionContainer: Array<{
    MarqueeAccordionSlideDescription: string;
    MarqueeAccordionSlideImage: {
      aws_file_url: string;
      path: string;
      filename: {
        raw: string;
      };
    };
    MarqueeAccordionSlideTitle: string;
  }>;
  MarqueeAccordionMarqueeText: string;
}

export interface PrivacyTermsSection {
  Title: string;
  Description: string;
  Date: Date;
  List: {
    Title: string;
    Content: string;
  }[];
}

// Update the ComponentData type to include NewDevelopmentsSection
export type ComponentData =
  | WellnessSection
  | StorySection
  | SustainabilitySection
  | IntegrativeSection
  | HeroSection
  | TextImageSliderSection
  | HorizontalScrollSection
  | TextAreaDragSliderSection
  | ImageMultiPointsSection
  | TwoDescriptionsGallerySection
  | DescriptionImageDetailSection
  | BigImageSection
  | TimelineSection
  | NewDevelopmentsSection
  | TeamSection
  | MarqueeAccordionSection
  | LabelDescriptionSection
  | PostListSection
  | { [key: string]: any };

// Generic Page Data returned if hitting {$apiurl/homepage}
export interface HomePageData {
  components: {
    id: string;
    section: string;
    sectionId: string;
    title: string;
    section_title?: string;
    data?: {
      [key: string]: any;
    };
  }[];
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
  last_edited_by: {
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
  } | null;
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

// Generic Page Data returned if hitting {$apiurl/page
export interface PageData {
  is_last: boolean;
  results: {
    components: {
      id: string;
      section: string;
      sectionId: string;
      title: string;
      data?: ComponentData;
    }[];
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
    last_edited_by: {
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
    } | null;
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
  }[];
  total: number;
  total_page: number;
}
