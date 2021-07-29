import Link from 'next/link';
import { Field, ImageField, Image } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';

export type Sponsor = {
  fields: {
    Name: Field<string>;
    Logo: ImageField;
  };
};

export type SponsorsProps = ComponentProps & {
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
            <div className="m-3">
              <Image
                field={sponsor.fields.Logo}
                alt={sponsor.fields.Name.value}
                width={180}
                height={80}
              />
            </div>
          </a>
        </Link>
      ))}
  </div>
);

export default SponsorsGrid;
