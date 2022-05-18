import React, { FunctionComponent, useEffect, useState } from 'react';
import { Me, Order } from 'ordercloud-javascript-sdk';
import Link from 'next/link';

const MyAccount: FunctionComponent = (): JSX.Element => {
  const [orders, setOrders] = useState<Order[]>([]);
  // Add custom functions
  const getMyOrders = async (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e?.preventDefault();
    const myOrders = await Me.ListOrders<Order>();
    setOrders(myOrders.Items);
  };

  useEffect(() => {
    if (orders.length > 0) {
      console.log(orders);
    }
  }, [orders]);

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
                <p className={`order-status ${statusBgClass}`}>{order?.Status || 'Unsubmitted'} </p>
                <p className="order-id">{order?.ID || '5625590'}</p>
                <p>Placed: {order?.DateCreated || '09.02.2022'}</p>
                <p>Total: {order?.Total || '$1,899.99'}</p>
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
      <Link href="#">
        <a className="btn--main btn--main--round" onClick={(e) => getMyOrders(e)}>
          My Orders
        </a>
      </Link>
      <h1>Order History</h1>
      <div className="order-history-grid">{ordersList}</div>
    </section>
  );
};

export default MyAccount;
