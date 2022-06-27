import { ComponentProps } from 'lib/component-props';
import { LinkField, Link, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';

export type HeroSectionCtaProps = ComponentProps & {
  fields: {
    Link: LinkField;
  };
};

const HeroSectionCta = ({ fields }: HeroSectionCtaProps): JSX.Element => {
  return (
    <div className="btn-area">
      <Link field={fields.Link} className="btn-main" />
    </div>
  );
};

export default withDatasourceCheck()<HeroSectionCtaProps>(HeroSectionCta);
