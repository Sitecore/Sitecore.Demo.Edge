import { MockDiscoverService } from './MockDiscoverService';
import { DiscoverService } from './DiscoverService';
import { LeftColumnProps } from 'components/PreviewSearch/LeftColumn';
import { RightColumnProps } from 'components/PreviewSearch/RightColumn';
import { FacetListProps } from 'components/FullPageSearch/FacetList';
import { SearchControlsProps } from 'components/FullPageSearch/SearchControls';
import { PreviewSearchWidgetProps, SearchResultsWidgetProps } from '@sitecore-discover/ui';

export type StorybookDiscoverComponentProps =
  | LeftColumnProps
  | PreviewSearchWidgetProps
  | RightColumnProps
  | FacetListProps
  | SearchResultsWidgetProps
  | SearchControlsProps;

export const DiscoverServiceFactory = (
  componentName: string,
  componentProps?: Partial<StorybookDiscoverComponentProps>
): Partial<StorybookDiscoverComponentProps> | void =>
  componentName.startsWith('storybook')
    ? MockDiscoverService(componentName, componentProps)
    : DiscoverService();
