import {
  // DEMO TEAM CUSTOMIZATION - Removed unused import
  ComponentParams,
  ComponentFactory,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { PropsWithChildren } from 'react'; // DEMO TEAM CUSTOMIZATION - Add ComponentWithChildrenProps

// DEMO TEAM CUSTOMIZATION - Rename types to remove references to Styleguide. Remove StyleguideSpecimenFields.
/**
 * Sitecore context value shape
 */
export type SitecoreContextValue = LayoutServiceContext & {
  itemId?: string;
  route: RouteData;
};

/**
 * Shared component props
 */
export type ComponentProps = {
  // componentFactory: ComponentFactory; // Needed?
  rendering: ComponentRendering;
  params: ComponentParams;
};

/**
 * Component props with React children
 */
export type ComponentWithChildrenProps = PropsWithChildren<ComponentProps>;

/**
 * Component props with context
 * You can access `sitecoreContext` by withSitecoreContext/useSitecoreContext
 * @example withSitecoreContext()(ContentBlock)
 * @example const { sitecoreContext } = useSitecoreContext()
 */
export type ComponentWithContextProps = ComponentProps & {
  sitecoreContext: SitecoreContextValue;
};
// END CUSTOMIZATION
