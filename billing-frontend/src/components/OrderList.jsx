function OrderList({ orders }) {
  return (
    <div>

      {orders.map((order) => (
        <div key={order.id}>

          <h3>
            {order.customerName}
          </h3>

          <p>
            {order.customerNumber}
          </p>

          <p>
            Total : ₹
            {order.grandTotal}
          </p>

        </div>
      ))}

    </div>
  );
}

export default OrderList;