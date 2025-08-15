// App.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyles from "./globalStyles";
import { FaTrash } from "react-icons/fa";


const AppWrapper = styled.div`
  max-width: 550px;
  margin: 40px auto;
  padding: 25px;
  border-radius: 20px;
  background: rgba(30, 30, 30, 0.6);
  backdrop-filter: blur(15px);
  box-shadow: 0px 8px 30px rgba(0, 0, 0, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.15);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  background: linear-gradient(to right, #ff7e5f, #feb47b);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
`;

const Button = styled.button`
  background: linear-gradient(to right, #43cea2, #185a9d);
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0px 4px 15px rgba(24, 90, 157, 0.4);
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-size: 1rem;
  outline: none;

  &::placeholder {
    color: rgba(255, 255, 255, 0.8);
  }
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 8px;
  border: none;
  background: rgba(255, 255, 255, 0.15);
  color: white;
  font-weight: bold;

  option {
    color: black;
  }
`;

const Transaction = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  span {
    color: white;
  }
`;

const DeleteBtn = styled.button`
  background: transparent;
  border: none;
  color: #ff4d4d;
  font-size: 1.2rem;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export default function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  // Load from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    if (savedTransactions) {
      setTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save to localStorage whenever transactions change
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = () => {
    if (!text || !amount) return;
    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
      date: new Date()
    };
    setTransactions([newTransaction, ...transactions]);
    setText("");
    setAmount("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter(
    (t) => new Date(t.date).getMonth() === selectedMonth
  );

  const monthlyTotal = filteredTransactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <>
      <GlobalStyles />
      <AppWrapper>
        <Title>💰 Expense Tracker</Title>

        {/* Month Selector */}
        <div style={{ marginBottom: "15px", textAlign: "center" }}>
          <label style={{ marginRight: "10px", color: "white" }}>Select Month:</label>
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {new Date(0, i).toLocaleString("default", { month: "long" })}
              </option>
            ))}
          </Select>
        </div>

        {/* Total */}
        <Row>
          <h2 style={{ color: "#f1c40f" }}>₹{monthlyTotal}</h2>
          <Button onClick={addTransaction}>ADD</Button>
        </Row>

        {/* Inputs */}
        <Input
          type="text"
          placeholder="Enter description"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Transaction List */}
        <h3 style={{ color: "white" }}>Transactions</h3>
        {filteredTransactions.length > 0 ? (
          filteredTransactions.map((t) => (
            <Transaction key={t.id}>
              <span>{t.text}</span>
              <span>₹{t.amount}</span>
             <DeleteBtn onClick={() => deleteTransaction(t.id)}>
  <FaTrash />
</DeleteBtn>

            </Transaction>
          ))
        ) : (
          <p style={{ color: "rgba(255,255,255,0.7)" }}>No transactions this month.</p>
        )}
      </AppWrapper>
    </>
  );
}
