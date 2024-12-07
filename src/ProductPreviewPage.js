import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const ProductPreviewPage = () => {
  const { state } = useLocation();
  const product = state?.product; // Get the product passed via state
  const [userName, setUserName] = useState(localStorage.getItem("userName"));
  const navigate = useNavigate();

  if (!product) {
    return <div>No product found</div>;
  }

  // Add the product to the cart
  const addToCart = async () => {
    if (!userName) {
      alert("You need to be logged in to add items to the cart.");
      return;
    }

    const cartItem = {
      userName,
      itemName: product.itemName,
      itemPrice: product.itemPrice,
      itemSummary: product.itemSummary,
      imagePath: product.filePath,
    };

    try {
      const response = await axios.post(
        "http://localhost:8090/api/cart/add",
        cartItem
      );
      alert(`${product.itemName} has been added to your cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "'Arial', sans-serif" }}>
      <div
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          borderRadius: "8px",
          padding: "20px",
          maxWidth: "600px",
          margin: "0 auto",
        }}
      >
        <img
          src={product.filePath}
          alt={product.itemName}
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "8px",
          }}
        />
        <h2 style={{ textAlign: "center", margin: "20px 0" }}>
          {product.itemName}
        </h2>
        <p>{product.itemSummary}</p>
        <p style={{ fontSize: "20px", color: "#333" }}>₹{product.itemPrice}</p>
        <button
          onClick={addToCart}
          style={{
            padding: "10px 20px",
            backgroundColor: "#FF5733",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            width: "100%",
            fontSize: "16px",
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductPreviewPage;
