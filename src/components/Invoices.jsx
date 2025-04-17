import React, { useState, useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const InvoiceComponent = () => {
  const [customerName, setCustomerName] = useState('');
  const [items, setItems] = useState([{ name: '', price: '', quantity: 1 }]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [invoiceId, setInvoiceId] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const response = await fetch('https://trackwise-backend-k5rj.onrender.com/api/invoice');
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        if (data) {
          setCustomerName(data.customer_name || '');
          setItems(Array.isArray(data.items) ? data.items : [{ name: '', price: '', quantity: 1 }]);
          setTotalAmount(data.total_amount || 0);
          setInvoiceId(data.id || null);
        }
      } catch (error) {
        console.error('Error fetching invoice data:', error);
      }
    };
    fetchInvoice();
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, { name: '', price: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (updatedItems) => {
    const total = updatedItems.reduce((acc, curr) => {
      const price = parseFloat(curr.price) || 0;
      const quantity = parseInt(curr.quantity) || 1;
      return acc + price * quantity;
    }, 0);
    setTotalAmount(total);
  };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const invoiceData = {
      customer_name: customerName,
      items: items,
      total_amount: totalAmount,
    };
    try {
      const response = await fetch('https://trackwise-backend-k5rj.onrender.com/api/invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(invoiceData),
      });
      if (!response.ok) throw new Error('Failed to save invoice');
      const result = await response.json();
      setInvoiceId(result.id);
      alert('Invoice saved successfully');
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };
  const handlePrint = () => {
    const printContent = document.querySelector('.invoice-preview').innerHTML;
    const printWindow = window.open('', '', 'width=800,height=600');
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            table { width: 100%; border-collapse: collapse; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };
  


  return (
    <div className="invoice-container">
      <form onSubmit={handleSubmit} className="invoice-form">
        <h2>Generate Invoice</h2>
        <label>Customer Name:</label>
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />

        <h3>Items</h3>
        {items.map((item, index) => (
          <div key={index} className="invoice-item">
            <input type="text" placeholder="Item Name" value={item.name} onChange={(e) => handleItemChange(index, 'name', e.target.value)} required />
            <input type="number" placeholder="Price" value={item.price} onChange={(e) => handleItemChange(index, 'price', e.target.value)} required />
            <input type="number" placeholder="Quantity" value={item.quantity} onChange={(e) => handleItemChange(index, 'quantity', e.target.value)} required />
            {items.length > 1 && <button type="button" onClick={() => handleRemoveItem(index)}>Remove</button>}
          </div>
        ))}
        <button type="buttonA" onClick={handleAddItem}>Add Item</button>

        <div className="total"><strong>Total Amount: ₹{totalAmount}</strong></div>
        <button type="submit">Submit Invoice</button>
      </form>

      <div className="invoice-preview" ref={componentRef}>
        <h1>Invoice</h1>
        <p>Customer: {customerName}</p>
        <p>Date: {new Date().toLocaleDateString()}</p>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((entry, index) => (
              <tr key={index}>
                <td>{entry.name}</td>
                <td>{entry.price}</td>
                <td>{entry.quantity}</td>
                <td>{(parseFloat(entry.price) || 0) * (parseInt(entry.quantity) || 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h3>Total: ₹{totalAmount}</h3>
      </div>

      <button onClick={handlePrint} className="print-button">Print Invoice</button>
    </div>
  );
};

export default InvoiceComponent;
