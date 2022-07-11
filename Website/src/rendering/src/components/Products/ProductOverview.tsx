import Accordion, { AccordionItemProps } from '../NonSitecore/Accordion';

type ProductOverviewProps = {
  items: AccordionItemProps[];
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
