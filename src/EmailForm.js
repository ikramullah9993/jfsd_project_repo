import React, { useState } from "react";
import axios from "axios";

function EmailForm() {
  const [email, setEmail] = useState("");
  const [total, setTotal] = useState("");
  const [message, setMessage] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleTotalChange = (e) => {
    setTotal(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !total) {
      setMessage("Please provide both email and total.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8090/api/email/send",
        null,
        {
          params: { email, total: parseFloat(total) },
        }
      );
      setMessage(response.data);
    } catch (error) {
      setMessage("Failed to send email.");
    }
  };

  return (
    <div className="email-form">
      <h2>Order Confirmation</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="total">Total Amount:</label>
          <input
            type="number"
            id="total"
            value={total}
            onChange={handleTotalChange}
            required
          />
        </div>
        <button type="submit">Send Email</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default EmailForm;
