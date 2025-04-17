import { useEffect, useState } from "react";
// import './Dashboard.css';  // Add custom CSS for styling

function Dashboard() {
  const [data, setData] = useState({
    stockCount: 0,
    totalIncome: 0,
    totalExpense: 0,
    netProfit: 0,
  });

  useEffect(() => {
    // Fetch stock count, income, and expenses from API
    Promise.all([
      fetch("https://trackwise-backend-k5rj.onrender.com/stock").then((res) => res.json()),
      fetch("https://trackwise-backend-k5rj.onrender.com/income-expense").then((res) => res.json()),
    ])
      .then(([stockData, incomeExpenseData]) => {
        // console.log("Stock Data:", stockData); 
        // console.log("Income & Expense Data:", incomeExpenseData);

        const stockCount = stockData.length;
        const totalIncome = incomeExpenseData
          .filter((entry) => entry.type === "income")
          .reduce((sum, item) => sum + parseFloat(item.amount), 0);
        const totalExpense = incomeExpenseData
          .filter((entry) => entry.type === "expense")
          .reduce((sum, item) => sum + parseFloat(item.amount), 0);
          console.log("Total Expense:", totalExpense); 
        const netProfit = totalIncome - totalExpense;

        setData({ stockCount, totalIncome, totalExpense, netProfit });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Business Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">
          <h2 className="card-title">Stock</h2>
          <p className="card-content">{data.stockCount} Items</p>
        </div>
        <div className="card">
          <h2 className="card-title">Total Income</h2>
          <p className="card-content">₹ {data.totalIncome.toFixed(2)}</p>
        </div>
        <div className="card">
          <h2 className="card-title">Total Expense</h2>
          <p className="card-content">₹ {data.totalExpense.toFixed(2)}</p>
        </div>
        <div className="card">
          <h2 className="card-title">Net Profit/Loss</h2>
          <p
            className="card-content"
            style={{
              color: data.netProfit >= 0 ? "green" : "red",
            }}
          >
          
            ₹ {data.netProfit.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
