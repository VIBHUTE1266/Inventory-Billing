const products = require("../data/products");
const orders = require("../data/orders");

exports.createOrder = (req, res) => {

  const {
    customerName,
    customerNumber,
    items
  } = req.body;

  let grandTotal = 0;

  const orderItems = [];

  for (let item of items) {

    const product = products.find(
      p => p.id === item.productId
    );

    if (!product) {
      return res.status(404).json({
        message: "Product Not Found"
      });
    }

    if (product.quantity < item.quantity) {
      return res.status(400).json({
        message: "Stock Not Available"
      });
    }

    const total =
      product.price * item.quantity;

    grandTotal += total;

    product.quantity -= item.quantity;

    orderItems.push({
      productName: product.name,
      quantity: item.quantity,
      price: product.price,
      total
    });
  }

  const order = {
    id: Date.now(),
    customerName,
    customerNumber,
    items: orderItems,
    grandTotal
  };

  orders.push(order);

  res.status(201).json(order);
};

exports.getOrders = (req, res) => {
  res.json(orders);
};