import { Link } from "react-router-dom";

import "./App.css"
import "./Home.css"
import "./global.css"
import "./dashboard.css"
import "./Stock.css";
import "./Income&EX.css";
import "./invoice.css"

function App() {
  return (
    <div>
      <h1>TrackWise</h1>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/stock">Stock Management</Link></li>
          <li><Link to="/income-expense">Income & Expense</Link></li>
          <li><Link to="/invoices">Generate Invoices</Link></li>
          {/* <li><Link to="/invoices-list">Invoices List</Link></li> */}
        </ul>
      </nav>
    </div>
  );
}

export default App;
