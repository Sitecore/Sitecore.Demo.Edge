import { Order } from 'ordercloud-javascript-sdk';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { getOrderDate } from '../../helpers/DateHelper';
import { formatCurrency } from '../../helpers/CurrencyHelper';

interface OrderHistoryContentProps {
  orders: Order[];
}

const OrderHistoryContent = ({ orders }: OrderHistoryContentProps): JSX.Element => {
  const noOrders = (!orders || orders.length === 0) && <div>You have not placed any order.</div>;

  const ordersList = orders?.length > 0 && (
    <ul>
      {orders.map((order) => {
        if (!order) {
          return null;
        }

        const statusBgClass =
          order.Status === 'Completed'
            ? 'bg-orange'
            : order.Status === 'Canceled'
            ? 'bg-pink'
            : 'bg-blue-light';

        return (
          <li key={order.ID}>
            <Link href={`orders/${order.ID}`}>
              <a>
                <p className={`order-status ${statusBgClass}`}>{order.Status} </p>
                <div>
                  <p className="order-id">{order.ID}</p>
                  <p>Placed: {getOrderDate(new Date(order.DateCreated))}</p>
                  <p>Total: {formatCurrency(order.Total)}</p>
                </div>
                <FontAwesomeIcon icon={faEye} className="order-view" />
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <section className="order-history shop-container section">
      <h1>Order history</h1>
      <div className="order-history-grid">
        {noOrders}
        {ordersList}
      </div>
    </section>
  );
};

export default OrderHistoryContent;
