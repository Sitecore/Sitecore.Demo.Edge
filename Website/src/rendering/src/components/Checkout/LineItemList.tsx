import useOcCurrentOrder from '../../hooks/useOcCurrentOrder';
import LineItemCard from './LineItemCard';

type LineItemListProps = {
  editable?: boolean;
};

const LineItemList = (props: LineItemListProps): JSX.Element => {
  const { lineItems } = useOcCurrentOrder();

  return lineItems && lineItems.length ? (
    <ol>
      {lineItems.map((li) => (
        <li key={li.ID}>
          <LineItemCard lineItem={li} editable={props.editable} />
        </li>
      ))}
    </ol>
  ) : (
    <h3>No line items</h3>
  );
};

export default LineItemList;
