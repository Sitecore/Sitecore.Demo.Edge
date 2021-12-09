import Link from 'next/link';
import { Field, Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Sponsor } from 'src/types/sponsor';

export type SponsorsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Sponsors: Sponsor[];
  };
};

const SponsorsGrid = (props: SponsorsProps): JSX.Element => {
  const sponsors =
    props?.fields?.Sponsors &&
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
    ));

  return <div className="section__sponsors__grid">{sponsors}</div>;
};

export default withDatasourceCheck()<SponsorsProps>(SponsorsGrid);
