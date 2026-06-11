import { useEffect, useState } from "react";
import axios from "axios";

function ProductForm({
  refreshData,
  editProduct,
  setEditProduct
}) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    quantity: "",
    description: ""
  });

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    }
  }, [editProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editProduct) {
      await axios.put(
        `http://localhost:5000/products/${editProduct.id}`,
        formData
      );
    } else {
      await axios.post(
        "http://localhost:5000/products",
        formData
      );
    }

    setFormData({
      name: "",
      price: "",
      category: "",
      quantity: "",
      description: ""
    });

    setEditProduct(null);

    refreshData();
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="name"
        placeholder="Product Name"
        value={formData.name}
        onChange={handleChange}
      />

      <input
        name="price"
        placeholder="Price"
        value={formData.price}
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        value={formData.category}
        onChange={handleChange}
      />

      <input
        name="quantity"
        placeholder="Quantity"
        value={formData.quantity}
        onChange={handleChange}
      />

      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
      />

      <button>
        {editProduct
          ? "Update Product"
          : "Add Product"}
      </button>

    </form>
  );
}

export default ProductForm;