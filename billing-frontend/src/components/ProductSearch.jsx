import { useState } from "react";
import API from "../services/api";

function ProductSearch({ setProducts }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const handleSearch = async () => {
    try {
      const res = await API.get(
        `/products/search?name=${search}`
      );

      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryFilter = async () => {
    if (!category) return;

    try {
      const res = await API.get(
        `/products/category/${category}`
      );

      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLowStock = async () => {
    try {
      const res = await API.get(
        "/products/low-stock"
      );

      setProducts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReset = async () => {
    try {
      const res = await API.get("/products");

      setProducts(res.data);
      setSearch("");
      setCategory("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="search-section">
      <h3>Search & Filter Products</h3>

      <input
        type="text"
        placeholder="Search Product Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={handleSearch}>
        Search
      </button>

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        <option value="Electronics">
          Electronics
        </option>
        <option value="Mobile">
          Mobile
        </option>
        <option value="Accessories">
          Accessories
        </option>
        <option value="Fashion">
          Fashion
        </option>
      </select>

      <button onClick={handleCategoryFilter}>
        Filter Category
      </button>

      <button onClick={handleLowStock}>
        Low Stock
      </button>

      <button onClick={handleReset}>
        Reset
      </button>
    </div>
  );
}

export default ProductSearch;