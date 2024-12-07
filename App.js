import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./Register";
import Login from "./Login";
import Admin_Login from "./Admin_Login";
import Seller from "./Seller";
import culturalist from "./culturalist";
import CustomerPage from "./CustomerPage";
import LoginSeller from "./LoginSeller";
import RegisterSeller from "./RegisterSeller";
import CartPage from "./CartPage";
import CheckoutPage from "./CheckoutPage";
import SuccessPage from "./SuccessPage"
import AdminDashboard from "./AdminDashboard";
import HomePage from "./Home";
import About from "./About";
import Services from "./Services";
import LoginCulturalist from "./LoginCulturalist";

import EmailForm from "./EmailForm";
import ProductPreviewPage from "./ProductPreviewPage";
import CulturalHandicraftDashboard from "./CulturalHandicraftDashboard";

function App() {
  const [loggedInSellerId, setLoggedInSellerId] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/aboutus" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/LoginCulturalist" element={<LoginCulturalist />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<Admin_Login />} />
      <Route path="/customer" element={<CustomerPage />} />
      <Route
        path="/seller"
        element={<Seller loggedInSellerId={loggedInSellerId} />}
      />
      <Route
        path="/LoginSeller"
        element={<LoginSeller setLoggedInSellerId={setLoggedInSellerId} />}
      />
      <Route path="/RegisterSeller" element={<RegisterSeller />} />
      <Route path="/culturalist" element={<CulturalHandicraftDashboard />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/email" element={<EmailForm />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/preview" element={<ProductPreviewPage />} />
      <Route path="/dashboard" element={<AdminDashboard />} />
      {/* Add other routes here */}
    </Routes>
  );
}

export default App;
