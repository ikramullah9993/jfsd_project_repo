import React, { useState } from "react";
import {
  UserIcon,
  LockIcon,
  MailIcon,
  LogInIcon,
  AlertTriangleIcon,
} from "lucide-react";

const Admin_Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hover, setHover] = useState(false);
  const [inputFocus, setInputFocus] = useState({
    email: false,
    password: false,
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = {
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8090/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const data = await response.text();
        alert(data);
        // Simulate navigation by changing window location
        window.location.href = "/dashboard";
      } else {
        const error = await response.text();
        setErrorMessage(error);
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  // Enhanced color palette
  const colors = {
    primary: "#4a148c", // Deep purple
    secondary: "#6a1b9a", // Slightly lighter purple
    accent: "#9c27b0", // Vibrant purple
    background: "linear-gradient(135deg, #4a148c 0%, #9c27b0 100%)",
    text: {
      primary: "#ffffff",
      secondary: "#e1bee7",
    },
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: colors.background,
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const formStyle = {
    background: "rgba(255, 255, 255, 0.9)",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
    maxWidth: "450px",
    width: "100%",
    position: "relative",
    overflow: "hidden",
    transform: "perspective(1000px)",
    transition: "all 0.3s ease-in-out",
  };

  const headerStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: colors.primary,
    letterSpacing: "1px",
    position: "relative",
    fontSize: "28px",
    fontWeight: "700",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
  };

  const inputContainerStyle = {
    position: "relative",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
  };

  const inputStyle = (isFocused) => ({
    width: "100%",
    padding: "12px 15px 12px 45px",
    border: `2px solid ${isFocused ? colors.accent : "#e0e0e0"}`,
    borderRadius: "12px",
    fontSize: "16px",
    transition: "all 0.3s ease",
    outline: "none",
    boxShadow: isFocused ? "0 0 15px rgba(156, 39, 176, 0.3)" : "none",
  });

  const iconStyle = (isFocused) => ({
    position: "absolute",
    left: "15px",
    color: isFocused ? colors.accent : "#888",
    transition: "all 0.3s ease",
  });

  const buttonStyle = {
    width: "100%",
    padding: "14px",
    background: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 100%)`, // Fixed gradient syntax
    border: "none",
    color: "#fff",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transform: hover ? "translateY(-3px)" : "translateY(0)",
  };

  const errorMessageStyle = {
    color: "#d32f2f",
    textAlign: "center",
    marginTop: "10px",
    fontSize: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    animation: "shake 0.5s",
  };

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <h2 style={headerStyle}>
          <UserIcon size={32} color={colors.primary} />
          Admin Login
        </h2>
        <form onSubmit={handleLogin}>
          <div style={inputContainerStyle}>
            <MailIcon size={24} style={iconStyle(inputFocus.email)} />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() =>
                setInputFocus((prev) => ({ ...prev, email: true }))
              }
              onBlur={() =>
                setInputFocus((prev) => ({ ...prev, email: false }))
              }
              required
              style={inputStyle(inputFocus.email)}
              placeholder="Enter your email"
            />
          </div>
          <div style={inputContainerStyle}>
            <LockIcon size={24} style={iconStyle(inputFocus.password)} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() =>
                setInputFocus((prev) => ({ ...prev, password: true }))
              }
              onBlur={() =>
                setInputFocus((prev) => ({ ...prev, password: false }))
              }
              required
              style={inputStyle(inputFocus.password)}
              placeholder="Enter your password"
            />
          </div>
          {errorMessage && (
            <p style={errorMessageStyle}>
              <AlertTriangleIcon size={20} color="#d32f2f" />
              {errorMessage}
            </p>
          )}
          <button
            type="submit"
            style={buttonStyle}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
          >
            <LogInIcon size={20} />
            Login
          </button>
        </form>
      </div>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(2px); }
          30%, 50%, 70% { transform: translateX(-2px); }
          40%, 60% { transform: translateX(2px); }
        }
      `}</style>
    </div>
  );
};

export default Admin_Login;
