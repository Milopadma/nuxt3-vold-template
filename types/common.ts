// Common types used across different sections
export interface ImageFile {
  aws_file_url: string;
  client:
    | string
    | {
        _id: string;
        created_at: string;
        domain: string | null;
        featured: boolean;
        id: string;
        last_edited: LastEdited;
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
    last_edited: LastEdited;
    name: string;
    parent:
      | string
      | null
      | {
          client: string;
          created_at: string;
          id: string;
          last_edited: LastEdited;
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
}

export interface LastEdited {
  at: string;
  email: string;
  id: string;
  name: string;
  role: string;
  role_id: string | null;
}

export interface WellnessSection {
  'elementis-wellness-title': string;
  'elementis-wellness-description': string;
  'elementis-wellness-details': string;
  'elementis-wellness-button': string | null;
  'elementis-wellness-image': ImageFile;
}

export interface StorySection {
  'elementis-story-title': string;
  'elementis-story-description': string;
  'elementis-story-button-1-text': string;
  'elementis-story-button-2-text': string;
  'elementis-story-gallery': ImageFile[];
}

export interface SustainabilitySection {
  'elementis-sustainability-marquee-text': string;
  'elementis-sustainability-description-1': string;
  'elementis-sustainability-description-2': string;
  'elementis-sustainability-button-list': Array<{
    'elementis-sustainability-button-text': string;
    Link: string;
  }>;
}

export interface IntegrativeSection {
  'elementis-integrative-wellness-page-title': string;
  'elementis-integrative-wellness-page-description': string;
  'elementis-integrative-wellness-page-image': ImageFile;
  'elementis-integrative-wellness-page-details': string;
}

export interface HeroSection {
  'elementis-hero-marquee-image': ImageFile;
  'elementis-hero-marquee-image-m': ImageFile;
  'elementis-hero-marquee-text': string;
}

export interface TextImageSlide {
  elementisTextImageSlideTitle: string;
  elementisTextImageSlideDescription: string;
  elementisTextImageSlideImage: ImageFile;
  elementisTextImageSlideImageM: ImageFile;
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
    HorizontalScrollSlideImage: ImageFile;
    HorizontalScrollSlideImageM: ImageFile;
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
  TextAreaDragSliderSlideImage: ImageFile;
}

export interface ImageMultiPointsSection {
  ImageMultiPointsImage: ImageFile;
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
  TwoDescriptionsGallerySectionImages: ImageFile[];
}

export interface ImageListPointSection {
  MarqueeText: string;
  Label: string;
  TopDescription: string;
  BottomDescription: string;
  ListItem: Array<{
    Text: string;
  }>;
  Image: ImageFile;
}

export interface ScrollChapterSection {
  List: Array<{
    Title: string;
    TopDescription: string;
    Image: ImageFile;
    BottomDescription: string;
    List: Array<{
      Text: string;
    }>;
  }>;
}

export interface DescriptionImageDetailSection {
  SectionDescriptionImageDetailTitle: string;
  SectionDescriptionImageDetaiImageDetail: string;
  SectionDescriptionImageDetailDescription: string;
  SectionDescriptionImageDetailImage: ImageFile;
}

export interface BigImageSection {
  BigImageImage: ImageFile;
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
    TeamSectionListingImage: ImageFile;
    TeamSectionListingDescription: string;
    TeamSectionListingQuote?: string;
  }>;
}

export interface MarqueeAccordionSection {
  MarqueeAccordionContainer: Array<{
    MarqueeAccordionSlideDescription: string;
    MarqueeAccordionSlideImage: ImageFile;
    MarqueeAccordionSlideTitle: string;
  }>;
  MarqueeAccordionMarqueeText: string;
}

export interface LabelDescriptionSection {
  LabelDescriptionDescription: string;
  LabelDescriptionLabel: string;
}

export interface PostListSection {
  PostListCollection: string;
}

export interface LabelDescription {
  LabelDescriptionLabel: string;
  LabelDescriptionDescription: string;
}

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
  | ImageListPointSection
  | ScrollChapterSection
  | DescriptionImageDetailSection
  | BigImageSection
  | TimelineSection
  | NewDevelopmentsSection
  | TeamSection
  | MarqueeAccordionSection
  | LabelDescriptionSection
  | PostListSection
  | LabelDescription
  | { [key: string]: any };
