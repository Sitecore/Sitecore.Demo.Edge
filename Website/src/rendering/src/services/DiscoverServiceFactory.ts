import { MockDiscoverService } from './MockDiscoverService';
import { DiscoverService } from './DiscoverService';
import { LeftColumnProps } from 'components/PreviewSearch/LeftColumn';
import { PreviewSearchProps } from 'components/PreviewSearch/PreviewSearch';
import { RightColumnProps } from 'components/PreviewSearch/RightColumn';
import { FacetListProps } from 'components/FullPageSearch/FacetList';
import { FullPageSearchProps } from 'components/FullPageSearch/FullPageSearch';
import { SearchControlsProps } from 'components/FullPageSearch/SearchControls';

export type StorybookDiscoverComponentProps =
  | LeftColumnProps
  | PreviewSearchProps
  | RightColumnProps
  | FacetListProps
  | FullPageSearchProps
  | SearchControlsProps;

export const DiscoverServiceFactory = (
  componentName: string,
  componentProps?: Partial<StorybookDiscoverComponentProps>
): Partial<StorybookDiscoverComponentProps> | void =>
  componentName.startsWith('storybook')
    ? MockDiscoverService(componentName, componentProps)
    : DiscoverService();
