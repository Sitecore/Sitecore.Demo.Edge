import Link from 'next/link';
import {
  Text,
  Image,
  withDatasourceCheck,
  useSitecoreContext,
  LayoutServicePageState,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Vendor } from 'src/types/vendor';

type VendorsGridProps = ComponentProps & {
  fields: {
    items: Vendor[];
  };
};

const VendorsGrid = (props: VendorsGridProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasVendors = !!props.fields;

  !hasVendors && console.warn('Missing Datasource Item');

  const pageEditingMissingDatasource = !hasVendors && isPageEditing && (
    <p>Missing Datasource Item</p>
  );

  const vendors =
    props.fields?.items &&
    props.fields.items.map((vendor, index) => (
      <Link key={index} href={vendor.url} passHref>
        <a className="grid-item">
          <Image
            field={vendor.fields.Logo}
            alt={vendor.fields.Name.value}
            width={265}
            height={265}
          />
          <div className="item-details">
            <Text tag="p" field={vendor.fields.Name} />
          </div>
        </a>
      </Link>
    ));

  const vendorsGrid = hasVendors && (
    <section className="section">
      <div className="section-content container">
        <h1 className="section-content-title">All Event Vendors</h1>
        <div className="item-grid">
          <div className="grid-filters">
            <span>Filter by</span>
            <button
              type="button"
              className="dropdown-filter"
              id="menu-button-schedule"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="schedule"
            >
              Schedule
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="dropdown-filter"
              id="menu-button-speakers"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="speakers"
            >
              Speakers
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="dropdown-filter"
              id="menu-button-category"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="category"
            >
              Category
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
            <button
              type="button"
              className="dropdown-filter"
              id="menu-button-sport"
              aria-expanded="true"
              aria-haspopup="true"
              aria-label="sport"
            >
              Sport
              <img src="/assets/img/icons/down-arrow.svg" alt="^" />
            </button>
          </div>

          <div className="grid-content">{vendors}</div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {vendorsGrid}
      {pageEditingMissingDatasource}
    </>
  );
};

export default withDatasourceCheck()<VendorsGridProps>(VendorsGrid);
