import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0",
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.06)",
  },
  th: {
    padding: "1rem",
    textAlign: "left",
    backgroundColor: "#f4f4f4",
    fontWeight: "600",
    color: "#4a4a4a",
    borderBottom: "1px solid #eaeaea",
  },
  td: {
    padding: "1rem",
    textAlign: "left",
    borderBottom: "1px solid #eaeaea",
  },
  row: {
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#f9f9f9",
    },
  },
  productImage: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "8px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  quantityButton: {
    backgroundColor: "#FF5733",
    color: "white",
    border: "none",
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#E64A2E",
    },
    "&:disabled": {
      backgroundColor: "#cccccc",
      cursor: "not-allowed",
    },
  },
  quantity: {
    fontSize: "1rem",
    fontWeight: "600",
    minWidth: "2rem",
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#FF4C4C",
    color: "white",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.875rem",
    transition: "background-color 0.2s ease",
    "&:hover": {
      backgroundColor: "#E63939",
    },
  },
  checkoutContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
  checkoutButton: {
    backgroundColor: "#28A745",
    color: "white",
    border: "none",
    padding: "1rem 2rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    transition: "all 0.2s ease",
    "&:hover": {
      backgroundColor: "#218838",
      transform: "translateY(-1px)",
    },
    "&:active": {
      transform: "translateY(0)",
    },
  },
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const userName = localStorage.getItem("userName");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8090/api/cart/${userName}`
      );
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const updateItemCount = async (id, count) => {
    try {
      await axios.put(
        `http://localhost:8090/api/cart/updateCount/${id}/${count}`
      );
      fetchCartItems();
    } catch (error) {
      console.error("Error updating item count:", error);
    }
  };

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/api/cart/remove/${id}`);
      fetchCartItems();
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Cart</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Item Name</th>
            <th style={styles.th}>Item Price</th>
            <th style={styles.th}>Item Summary</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Quantity</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item.id} style={styles.row}>
              <td style={styles.td}>{item.itemName}</td>
              <td style={styles.td}>₹{item.itemPrice}</td>
              <td style={styles.td}>{item.itemSummary}</td>
              <td style={styles.td}>
                <img
                  src={item.imagePath}
                  alt={item.itemName}
                  style={styles.productImage}
                />
              </td>
              <td style={styles.td}>
                <div style={styles.quantityControls}>
                  <button
                    onClick={() => updateItemCount(item.id, item.count - 1)}
                    disabled={item.count <= 1}
                    style={{
                      ...styles.quantityButton,
                      backgroundColor: item.count <= 1 ? "#cccccc" : "#FF5733",
                    }}
                  >
                    -
                  </button>
                  <span style={styles.quantity}>{item.count}</span>
                  <button
                    onClick={() => updateItemCount(item.id, item.count + 1)}
                    style={styles.quantityButton}
                  >
                    +
                  </button>
                </div>
              </td>
              <td style={styles.td}>
                <button
                  onClick={() => removeItem(item.id)}
                  style={{
                    ...styles.removeButton,
                    "&:hover": {
                      backgroundColor: "#E63939",
                    },
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={styles.checkoutContainer}>
        <button
          onClick={handleCheckout}
          style={{
            ...styles.checkoutButton,
            "&:hover": {
              backgroundColor: "#218838",
              transform: "translateY(-1px)",
            },
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartPage;
