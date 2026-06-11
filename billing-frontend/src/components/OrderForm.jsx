import { useState } from "react";
import axios from "axios";

function OrderForm({
  products,
  refreshData
}) {
  const [customerName, setCustomerName] =
    useState("");

  const [customerNumber, setCustomerNumber] =
    useState("");

  const [productId, setProductId] =
    useState("");

  const [quantity, setQuantity] =
    useState("");

  const [items, setItems] = useState([]);

  const addItem = () => {
    if (!productId || !quantity) return;

    setItems([
      ...items,
      {
        productId: Number(productId),
        quantity: Number(quantity)
      }
    ]);

    setProductId("");
    setQuantity("");
  };

  const placeOrder = async () => {
    await axios.post(
      "http://localhost:5000/orders",
      {
        customerName,
        customerNumber,
        items
      }
    );

    setItems([]);
    setCustomerName("");
    setCustomerNumber("");

    refreshData();
  };

  const grandTotal = items.reduce(
    (sum, item) => {
      const product = products.find(
        p => p.id === item.productId
      );

      return (
        sum +
        product.price * item.quantity
      );
    },
    0
  );

  return (
    <div>

      <input
        placeholder="Customer Name"
        value={customerName}
        onChange={(e) =>
          setCustomerName(e.target.value)
        }
      />

      <input
        placeholder="Customer Number"
        value={customerNumber}
        onChange={(e) =>
          setCustomerNumber(e.target.value)
        }
      />

      <select
        value={productId}
        onChange={(e) =>
          setProductId(e.target.value)
        }
      >
        <option>Select Product</option>

        {products.map((product) => (
          <option
            key={product.id}
            value={product.id}
          >
            {product.name} - ₹
            {product.price}
          </option>
        ))}
      </select>

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) =>
          setQuantity(e.target.value)
        }
      />

      <button onClick={addItem}>
        Add Item
      </button>

      <h3>Selected Items</h3>

      <ul>
        {items.map((item, index) => {
          const product = products.find(
            p => p.id === item.productId
          );

          return (
            <li key={index}>
              {product?.name}
              {" - "}
              {item.quantity}
            </li>
          );
        })}
      </ul>

      <h2>Grand Total : ₹{grandTotal}</h2>

      <button onClick={placeOrder}>
        Place Order
      </button>

    </div>
  );
}

export default OrderForm;