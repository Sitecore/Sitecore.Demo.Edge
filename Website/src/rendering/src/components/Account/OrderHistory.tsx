import React, { useEffect, useState } from 'react';
import { Me, Order } from 'ordercloud-javascript-sdk';
import OrderHistoryContent from './OrderHistoryContent';

const OrderHistory = (): JSX.Element => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getMyOrders = async () => {
      const myOrders = await Me.ListOrders<Order>();
      setOrders(myOrders.Items);
      setLoading(false);
    };

    getMyOrders();
  }, []);

  if (loading) {
    return null;
  }

  return <OrderHistoryContent orders={orders} />;
};

export default OrderHistory;
