import Link from 'next/link';
import { Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

type Sponsor = {
  fields: {
    Name: Field<string>;
    Logo: ImageField;
  };
};

type SponsorsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Sponsors: Sponsor[];
  };
};

const SponsorsGrid = (props: SponsorsProps): JSX.Element => (
  <div className="section__sponsors__grid">
    {props &&
      props.fields &&
      props.fields.Sponsors &&
      props.fields.Sponsors.map((sponsor, index) => (
        <Link key={index} href="#">
          <a className="section__sponsors__grid__sponsor">
            <div className="section__sponsors__grid__sponsor__imagecontainer">
              <Image
                field={sponsor.fields.Logo}
                alt={sponsor.fields.Name.value}
                width={180}
                height={80}
                loading="lazy"
              />
            </div>
          </a>
        </Link>
      ))}
  </div>
);

export type { Sponsor };
export type { SponsorsProps };
export default SponsorsGrid;
