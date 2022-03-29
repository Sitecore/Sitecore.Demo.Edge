import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

// TODO: Story for component

type ProductOverviewProps = {
  items: ProductOverviewItemProps[];
};

type ProductOverviewItemProps = {
  heading: string;
  description: string;
  disabled: boolean;
};

// TODO: Maybe create a generic accordion component and use in here?
const ProductOverview = (props: ProductOverviewProps): JSX.Element => {
  return (
    <div className="product-overview accordion">
      <div className="accordion-heading">Product Overview</div>
      <div className="accordion-body">
        {props.items.map((item, i) => {
          return <ProductOverviewItem {...item} key={i} />;
        })}
      </div>
    </div>
  );
};

const ProductOverviewItem = (props: ProductOverviewItemProps): JSX.Element => {
  const [active, setActive] = useState(false);

  const handleItemClick = () => {
    setActive(!active);
  };

  const additionalClass = props.disabled ? 'disabled' : active ? 'active' : '';

  return (
    <div className={`accordion-item ${additionalClass}`}>
      <button
        className="accordion-item-heading"
        disabled={props.disabled}
        onClick={handleItemClick}
      >
        {props.heading}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <p className="accordion-item-body">{props.description}</p>
    </div>
  );
};

export default ProductOverview;
