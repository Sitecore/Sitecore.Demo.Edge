import {
  ComponentParams,
  ComponentRendering,
  SitecoreContextValue,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { PropsWithChildren } from 'react'; // DEMO TEAM CUSTOMIZATION - Add ComponentWithChildrenProps

/**
 * Shared component props
 */
export type ComponentProps = {
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

// DEMO TEAM CUSTOMIZATION - Add ComponentWithChildrenProps
/**
 * Component props with React children
 */
export type ComponentWithChildrenProps = PropsWithChildren<ComponentProps>;
// END CUSTOMIZATION
