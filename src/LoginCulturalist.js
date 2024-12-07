import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginCulturalist = () => {
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

    // Assuming login is successful
    localStorage.setItem("culturalistGmail", formData.gmail); // Save Gmail
    navigate("/culturalist"); // Redirect to dashboard
  };

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
      background: "#ffffff",
      borderRadius: "8px",
      padding: "30px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      width: "400px",
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
      marginBottom: "10px",
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
        <h2 style={styles.title}>Login Culturalist</h2>
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
          <label style={styles.label}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
        <button
          type="button"
          onClick={() => navigate("/RegisterCulturalist")}
          style={styles.linkButton}
        >
          Register as Culturalist
        </button>
      </div>
    </div>
  );
};

export default LoginCulturalist;
