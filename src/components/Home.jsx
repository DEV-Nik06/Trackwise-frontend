import React from "react";
import { Link } from "react-router-dom";
// import "./Home.css"; // Ensure to create and link the CSS file for styling

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-content">
          <h2>Track Smart. Grow Wise.</h2>
          <p>Track and manage your finances, stock, and invoices all in one place.</p>
          <Link to="/dashboard" className="cta-button">Get Started</Link>
        </div>
        <img src="../../src/assets/finance.png" alt="Finance Illustration" className="hero-img" />
      </header>

      {/* Features Section */}
      <section className="features">
        <div className="feature-card animate">
          <h3>📊 Dashboard</h3>
          <p>Get an overview of your financial health with real-time updates.</p>
        </div>

        <div className="feature-card animate">
          <h3>📦 Stock Management</h3>
          <p>Keep track of purchases and sales with vendor details.</p>
        </div>

        <div className="feature-card animate">
          <h3>💰 Income & Expense</h3>
          <p>Categorize your transactions and calculate net profit/loss.</p>
        </div>

        <div className="feature-card animate">
          <h3>🧾 Invoice Generation</h3>
          <p>Generate invoices with a professional layout and branding.</p>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <img src="/money-management.png" alt="Money Management" className="about-img" />
        <div className="about-content">
          <h2>Why Choose Us?</h2>
          <p>
            Our platform provides a seamless experience for managing your income and expenses, helping you make informed financial decisions.
          </p>
          <ul>
            <li>✔️ Easy-to-use interface</li>
            <li>✔️ Real-time financial tracking</li>
            <li>✔️ Secure and reliable</li>
            <li>✔️ Free invoice generation</li>
          </ul>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} Income & Expense Manager. All Rights Reserved.</p>
        <div className="footer-links">
          <Link to="/about">About</Link> | 
          <Link to="/contact">Contact</Link> | 
          <Link to="/privacy">Privacy Policy</Link>
        </div>
      </footer>
    </div>
  );
};

export default Home;
