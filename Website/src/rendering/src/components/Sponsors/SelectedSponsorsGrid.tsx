import Link from 'next/link';
import {
  Image,
  withDatasourceCheck,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps, SitecoreContextValue } from 'lib/component-props';
import { Sponsor } from 'src/types/sponsor';

export type SelectedSponsorsGridProps = ComponentProps & {
  fields: {
    Sponsors: Sponsor[];
  };
};

const SelectedSponsorsGrid = (props: SelectedSponsorsGridProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext<SitecoreContextValue>();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasSponsors = !!props?.fields?.Sponsors?.length;

  !hasSponsors && console.warn('Missing Datasource Item');

  const pageEditingMissingDatasource = !hasSponsors && isPageEditing && (
    <p>Missing Datasource Item</p>
  );

  const sponsors =
    props?.fields?.Sponsors &&
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

  const selectedSponsorsGrid = hasSponsors && (
    <div className="section__sponsors__grid">{sponsors}</div>
  );

  return (
    <>
      {selectedSponsorsGrid}
      {pageEditingMissingDatasource}
    </>
  );
};

export default withDatasourceCheck()<SelectedSponsorsGridProps>(SelectedSponsorsGrid);
