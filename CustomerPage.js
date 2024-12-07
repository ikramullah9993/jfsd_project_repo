import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaShoppingCart } from "react-icons/fa"; // Importing the shopping cart icon

const CustomerPage = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [sessionExpired, setSessionExpired] = useState(false); // State to track session expiration
  const userName = localStorage.getItem("userName"); // Get username from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    const sessionTimeout = setTimeout(() => {
      if (!sessionExpired) {
        setSessionExpired(true); // Set sessionExpired flag to true
        console.log("Session expired");
        alert("Your session has expired. Redirecting to login.");
        localStorage.removeItem("userName"); // Clear the username from localStorage
        navigate("/login"); // Redirect to login page
      }
    }, 2 * 60 * 1000); // Set timeout to 2 minutes (120,000 ms)

    // Clear the timeout if the user interacts with the page (e.g., clicks, moves the mouse)
    const resetTimeout = () => {
      clearTimeout(sessionTimeout);
      setSessionExpired(false); // Reset sessionExpired flag on user interaction
      setTimeout(() => {
        if (!sessionExpired) {
          setSessionExpired(true); // Set sessionExpired flag to true
          console.log("Session expired");
          alert("Your session has expired. Redirecting to login.");
          localStorage.removeItem("userName");
          navigate("/login");
        }
      }, 10 * 60 * 1000); // Reset the 2-minute timeout
    };

    window.addEventListener("click", resetTimeout);
    window.addEventListener("mousemove", resetTimeout);
    window.addEventListener("keydown", resetTimeout);

    // Cleanup event listeners when component unmounts
    return () => {
      clearTimeout(sessionTimeout);
      window.removeEventListener("click", resetTimeout);
      window.removeEventListener("mousemove", resetTimeout);
      window.removeEventListener("keydown", resetTimeout);
    };
  }, [navigate, sessionExpired]); // Re-run useEffect if navigate or sessionExpired changes

  // Function to fetch products from the backend
  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8090/api/seller/images/all"
      );
      const normalizedProducts = response.data.map((product) => ({
        ...product,
        filePath: `http://localhost:8090/api/seller/images/${product.name}`, // Adjusted filePath for serving images
      }));
      setProducts(normalizedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Add a product to the cart
  const addToCart = async (product) => {
    const userName = localStorage.getItem("userName");
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

    console.log("Payload being sent:", cartItem); // Debug log

    try {
      const response = await axios.post(
        "http://localhost:8090/api/cart/add",
        cartItem
      );
      console.log("Response from server:", response.data); // Debug log
      alert(`${product.itemName} has been added to your cart.`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // Navigate to the cart page
  const navigateToCart = () => {
    navigate("/cart", { state: { cart } });
  };

  // Handle user logout
  const handleLogout = () => {
    localStorage.removeItem("userName"); // Clear username from localStorage
    navigate("/login"); // Redirect to login page
  };

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    product.itemName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: "'Arial', sans-serif",
        backgroundColor: "#f4f4f9",
        color: "#333",
      }}
    >
      {/* Navbar Section */}
      <nav
        style={{
          backgroundColor: "#333",
          padding: "15px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div>
          <h1 style={{ fontSize: "24px", color: "white", margin: 0 }}>
            Customer Portal
          </h1>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {userName ? (
            <p
              style={{ color: "white", marginRight: "20px", fontSize: "16px" }}
            >
              Welcome, {userName}!
            </p> // Display userName
          ) : (
            <p style={{ color: "white", fontSize: "16px" }}>Welcome!</p>
          )}
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 16px",
              backgroundColor: "#444",
              borderRadius: "3px",
              color: "white",
              fontSize: "14px",
              cursor: "pointer",
              border: "none",
              marginRight: "15px",
            }}
          >
            Logout
          </button>
          {/* Shopping Cart Icon */}
          <FaShoppingCart
            onClick={navigateToCart} // Navigate to the cart page on click
            style={{
              marginLeft: "20px",
              fontSize: "24px",
              color: "white",
              cursor: "pointer",
              transition: "color 0.3s",
            }}
            title="Go to Cart"
          />
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              marginLeft: "20px",
              padding: "8px 12px",
              fontSize: "14px",
              borderRadius: "3px",
              border: "none",
              outline: "none",
              width: "200px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ padding: "20px" }}>
        <h2
          style={{ color: "#333", textAlign: "center", marginBottom: "30px" }}
        >
          Products
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
            marginBottom: "30px",
          }}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              style={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                overflow: "hidden",
                width: "250px",
                transition: "transform 0.3s",
                cursor: "pointer",
                ":hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <img
                src={product.filePath} // Dynamic image source
                alt={product.itemName}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "cover",
                  borderTopLeftRadius: "8px",
                  borderTopRightRadius: "8px",
                }}
              />
              <div style={{ padding: "15px" }}>
                <h3
                  style={{
                    fontSize: "18px",
                    color: "#333",
                    marginBottom: "10px",
                  }}
                >
                  {product.itemName}
                </h3>
                <p
                  style={{
                    fontSize: "16px",
                    color: "#777",
                    marginBottom: "10px",
                  }}
                >
                  {product.itemSummary}
                </p>
                <p
                  style={{
                    fontSize: "18px",
                    color: "#333",
                    marginBottom: "15px",
                  }}
                >
                  ₹{product.itemPrice}
                </p>
                <button
                  onClick={() => addToCart(product)}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#FF5733",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
