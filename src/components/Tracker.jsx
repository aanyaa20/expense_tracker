import React, { useState, useEffect } from "react";
import styled from "styled-components";
import AddTransaction from "./AddTransaction";
import OverviewComponent from "./OverviewComponent";
import TransactionContainer from "./TransactionContainer";

const TrackerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 500px;
  width: 100%;
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 1rem;
`;

const MonthSelect = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ddd;
  margin-bottom: 1rem;
`;

const Tracker = () => {
  const [transactions, setTransactions] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [month, setMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("transactions")) || [];
    setTransactions(stored);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions((prev) => [transaction, ...prev]);
  };

  const deleteTransaction = (id) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const filteredTransactions = transactions.filter(
    (t) => new Date(t.date).getMonth() === Number(month)
  );

  const income = filteredTransactions
    .filter((t) => t.transType === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = filteredTransactions
    .filter((t) => t.transType === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  return (
    <TrackerWrapper>
      <Title>💰 My Expense Tracker</Title>

      <MonthSelect value={month} onChange={(e) => setMonth(e.target.value)}>
        {Array.from({ length: 12 }, (_, i) => (
          <option key={i} value={i}>
            {new Date(0, i).toLocaleString("default", { month: "long" })}
          </option>
        ))}
      </MonthSelect>

      <OverviewComponent
        toggle={toggle}
        setToggle={setToggle}
        income={income}
        expense={expense}
      />

      {toggle && <AddTransaction addTransaction={addTransaction} />}

      <TransactionContainer
        transactions={filteredTransactions}
        deleteTransaction={deleteTransaction}
      />
    </TrackerWrapper>
  );
};

export default Tracker;
