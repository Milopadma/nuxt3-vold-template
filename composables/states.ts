import { useState } from '#app';

interface NavigationItem {
  position: string;
  menu: any;
}

interface PageSection {
  sectionId: string;
}

interface PageDetail {
  meta: any;
  title: any;
}

interface PopupDetail {
  // define the structure of popup detail if known
}

interface WebConfig {
  // define the structure of web config if known
}

export const useHeaderHidden = () => useState<boolean>('stateheaderHidden', () => false);
export const useMenu = () => useState<boolean>('stateMenu', () => false);
export const useNavigations = () => useState<NavigationItem[]>('navigation', () => []);
export const usePageSections = () => useState<PageSection[]>('usePageSections', () => []);
export const usePageDetail = () => useState<PageDetail | null>('usePageDetail', () => null);
export const usePopupDetail = () => useState<PopupDetail | null>('usePopupDetail', () => null);
export const useWebConfig = () => useState<WebConfig | null>('useWebConfig', () => null);
export const useIsPreloadDone = () => useState<boolean>('isPreloadDone', () => false);
export const useTlTransition = () => useState<null>('tlTransition', () => null);
export const useCursorClicked = () => useState<boolean>('cursorClicked', () => false);
export const useCursorDrag = () => useState<boolean>('cursorDrag', () => false);
export const useCursorDiscover = () => useState<boolean>('cursorDiscover', () => false);
export const useIsTransition = () => useState<boolean>('isTransition', () => false);
