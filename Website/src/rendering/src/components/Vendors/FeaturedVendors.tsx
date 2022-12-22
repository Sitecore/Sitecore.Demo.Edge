import Link from 'next/link';
import {
  Text,
  Field,
  Image,
  withDatasourceCheck,
  LayoutServicePageState,
  useSitecoreContext,
} from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { Vendor } from 'src/types/vendor';

type FeaturedVendorsProps = ComponentProps & {
  fields: {
    Title: Field<string>;
    Subtitle: Field<string>;
    Vendors: Vendor[];
  };
};

const FeaturedVendors = (props: FeaturedVendorsProps): JSX.Element => {
  const { sitecoreContext } = useSitecoreContext();

  const isPageEditing = sitecoreContext.pageState === LayoutServicePageState.Edit;
  const hasVendors = !!props?.fields?.Vendors?.length;

  !hasVendors && console.warn('Missing Datasource Item');

  const pageEditingMissingDatasource = !hasVendors && isPageEditing && (
    <p>Missing Datasource Item</p>
  );

  const vendors =
    props.fields?.Vendors &&
    props.fields.Vendors.map((vendor, index) => (
      <Link key={index} href={vendor.url} passHref>
        <a className="grid-item">
          <Image field={vendor.fields.Logo} alt={vendor.fields.Name} width={265} height={265} />
          <div className="item-details">
            <Text tag="p" field={vendor.fields.Name} />
          </div>
        </a>
      </Link>
    ));

  const featuredVendors = hasVendors && (
    <section className="section section-light">
      <div className="section-content container">
        <Text className="section-content-title" tag="h1" field={props.fields?.Title} />
        <Text className="section-content-subtitle-center" tag="p" field={props.fields?.Subtitle} />

        <div className="item-grid">
          <div className="grid-content">{vendors}</div>
        </div>
      </div>
    </section>
  );

  return (
    <>
      {featuredVendors}
      {pageEditingMissingDatasource}
    </>
  );
};

export default withDatasourceCheck()<FeaturedVendorsProps>(FeaturedVendors);
