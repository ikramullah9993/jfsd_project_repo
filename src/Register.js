import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gmail: "",
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

    fetch("http://localhost:8090/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text();
      })
      .then((data) => {
        console.log("Success:", data);
        navigate("/login"); // Navigate to login page after successful registration
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // Inline CSS for advanced styling
  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      background: "linear-gradient(to right, #ece9e6, #ffffff)",
      fontFamily: "'Poppins', sans-serif",
    },
    glassEffect: {
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
    },
    loginLink: {
      marginTop: "10px",
      color: "#007bff",
      fontSize: "16px",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.glassEffect}>
        <h2 style={styles.title}>Register</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username" style={styles.label}>
            User Name:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <br />

          <label htmlFor="gmail" style={styles.label}>
            Gmail:
          </label>
          <input
            type="email"
            id="gmail"
            name="gmail"
            value={formData.gmail}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <br />

          <label htmlFor="password" style={styles.label}>
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
          <br />

          <button type="submit" style={styles.button}>
            Register
          </button>
        </form>

        {/* Link to Login page */}
        <div style={{ marginTop: "10px" }}>
          <a href="/login" style={styles.loginLink}>
            Already have an account? Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
