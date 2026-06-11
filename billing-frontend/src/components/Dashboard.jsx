function Dashboard({ dashboard }) {
  return (
    <div className="dashboard">

      <div className="card">
        <h3>Total Products</h3>
        <p>{dashboard.totalProducts}</p>
      </div>

      <div className="card">
        <h3>Total Orders</h3>
        <p>{dashboard.totalOrders}</p>
      </div>

      <div className="card">
        <h3>Total Sales</h3>
        <p>₹{dashboard.totalSales}</p>
      </div>

      <div className="card">
        <h3>Low Stock</h3>
        <p>{dashboard.lowStockProducts}</p>
      </div>

    </div>
  );
}

export default Dashboard;