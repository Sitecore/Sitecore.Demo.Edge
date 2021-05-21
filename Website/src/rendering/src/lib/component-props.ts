import {
  ComponentParams,
  ComponentFactory,
  ComponentRendering,
  LayoutServiceContext,
  RouteData,
} from '@sitecore-jss/sitecore-jss-nextjs';

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
