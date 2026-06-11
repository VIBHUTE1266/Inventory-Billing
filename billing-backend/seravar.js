const express = require("express");
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Billing backend is running" });
});

app.use("/products", productRoutes);
app.use("/orders", orderRoutes);
app.use("/dashboard", dashboardRoutes);

app.listen(5000, () => {
  console.log("Server Running on http://localhost:5000");
});