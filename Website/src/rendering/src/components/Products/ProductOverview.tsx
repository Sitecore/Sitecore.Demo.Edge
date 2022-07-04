import Accordion from '../NonSitecore/Accordion';

type ProductOverviewProps = {
  items: ProductOverviewItemProps[];
  loading?: boolean;
};

type ProductOverviewItemProps = {
  heading: string;
  description: string;
  disabled: boolean;
  loading?: boolean;
};

const ProductOverview = (props: ProductOverviewProps): JSX.Element => {
  return (
    <Accordion
      heading="Product Overview"
      additionalClasses="product-overview"
      items={props.items}
      loading={props.loading}
    />
  );
};

export default ProductOverview;
