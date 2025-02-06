import React, { useState, useEffect } from "react";
import ProductTable from "./components/ProductTable";
import { Product } from "./types/Product";

const App: React.FC = () => {
  // State to store products
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost/opencart/api/products"); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.shop_products); // Adjust if API response structure is different
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Product Listing</h1>

      {loading && <p style={{ textAlign: "center" }}>Loading products...</p>}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {!loading && !error && <ProductTable products={products} />}
    </div>
  );
};

export default App;
