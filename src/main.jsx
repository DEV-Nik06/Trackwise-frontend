import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import Dashboard from "./components/Dashboard";
import Stock from "./components/StockManagement";
import IncomeExpense from "./components/IncomeExpence";
import Invoices from "./components/Invoices";
// import InvoicesList from "./components/InvoiceList";
import Home from "./components/Home"; 
import "./index.css";
// import "./App.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
    <App />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/stock" element={<Stock />} />
        <Route path="/income-expense" element={<IncomeExpense />} />
        <Route path="/invoices" element={<Invoices />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
