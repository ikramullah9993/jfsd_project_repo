import React, { useState, useEffect } from "react";

const AdminDashboard = () => {
  const [sellers, setSellers] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [newSeller, setNewSeller] = useState({
    name: "",
    gmail: "",
    password: "",
  });
  const [newCustomer, setNewCustomer] = useState({
    username: "",
    gmail: "",
    password: "",
  });
  const [activeSection, setActiveSection] = useState("addSeller");

  // Advanced CSS Styles (same as previous version)
  const styles = {
    navbar: {
      display: "flex",
      backgroundColor: "#2c3e50",
      padding: "15px 0",
      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
    },
    navItem: {
      base: {
        color: "#ecf0f1",
        padding: "10px 20px",
        margin: "0 5px",
        borderRadius: "4px",
        transition: "all 0.3s ease",
        cursor: "pointer",
        fontWeight: 500,
        textTransform: "uppercase",
        letterSpacing: "1px",
      },
      active: {
        backgroundColor: "#3498db",
        color: "white",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      },
      hover: {
        backgroundColor: "rgba(52, 152, 219, 0.2)",
        transform: "scale(1.05)",
      },
    },
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: "1400px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f4f6f7",
      minHeight: "100vh",
    },
    header: {
      textAlign: "center",
      color: "#2c3e50",
      fontSize: "2.5rem",
      marginBottom: "30px",
      borderBottom: "3px solid #3498db",
      paddingBottom: "15px",
    },
    section: {
      backgroundColor: "white",
      borderRadius: "10px",
      padding: "30px",
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      marginTop: "20px",
      transition: "all 0.3s ease",
    },
    input: {
      padding: "12px 15px",
      margin: "10px 0",
      border: "1px solid #ddd",
      borderRadius: "6px",
      width: "100%",
      fontSize: "1rem",
      transition: "all 0.3s ease",
      focus: {
        borderColor: "#3498db",
        boxShadow: "0 0 5px rgba(52, 152, 219, 0.5)",
      },
    },
    button: {
      base: {
        padding: "12px 25px",
        border: "none",
        borderRadius: "6px",
        backgroundColor: "#3498db",
        color: "white",
        cursor: "pointer",
        transition: "all 0.3s ease",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "1px",
      },
      hover: {
        backgroundColor: "#2980b9",
        transform: "translateY(-2px)",
        boxShadow: "0 4px 6px rgba(0,0,0,0.2)",
      },
      delete: {
        backgroundColor: "#e74c3c",
        hover: {
          backgroundColor: "#c0392b",
        },
      },
    },
    table: {
      width: "100%",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      thead: {
        backgroundColor: "#3498db",
        color: "white",
      },
      tr: {
        transition: "background-color 0.3s ease",
        hover: {
          backgroundColor: "rgba(52, 152, 219, 0.1)",
        },
      },
      td: {
        padding: "15px",
        borderBottom: "1px solid #ecf0f1",
      },
    },
  };

  // Fetch sellers and customers
  useEffect(() => {
    fetchSellers();
    fetchCustomers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/seller/all");
      const data = await response.json();
      setSellers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching sellers:", error);
      setSellers([]);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await fetch("http://localhost:8090/api/customer/all");
      const data = await response.json();
      setCustomers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]);
    }
  };

  const addSeller = async () => {
    try {
      await fetch("http://localhost:8090/api/seller/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSeller),
      });
      fetchSellers(); // Refresh sellers
      setNewSeller({ name: "", gmail: "", password: "" });
    } catch (error) {
      console.error("Error adding seller:", error);
    }
  };

  const addCustomer = async () => {
    try {
      await fetch("http://localhost:8090/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCustomer),
      });
      fetchCustomers(); // Refresh customers
      setNewCustomer({ username: "", gmail: "", password: "" });
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const deleteSeller = async (id) => {
    try {
      await fetch(`http://localhost:8090/api/seller/delete/${id}`, {
        method: "DELETE",
      });
      fetchSellers(); // Refresh sellers
    } catch (error) {
      console.error("Error deleting seller:", error);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      await fetch(`http://localhost:8090/api/customer/delete/${id}`, {
        method: "DELETE",
      });
      fetchCustomers(); // Refresh customers
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  // Added handleLogout function
  const handleLogout = () => {
    // Perform logout (clear session, token, etc. if needed)
    window.location.href = "/"; // Redirect to Admin Login page
  };

  // Added renderContent function
  const renderContent = () => {
    switch (activeSection) {
      case "addSeller":
        return (
          <div style={styles.section}>
            <h2>Add Seller</h2>
            <input
              style={{
                ...styles.input,
                ":focus": styles.input.focus,
              }}
              type="text"
              placeholder="Name"
              value={newSeller.name}
              onChange={(e) =>
                setNewSeller({ ...newSeller, name: e.target.value })
              }
            />
            <input
              style={{
                ...styles.input,
                ":focus": styles.input.focus,
              }}
              type="email"
              placeholder="Gmail"
              value={newSeller.gmail}
              onChange={(e) =>
                setNewSeller({ ...newSeller, gmail: e.target.value })
              }
            />
            <input
              style={{
                ...styles.input,
                ":focus": styles.input.focus,
              }}
              type="password"
              placeholder="Password"
              value={newSeller.password}
              onChange={(e) =>
                setNewSeller({ ...newSeller, password: e.target.value })
              }
            />
            <button
              style={{
                ...styles.button.base,
                ":hover": styles.button.hover,
              }}
              onClick={addSeller}
            >
              Add Seller
            </button>
          </div>
        );

      case "manageSeller":
        return (
          <div style={styles.section}>
            <h2>Manage Sellers</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.table.thead}>
                  <th style={styles.table.td}>ID</th>
                  <th style={styles.table.td}>Name</th>
                  <th style={styles.table.td}>Gmail</th>
                  <th style={styles.table.td}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sellers.map((seller) => (
                  <tr key={seller.id} style={styles.table.tr}>
                    <td style={styles.table.td}>{seller.id}</td>
                    <td style={styles.table.td}>{seller.name}</td>
                    <td style={styles.table.td}>{seller.gmail}</td>
                    <td style={styles.table.td}>
                      <button
                        style={{
                          ...styles.button.base,
                          ...styles.button.delete,
                          ":hover": styles.button.delete.hover,
                        }}
                        onClick={() => deleteSeller(seller.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      case "addCustomer":
        return (
          <div style={styles.section}>
            <h2>Add Customer</h2>
            <input
              style={{
                ...styles.input,
                ":focus": styles.input.focus,
              }}
              type="text"
              placeholder="Username"
              value={newCustomer.username}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, username: e.target.value })
              }
            />
            <input
              style={{
                ...styles.input,
                ":focus": styles.input.focus,
              }}
              type="email"
              placeholder="Gmail"
              value={newCustomer.gmail}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, gmail: e.target.value })
              }
            />
            <input
              style={{
                ...styles.input,
                ":focus": styles.input.focus,
              }}
              type="password"
              placeholder="Password"
              value={newCustomer.password}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, password: e.target.value })
              }
            />
            <button
              style={{
                ...styles.button.base,
                ":hover": styles.button.hover,
              }}
              onClick={addCustomer}
            >
              Add Customer
            </button>
          </div>
        );

      case "manageCustomer":
        return (
          <div style={styles.section}>
            <h2>Manage Customers</h2>
            <table style={styles.table}>
              <thead>
                <tr style={styles.table.thead}>
                  <th style={styles.table.td}>ID</th>
                  <th style={styles.table.td}>Username</th>
                  <th style={styles.table.td}>Gmail</th>
                  <th style={styles.table.td}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} style={styles.table.tr}>
                    <td style={styles.table.td}>{customer.id}</td>
                    <td style={styles.table.td}>{customer.username}</td>
                    <td style={styles.table.td}>{customer.gmail}</td>
                    <td style={styles.table.td}>
                      <button
                        style={{
                          ...styles.button.base,
                          ...styles.button.delete,
                          ":hover": styles.button.delete.hover,
                        }}
                        onClick={() => deleteCustomer(customer.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      <nav style={styles.navbar}>
        <div
          style={{
            ...styles.navItem.base,
            ...(activeSection === "addSeller" ? styles.navItem.active : {}),
            ":hover": styles.navItem.hover,
          }}
          onClick={() => setActiveSection("addSeller")}
        >
          Add Seller
        </div>
        <div
          style={{
            ...styles.navItem.base,
            ...(activeSection === "manageSeller" ? styles.navItem.active : {}),
            ":hover": styles.navItem.hover,
          }}
          onClick={() => setActiveSection("manageSeller")}
        >
          Manage Seller
        </div>
        <div
          style={{
            ...styles.navItem.base,
            ...(activeSection === "addCustomer" ? styles.navItem.active : {}),
            ":hover": styles.navItem.hover,
          }}
          onClick={() => setActiveSection("addCustomer")}
        >
          Add Customer
        </div>
        <div
          style={{
            ...styles.navItem.base,
            ...(activeSection === "manageCustomer"
              ? styles.navItem.active
              : {}),
            ":hover": styles.navItem.hover,
          }}
          onClick={() => setActiveSection("manageCustomer")}
        >
          Manage Customer
        </div>
        <div
          style={{
            ...styles.navItem.base,
            ":hover": styles.navItem.hover,
          }}
          onClick={handleLogout}
        >
          Logout
        </div>
      </nav>

      <div style={styles.container}>
        <h1 style={styles.header}>Admin Dashboard</h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard;
