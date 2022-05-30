import React, { useEffect, useState } from 'react';
import { ListPage, Me, Order } from 'ordercloud-javascript-sdk';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { getOrderDate } from '../../helpers/DateHelper';

interface OrderHistoryGridProps {
  storyOrders?: ListPage<Order>;
}

const OrderHistoryGrid = ({ storyOrders }: OrderHistoryGridProps): JSX.Element => {
  const [orders, setOrders] = useState<Order[]>([]);
  // Add custom functions
  const getMyOrders = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e?.preventDefault();
    const myOrders = storyOrders ? storyOrders : await Me.ListOrders<Order>();
    setOrders(myOrders.Items);
  };

  useEffect(() => {
    getMyOrders(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ordersList = orders.length > 0 && (
    <ul>
      {orders.map((order) => {
        const statusBgClass =
          order?.Status === 'Completed'
            ? 'bg-orange'
            : order?.Status === 'Canceled'
            ? 'bg-pink'
            : 'bg-blue-light';

        return (
          <li key={order?.ID}>
            <Link href={`orders/${order?.ID}`}>
              <a>
                <p className={`order-status ${statusBgClass}`}>{order?.Status} </p>
                <div>
                  <p className="order-id">{order?.ID}</p>
                  <p>Placed: {getOrderDate(new Date(order?.DateCreated))}</p>
                  <p>Total: ${order?.Total}</p>
                </div>
                <FontAwesomeIcon icon={faEye} className="order-view" />
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );

  // Configure return
  return (
    <section className="order-history shop-container">
      <h1>Order History</h1>
      <div className="order-history-grid">{ordersList}</div>
    </section>
  );
};

export default OrderHistoryGrid;
