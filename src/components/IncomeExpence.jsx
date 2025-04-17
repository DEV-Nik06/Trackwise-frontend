import { useState, useEffect } from "react";

const IncomeExpense = () => {
  const [entries, setEntries] = useState([]);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("income"); // Default selection
  const [amount, setAmount] = useState("");

  // Fetch Data from Backend
  useEffect(() => {
    fetch("http://localhost:5000/income-expense")
      .then((res) => res.json())
      .then((data) => setEntries(data))
      .catch((err) => console.error(err));
  }, []);

  // Add New Entry
  const addEntry = async () => {
    if (!category || !type || !amount) {
      alert("All fields are required");
      return;
    }

    if (isNaN(amount) || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const newEntry = {
      category: category,
      type: type,
      amount: parseFloat(amount),
    };

    try {
      const response = await fetch("http://localhost:5000/income-expense", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      });

      if (!response.ok) {
        throw new Error("Failed to add entry");
      }

      const result = await response.json();
      console.log(result.message);

      // Refresh the entries after successful addition
      setEntries((prevEntries) => [...prevEntries, newEntry]);

      // Clear input fields after submission
      setCategory("");
      setType("income");
      setAmount("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteEntry = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/income-expense/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete entry");
      }
  
      const result = await response.json();
      console.log(result.message);
  
      // Remove the deleted entry from the state
      setEntries(entries.filter((entry) => entry.id !== id));
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <div className="income-expense-container">
  <h2>Income & Expense Manager</h2>

  <input
    type="text"
    placeholder="Category"
    value={category}
    onChange={(e) => setCategory(e.target.value)}
  />
  
  <select value={type} onChange={(e) => setType(e.target.value)}>
    <option value="income">Income</option>
    <option value="expense">Expense</option>
  </select>

  <input
    type="number"
    placeholder="Amount"
    value={amount}
    onChange={(e) => setAmount(e.target.value)}
  />
  
  <button onClick={addEntry}>Add Entry</button>

  <h3>Entries</h3>
  
  <table className="entries-table">
  <thead>
    <tr>
      <th>Category</th>
      <th>Type</th>
      <th>Amount (₹)</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {entries.map((entry) => (
      <tr key={entry.id}>
        <td>{entry.category}</td>
        <td>{entry.type}</td>
        <td>₹{entry.amount}</td>
        <td>
          <button className="delete-btn" onClick={() => deleteEntry(entry.id)}>
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

</div>
  );
};

export default IncomeExpense;
