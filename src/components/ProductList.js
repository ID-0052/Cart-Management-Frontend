import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import { CartContext } from "../context/CartContext";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await API.get("/products");
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!productId) {
      console.error("Product ID is null");
      return;
    }
    try {
      const { data } = await API.post("/cart", {
        userId: "123",
        productId,
        quantity: 1,
      });
      setCart(data.items); // Update the cart context
      alert("Product added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <h2>Products</h2>
      {products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => handleAddToCart(product._id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
