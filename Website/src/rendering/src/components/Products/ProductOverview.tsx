import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

// TODO: Story for component

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

// TODO: Maybe create a generic accordion component and use in here?
const ProductOverview = (props: ProductOverviewProps): JSX.Element => {
  const header = <div className="accordion-heading">{!props.loading && 'Product Overview'}</div>;
  const loadingClass = props.loading ? 'loading' : '';
  return (
    <div className={`product-overview accordion ${loadingClass}`}>
      {header}
      <div className="accordion-body">
        {props.items.map((item, i) => {
          return <ProductOverviewItem {...item} key={i} loading={props.loading} />;
        })}
      </div>
    </div>
  );
};

const ProductOverviewItem = (props: ProductOverviewItemProps): JSX.Element => {
  const [active, setActive] = useState(false);
  const isDisabled = props.loading || props.disabled;

  const handleItemClick = () => {
    setActive(!active);
  };

  const additionalClass = isDisabled ? 'disabled' : active ? 'active' : '';

  return (
    <div className={`accordion-item ${additionalClass}`}>
      <button className="accordion-item-heading" disabled={isDisabled} onClick={handleItemClick}>
        {/* TODO: Extract JSX logic into a const */}
        {props.loading ? <Skeleton width={100} /> : props.heading}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <p className="accordion-item-body">{props.description}</p>
    </div>
  );
};

export default ProductOverview;
