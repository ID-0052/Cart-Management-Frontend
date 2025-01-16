import React, { useState, useEffect, useContext } from "react";
import API from "../api";
import { CartContext } from "../context/CartContext";

const Home = () => {
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
    try {
      const { data } = await API.post("/cart", {
        userId: "123",
        productId,
        quantity: 1,
      });
      setCart(data.items); // Update the cart context
      console.log("Item added to cart:", data);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      {products.map((product) => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <button onClick={() => handleAddToCart(product.id)}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
