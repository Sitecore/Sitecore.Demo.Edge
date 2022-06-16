import { ComponentProps } from 'lib/component-props';
import {
  Text,
  Field,
  LinkField,
  Link,
  ImageField,
  Image,
  withDatasourceCheck,
} from '@sitecore-jss/sitecore-jss-nextjs';

export type ThreeColumnsSectionProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    LeftLogo: ImageField;
    LeftTitle: Field<string>;
    LeftLink: LinkField;
    MiddleLogo: ImageField;
    MiddleTitle: Field<string>;
    MiddleLink: LinkField;
    RightLogo: ImageField;
    RightTitle: Field<string>;
    RightLink: LinkField;
  };
};

const ThreeColumnsSection = ({ fields }: ThreeColumnsSectionProps): JSX.Element => {
  return (
    <section className="section three-col-section">
      <div className="section-content col-content container">
        <h2 className="section-content-title">
          <Text field={fields.Title} />
        </h2>
        <p className="section-content-p">
          <Text field={fields.Subtitle} />
        </p>
        <div className="col-items">
          <div className="item item-1">
            <Image field={fields.LeftLogo} alt={fields.LeftTitle.value} loading="lazy" />
            <p>
              <Text field={fields.LeftTitle} />
            </p>
            <Link field={fields.LeftLink} />
          </div>
          <div className="item item-2">
            <Image field={fields.MiddleLogo} alt={fields.MiddleTitle.value} loading="lazy" />
            <p>
              <Text field={fields.MiddleTitle} />
            </p>
            <Link field={fields.MiddleLink} />
          </div>
          <div className="item item-3">
            <Image field={fields.RightLogo} alt={fields.RightTitle.value} loading="lazy" />
            <p>
              <Text field={fields.RightTitle} />
            </p>
            <Link field={fields.RightLink} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default withDatasourceCheck()<ThreeColumnsSectionProps>(ThreeColumnsSection);
