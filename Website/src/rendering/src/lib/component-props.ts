import {
  // DEMO TEAM CUSTOMIZATION - Removed unused import
  ComponentParams,
  ComponentFactory,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';

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
  componentFactory: ComponentFactory;
  rendering: ComponentRendering;
  params: ComponentParams;
};

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
