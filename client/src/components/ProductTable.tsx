import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } from "@mui/material";
import { Product } from "../types/Product";

// Define Props Interface
interface ProductTableProps {
  products: Product[];
}

const ProductTable: React.FC<ProductTableProps> = ({ products }) => {
  return (
    <TableContainer component={Paper} style={{ maxWidth: "90%", margin: "auto", marginTop: "20px" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Product Name</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Special Price</TableCell>
            <TableCell>Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.length > 0 ? (
            products.map((product) => (
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} style={{ textAlign: "center" }}>
                No products available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProductTable;
