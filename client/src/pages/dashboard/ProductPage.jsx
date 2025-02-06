import React, { useEffect, useState } from "react";
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Paper, Avatar, Typography, CircularProgress 
} from "@mui/material";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch product data from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://your-api-url.com/products"); // Replace with your API URL
        const data = await response.json();
        setProducts(data); 
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "90%", margin: "auto" }}>
      <Typography variant="h4" align="center" gutterBottom>
        Product Listing
      </Typography>

      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table>
            <TableHead sx={{ bgcolor: "#1976D2" }}>
              <TableRow>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Image</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Product Name</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Model</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Special Price</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product.product_id}>
                  <TableCell>
                    <Avatar src={product.image} alt={product.name} />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.model}</TableCell>
                  <TableCell>${product.price}</TableCell>
                  <TableCell>${product.special}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default ProductPage;
