import { LayoutServicePageState } from '@sitecore-jss/sitecore-jss-nextjs';

export const isEditingOrPreviewingPage = (pageState: LayoutServicePageState): boolean =>
  pageState === LayoutServicePageState.Edit || pageState === LayoutServicePageState.Preview;
