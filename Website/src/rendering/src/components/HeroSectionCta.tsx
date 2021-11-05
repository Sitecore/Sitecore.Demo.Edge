import { ComponentProps } from 'lib/component-props';
import { LinkField, Link } from '@sitecore-jss/sitecore-jss-nextjs';

export type HeroProps = ComponentProps & {
  fields: {
    Link: LinkField;
  };
};

const HeroSection = ({ fields }: HeroProps): JSX.Element => {
  return (
    <div className="btn__area">
      <Link field={fields.Link} className="btn--main btn--main--round btn--main--big" />
    </div>
  );
};

export default HeroSection;
