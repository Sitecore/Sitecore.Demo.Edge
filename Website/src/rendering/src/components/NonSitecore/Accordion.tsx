import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

type AccordionProps = {
  heading: string;
  items: AccordionItemProps[];
  additionalClasses?: string;
  loading?: boolean;
};

export type AccordionItemProps = {
  heading: string;
  description: string;
  disabled?: boolean;
  loading?: boolean;
};

const Accordion = (props: AccordionProps): JSX.Element => {
  const heading = !props.loading && props.heading;
  const loadingClass = props.loading ? 'loading' : '';
  const additionalClasses = props.additionalClasses ? props.additionalClasses : '';

  const items = props.items.map((item, i) => {
    return <AccordionItem {...item} key={i} loading={props.loading} />;
  });

  return (
    <div className={`accordion ${loadingClass} ${additionalClasses}`}>
      <div className="accordion-heading">{heading}</div>
      <div className="accordion-body">{items}</div>
    </div>
  );
};

const AccordionItem = (props: AccordionItemProps): JSX.Element => {
  const [active, setActive] = useState(false);
  const isDisabled = props.loading || props.disabled;

  const handleItemClick = () => {
    setActive(!active);
  };

  const additionalClass = isDisabled ? 'disabled' : active ? 'active' : '';
  const heading = props.loading ? <Skeleton width={100} /> : props.heading;

  return (
    <div className={`accordion-item ${additionalClass}`}>
      <button className="accordion-item-heading" disabled={isDisabled} onClick={handleItemClick}>
        {heading}
        <FontAwesomeIcon icon={faChevronDown} />
      </button>
      <p className="accordion-item-body">{props.description}</p>
    </div>
  );
};

export default Accordion;
