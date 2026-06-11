import axios from "axios";

function ProductList({
  products,
  refreshData,
  setEditProduct
}) {
  const deleteProduct = async (id) => {
    await axios.delete(
      `http://localhost:5000/products/${id}`
    );

    refreshData();
  };

  return (
    <table border="1">

      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Stock</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr key={product.id}>

            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.category}</td>
            <td>{product.quantity}</td>

            <td>

              <button
                onClick={() =>
                  setEditProduct(product)
                }
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteProduct(product.id)
                }
              >
                Delete
              </button>

            </td>

          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default ProductList;