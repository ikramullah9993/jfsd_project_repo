import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginSeller = () => {
  const [formData, setFormData] = useState({
    gmail: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:8090/api/seller/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to login");
        }
        return response.json();
      })
      .then((data) => {
        if (data.success) {
          console.log(`Welcome, ${data.sellerName}`);
          localStorage.setItem("sellerGmail", formData.gmail); // Save Gmail ID
          navigate("/seller"); // Redirect to seller dashboard
        } else {
          alert("Login failed: Invalid credentials");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("An error occurred while logging in");
      });
  };

  // Inline CSS for styling
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #ece9e6, #ffffff)",
      fontFamily: "'Poppins', sans-serif",
    },
    formContainer: {
      background: "rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(10px)",
      boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "15px",
      padding: "30px",
      width: "400px",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    label: {
      display: "block",
      textAlign: "left",
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "15px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "16px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginBottom: "10px",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
    linkButton: {
      background: "transparent",
      color: "#007bff",
      textDecoration: "underline",
      border: "none",
      cursor: "pointer",
      padding: "0",
      fontSize: "14px",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.title}>Seller Login</h2>
        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Gmail:</label>
          <input
            type="email"
            name="gmail"
            value={formData.gmail}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <br />
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <br />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <br />
        <button
          type="button"
          onClick={() => navigate("/RegisterSeller")}
          style={styles.linkButton}
        >
          Register as Seller
        </button>
      </div>
    </div>
  );
};

export default LoginSeller;
