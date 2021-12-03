import {
  // DEMO TEAM CUSTOMIZATION - Removed unused import
  ComponentParams,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { PropsWithChildren } from 'react'; // DEMO TEAM CUSTOMIZATION - Add ComponentWithChildrenProps

// DEMO TEAM CUSTOMIZATION - Rename types to remove references to Styleguide.
/**
 * Sitecore context value shape
 */
export type SitecoreContextValue = LayoutServiceContext & {
  itemId?: string;
  route: RouteData;
};

// DEMO TEAM CUSTOMIZATION - Remove StyleguideSpecimenFields

/**
 * Shared component props
 */
export type ComponentProps = {
  rendering: ComponentRendering;
  params: ComponentParams;
};

// DEMO TEAM CUSTOMIZATION - Add ComponentWithChildrenProps
/**
 * Component props with React children
 */
export type ComponentWithChildrenProps = PropsWithChildren<ComponentProps>;
// END CUSTOMIZATION

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
