import React from "react";
import { useNavigate } from "react-router-dom"; // Ensure correct import

const SuccessPage = () => {
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSuccessRedirect = () => {
    // Redirect to the home page or any page after successful payment
    navigate("/home");
  };

  return (
    <div>
      <h2>Payment Successful!</h2>
      <button onClick={handleSuccessRedirect} style={successButtonStyle}>
        Go to Home
      </button>
    </div>
  );
};

// Style for the success button
const successButtonStyle = {
  marginTop: "20px",
  padding: "10px 20px",
  backgroundColor: "#4CAF50",
  color: "white",
  border: "none",
  cursor: "pointer",
};

export default SuccessPage;
