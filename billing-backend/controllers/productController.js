const products = require("../data/products");

exports.getProducts = (req, res) => {
  res.json(products);
};

exports.getProduct = (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
};

exports.addProduct = (req, res) => {
  const { name, price, category, quantity, description } = req.body;

  if (
    !name ||
    price === undefined ||
    !category ||
    quantity === undefined ||
    !description ||
    Number(quantity) < 0
  ) {
    return res.status(400).json({
      message: "Invalid product data"
    });
  }

  const product = {
    id: Date.now(),
    name,
    price: Number(price),
    category,
    quantity: Number(quantity),
    description
  };

  products.push(product);
  res.status(201).json(product);
};

exports.updateProduct = (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const { name, price, category, quantity, description } = req.body;

  if (
    !name ||
    price === undefined ||
    !category ||
    quantity === undefined ||
    !description ||
    Number(quantity) < 0
  ) {
    return res.status(400).json({
      message: "Invalid product data"
    });
  }

  product.name = name;
  product.price = Number(price);
  product.category = category;
  product.quantity = Number(quantity);
  product.description = description;

  res.json(product);
};

exports.deleteProduct = (req, res) => {
  const productId = Number(req.params.id);
  const index = products.findIndex((item) => item.id === productId);

  if (index === -1) {
    return res.status(404).json({ message: "Product not found" });
  }

  products.splice(index, 1);
  res.status(204).end();
};

exports.searchProducts = (req, res) => {
  const name = (req.query.name || "").toLowerCase();
  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(name)
  );

  res.json(filtered);
};

exports.getProductsByCategory = (req, res) => {
  const category = (req.params.category || "").toLowerCase();
  const filtered = products.filter(
    (product) => product.category.toLowerCase() === category
  );

  res.json(filtered);
};

exports.getLowStock = (req, res) => {
  const filtered = products.filter((product) => product.quantity <= 5);
  res.json(filtered);
};

exports.updateProductStock = (req, res) => {
  const productId = Number(req.params.id);
  const product = products.find((item) => item.id === productId);
  const { quantity } = req.body;

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  if (quantity === undefined || Number(quantity) < 0) {
    return res.status(400).json({ message: "Invalid stock value" });
  }

  product.quantity = Number(quantity);
  res.json(product);
};