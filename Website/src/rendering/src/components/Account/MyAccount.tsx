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
    <table>
      <tr>
        <th>ID</th>
        <th>From</th>
        <th>Total</th>
      </tr>
      {orders.map((order, key) => {
        return (
          <tr key={key}>
            <td>
              <Link href={`orders/${order.ID}`}>
                <a>{order.ID}</a>
              </Link>
            </td>
            <td>
              {order?.FromUser?.FirstName} {order?.FromUser?.LastName}
            </td>
            <td>{order.Total}</td>
          </tr>
        );
      })}
    </table>
  );

  // Configure return
  return (
    <div className="full-page-search">
      <div className="full-page-search-container">
        <div className="full-page-search-left">
          <ul>
            <li>
              <Link href="#">
                <a onClick={(e) => getMyOrders(e)}>My Orders</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="full-page-search-right">{ordersList}</div>
      </div>
    </div>
  );
};

export default MyAccount;
