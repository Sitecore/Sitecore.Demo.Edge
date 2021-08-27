import { Placeholder } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type SummitFeaturesProps = ComponentProps & {
  children: React.ReactNode;
};

const SummitFeatures = (props: SummitFeaturesProps): JSX.Element => (
  <div className="item-grid summit-features">
    <div className="grid-content">
      <Placeholder name="jss-summit-features-content" rendering={props.rendering} />

      {props.children}
    </div>
  </div>
);

export default SummitFeatures;
