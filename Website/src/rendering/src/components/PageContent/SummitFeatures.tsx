import { ComponentWithChildrenProps } from 'lib/component-props';
import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';

const SummitFeatures = (props: ComponentWithChildrenProps): JSX.Element => (
  <div className="item-grid summit-features">
    <div className="grid-content">
      <Placeholder name="jss-summit-features-content" rendering={props.rendering} />

      {props.children}
    </div>
  </div>
);

export default SummitFeatures;
