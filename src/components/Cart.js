import React, { useEffect, useContext } from "react";
import API from "../api";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await API.get("/cart", { params: { userId: "123" } });
        console.log("Fetched cart items:", data); // Log the data to debug
        setCart(data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    fetchCart();
  }, [setCart]);

  useEffect(() => {
    console.log("Cart context updated:", cart); // Log the cart context to debug
  }, [cart]);

  return (
    <div>
      <h2>Cart Items</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map(
          (item) =>
            item.productId && (
              <div key={item.productId._id}>
                <h3>{item.productId.name}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ${item.productId.price}</p>
              </div>
            )
        )
      )}
    </div>
  );
};

export default Cart;
