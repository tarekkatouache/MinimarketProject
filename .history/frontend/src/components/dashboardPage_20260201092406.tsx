// page.tsx
"use client";

import React, { useState } from "react";
import "./page.css";
export default function Dashboard() {
  const [transactions, setTransactions] = useState([
    { id: 1, name: "Carne Asada", amount: 3.1, weight: "1.56 lb @ $1.99/lb" },
    { id: 2, name: "Carne Asada", amount: 3.1, weight: "1.56 lb @ $1.99/lb" },
    { id: 3, name: "Carne Asada", amount: 3.1, weight: "1.56 lb @ $1.99/lb" },
  ]);

  const [quantityInput, setQuantityInput] = useState("");
  const [activeSection, setActiveSection] = useState<
    "signOff" | "manager" | "misc" | null
  >(null);

  const totalAmount = transactions.reduce((sum, item) => sum + item.amount, 0);

  const handleQuantityButton = (value: string) => {
    if (value === "clear") {
      setQuantityInput("");
    } else if (value === "back") {
      setQuantityInput((prev) => prev.slice(0, -1));
    } else {
      setQuantityInput((prev) => prev + value);
    }
  };

  const handleManagerAction = (action: string) => {
    alert(`Manager function: ${action} selected`);
  };

  const handleMiscAction = (action: string) => {
    alert(`${action} action triggered`);
  };

  const handleSignOffAction = (action: string) => {
    alert(`${action} selected`);
  };

  const cancelTransaction = () => {
    if (window.confirm("Are you sure you want to cancel this transaction?")) {
      setTransactions([]);
      setQuantityInput("");
    }
  };

  return (
    <div className="pos-container">
      {/* Header */}
      <header className="pos-header">
        <h1 className="company-name">CurtMart</h1>
        <p className="company-tagline">Fine Puddings Since 93'</p>
      </header>

      <div className="pos-layout">
        {/* Left Panel - Transaction Details */}
        <div className="transaction-panel">
          <div className="transaction-table-container">
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Amount</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td className="amount-cell">${item.amount.toFixed(2)}</td>
                    <td className="description-cell">{item.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="total-section">
            <div className="total-label">Total</div>
            <div className="total-amount">${totalAmount.toFixed(2)}</div>
          </div>
        </div>

        {/* Right Panel - Controls */}
        <div className="controls-panel">
          {/* Sign Off Section */}
          <div
            className={`control-section ${activeSection === "signOff" ? "active" : ""}`}
          >
            <h3
              onClick={() =>
                setActiveSection(activeSection === "signOff" ? null : "signOff")
              }
            >
              Sign Off
            </h3>
            <div className="button-grid">
              <button
                className="control-btn"
                onClick={() => handleSignOffAction("Switch User")}
              >
                Switch User
              </button>
              <button
                className="control-btn"
                onClick={() => handleSignOffAction("Customers")}
              >
                Customers
              </button>
              <button
                className="control-btn"
                onClick={() => handleSignOffAction("Total")}
              >
                Total
              </button>
            </div>
          </div>

          {/* Manager Functions Section */}
          <div
            className={`control-section ${activeSection === "manager" ? "active" : ""}`}
          >
            <h3
              onClick={() =>
                setActiveSection(activeSection === "manager" ? null : "manager")
              }
            >
              Manager Functions
            </h3>
            <div className="button-grid">
              <button
                className="control-btn manager-btn"
                onClick={() => handleManagerAction("Void")}
              >
                Void
              </button>
              <button
                className="control-btn manager-btn"
                onClick={() => handleManagerAction("Product Lookup")}
              >
                Product Lookup
              </button>
              <button
                className="control-btn manager-btn"
                onClick={() => handleManagerAction("Discounts")}
              >
                Discounts
              </button>
            </div>
          </div>

          {/* Misc Section */}
          <div
            className={`control-section ${activeSection === "misc" ? "active" : ""}`}
          >
            <h3
              onClick={() =>
                setActiveSection(activeSection === "misc" ? null : "misc")
              }
            >
              Misc.
            </h3>
            <div className="button-grid">
              <button
                className="control-btn misc-btn"
                onClick={() => handleMiscAction("Suspend/Resume")}
              >
                Suspend/Resume
              </button>
              <button
                className="control-btn misc-btn"
                onClick={() => handleMiscAction("Non Scan")}
              >
                Non Scan
              </button>
            </div>
          </div>

          {/* Quantity Input */}
          <div className="quantity-section">
            <h3>Quantity</h3>
            <div className="quantity-display">
              <input
                type="text"
                value={quantityInput}
                readOnly
                placeholder="0"
                className="quantity-input"
              />
            </div>
            <div className="quantity-buttons">
              <button
                className="qty-btn"
                onClick={() => handleQuantityButton("0")}
              >
                0
              </button>
              <button
                className="qty-btn"
                onClick={() => handleQuantityButton("00")}
              >
                00
              </button>
            </div>
          </div>

          {/* Cancel Transaction */}
          <div className="cancel-section">
            <button className="cancel-btn" onClick={cancelTransaction}>
              Cancel Transaction
            </button>
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button
              className="action-btn enter-btn"
              onClick={() => alert("Enter pressed")}
            >
              Enter
            </button>
            <button
              className="action-btn back-btn"
              onClick={() => handleQuantityButton("back")}
            >
              Back
            </button>
            <button
              className="action-btn clear-btn"
              onClick={() => handleQuantityButton("clear")}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="pos-footer">
        <div className="footer-item">
          <span className="footer-label">WIC Total:</span>
          <span className="footer-value">$0.00</span>
        </div>
        <div className="footer-item">
          <span className="footer-label">FS Total:</span>
          <span className="footer-value">$0.00</span>
        </div>
      </footer>
    </div>
  );
}
