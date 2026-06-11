const products = require("../data/products");
const orders = require("../data/orders");

exports.getDashboard = (req, res) => {

  const totalProducts = products.length;

  const totalOrders = orders.length;

  const totalSales = orders.reduce(
    (sum, order) =>
      sum + order.grandTotal,
    0
  );

  const totalStockValue =
    products.reduce(
      (sum, product) =>
        sum +
        product.price *
        product.quantity,
      0
    );

  const lowStockProducts =
    products.filter(
      product => product.quantity <= 5
    ).length;

  res.json({
    totalProducts,
    totalOrders,
    totalSales,
    totalStockValue,
    lowStockProducts
  });
};