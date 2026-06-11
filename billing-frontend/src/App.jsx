import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import Dashboard from "./components/Dashboard";
import ProductForm from "./components/ProductForm";
import ProductList from "./components/ProductList";
import OrderForm from "./components/OrderForm";
import OrderList from "./components/OrderList";

function App() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [dashboard, setDashboard] = useState({});
  const [editProduct, setEditProduct] = useState(null);

  const getProducts = async () => {
    const res = await axios.get("http://localhost:5000/products");
    setProducts(res.data);
  };

  const getOrders = async () => {
    const res = await axios.get("http://localhost:5000/orders");
    setOrders(res.data);
  };

  const getDashboard = async () => {
    const res = await axios.get("http://localhost:5000/dashboard");
    setDashboard(res.data);
  };

  const refreshData = () => {
    getProducts();
    getOrders();
    getDashboard();
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <div className="container">
      <header className="site-header">
        <div className="brand">
          <div className="brand-mark">B</div>
          <div>
            <p className="brand-label">Billing System</p>
            <h1>Inventory & Billing</h1>
          </div>
        </div>
        <nav className="main-nav">
          <a href="#product-management">Products</a>
          <a href="#order-section">Place Order</a>
          <a href="#order-history">Order History</a>
        </nav>
      </header>

      <Dashboard dashboard={dashboard} />

      <section id="product-management">
        <h2>Product Management</h2>

        <ProductForm
          refreshData={refreshData}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
        />

        <ProductList
          products={products}
          refreshData={refreshData}
          setEditProduct={setEditProduct}
        />
      </section>

      <section id="order-section">
        <h2>Place Order / Billing</h2>

        <OrderForm
          products={products}
          refreshData={refreshData}
        />
      </section>

      <section id="order-history">
        <h2>Order History</h2>

        <OrderList orders={orders} />
      </section>

      <footer className="site-footer">
        <p>© {new Date().getFullYear()} Billing Management. Built for easy inventory control.</p>
      </footer>
    </div>
  );
}

export default App;