import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const stripePromise = loadStripe(
  "your publishable key"
);

const styles = {
  container: {
    fontFamily:
      'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundColor: "#f9f9f9",
    padding: "2rem",
    maxWidth: "1200px",
    margin: "2rem auto",
    borderRadius: "12px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  },
  title: {
    textAlign: "center",
    color: "#1a1a1a",
    fontSize: "2rem",
    fontWeight: "600",
    marginBottom: "2rem",
  },
  emptyCart: {
    textAlign: "center",
    color: "#666",
    fontSize: "1.2rem",
    padding: "3rem",
    backgroundColor: "#fff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  },
  itemsContainer: {
    display: "grid",
    gap: "1.5rem",
    marginBottom: "2rem",
  },
  itemCard: {
    display: "flex",
    alignItems: "center",
    padding: "1.5rem",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    transition: "transform 0.2s ease",
    gap: "2rem",
  },
  imageContainer: {
    flexShrink: 0,
  },
  productImage: {
    width: "120px",
    height: "120px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#1a1a1a",
    marginBottom: "0.5rem",
  },
  itemPrice: {
    fontSize: "1.1rem",
    color: "#2a2a2a",
    fontWeight: "500",
    marginBottom: "0.5rem",
  },
  quantity: {
    fontSize: "1rem",
    color: "#666",
    marginBottom: "1rem",
  },
  totalSection: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
    marginBottom: "2rem",
  },
  totalText: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#1a1a1a",
    textAlign: "right",
  },
  checkoutButton: {
    display: "block",
    width: "100%",
    maxWidth: "400px",
    margin: "1rem auto 0",
    backgroundColor: "#FF5733",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    textAlign: "center",
  },
  saveButton: {
    display: "block",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto 1rem",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    textAlign: "center",
  },
  addressSection: {
    marginBottom: "2rem",
  },
  addressInput: {
    width: "100%",
    padding: "1rem",
    borderRadius: "8px",
    border: "1px solid #ccc",
    marginTop: "0.5rem",
  },
};

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const navigate = useNavigate();
  const memoizedCartItems = useMemo(() => cartItems, [cartItems]);

  useEffect(() => {
    const fetchItems = async () => {
      const username = localStorage.getItem("userName");
      try {
        const response = await axios.get(
          `http://localhost:8090/api/cart/${username}`
        );
        if (response.status === 200) {
          setCartItems(response.data);
        } else {
          console.error("Failed to fetch cart items:", response.status);
        }
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchItems();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = memoizedCartItems.reduce(
        (acc, item) => acc + item.itemPrice * item.count,
        0
      );
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [memoizedCartItems]);

  const handleCheckout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8090/api/stripe/create-session",
        cartItems
      );
      const sessionId = response.data;
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (!error) {
        navigate("/success");
      } else {
        console.error("Stripe Checkout Error:", error);
      }
    } catch (error) {
      console.error("Error during checkout process:", error);
    }
  };

 const handleSave = async () => {
   setTimeout(async () => {
     try {
       const userEmail = localStorage.getItem("userEmail");
       const username = localStorage.getItem("userName");

       // Map cart items for email content
       const itemDetails = memoizedCartItems.map((item) => ({
         itemName: item.itemName,
         quantity: item.count,
         individualPrice: item.itemPrice,
       }));

       const emailResponse = await axios.post(
         "http://localhost:8090/api/email/send",
         {
           email: userEmail,
           username,
           total,
           address,
           items: itemDetails, // Send item details with name, quantity, and individual price
         }
       );
       console.log("Email sent successfully:", emailResponse);
     } catch (emailError) {
       console.error("Error sending email:", emailError.response || emailError);
     }
   }, 10000); // 10 seconds delay
 };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Checkout</h2>
      {memoizedCartItems.length === 0 ? (
        <div style={styles.emptyCart}>
          <p>Your cart is empty</p>
        </div>
      ) : (
        <>
          <div style={styles.itemsContainer}>
            {memoizedCartItems.map((item) => (
              <div key={item.id} style={styles.itemCard}>
                <div style={styles.imageContainer}>
                  <img
                    src={item.imagePath}
                    alt={item.itemName}
                    style={styles.productImage}
                  />
                </div>
                <div style={styles.itemDetails}>
                  <p style={styles.itemName}>{item.itemName}</p>
                  <p style={styles.itemPrice}>
                    ₹{item.itemPrice.toLocaleString()}
                  </p>
                  <p style={styles.quantity}>Quantity: {item.count}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={styles.totalSection}>
            <h3 style={styles.totalText}>Total: ₹{total.toLocaleString()}</h3>
          </div>
          <div style={styles.addressSection}>
            <label>
              Address:
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your delivery address"
                rows="3"
                style={styles.addressInput}
              ></textarea>
            </label>
          </div>
          <button onClick={handleSave} style={styles.saveButton}>
            Save Address
          </button>
          <button onClick={handleCheckout} style={styles.checkoutButton}>
            Proceed to Payment
          </button>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
