import Link from 'next/link';
import { Image, withDatasourceCheck } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Sponsor } from 'src/types/sponsor';

export type SelectedSponsorsGridProps = ComponentProps & {
  fields: {
    Sponsors: Sponsor[];
  };
};

const SelectedSponsorsGrid = (props: SelectedSponsorsGridProps): JSX.Element => {
  const sponsors =
    props?.fields?.Sponsors &&
    Array.isArray(props.fields.Sponsors) &&
    props.fields.Sponsors.map((sponsor, index) => (
      <Link key={index} href={sponsor.url} passHref>
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

export default withDatasourceCheck()<SelectedSponsorsGridProps>(SelectedSponsorsGrid);
