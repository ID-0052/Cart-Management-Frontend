import React from "react";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
        <footer>
          <p>© 2025 Your Store. All rights reserved.</p>
        </footer>
      </Router>
    </CartProvider>
  );
};

export default App;
