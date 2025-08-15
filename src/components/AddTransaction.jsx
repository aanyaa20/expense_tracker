import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  padding: 20px;
  border-radius: 10px;
  background: #f9f9f9;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  outline: none;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #ccc;
`;

const RadioContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.label`
  margin-left: 10px;
  cursor: pointer;
`;

const RadioBtn = styled.div`
  margin: 10px 20px 10px 0;
`;

const SubmitBtn = styled.button`
  background-color: #4cafef;
  color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  border: none;
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #2196f3;
  }
`;

const AddTransaction = ({ addTransaction }) => {
  const [amount, setAmount] = useState("");
  const [details, setDetails] = useState("");
  const [transType, setTransType] = useState("expense");

  const AddTransactionData = () => {
    if (!amount || !details) return alert("Please fill all fields!");
    addTransaction({
      amount: Number(amount),
      details,
      transType,
      date: new Date(),
      id: Date.now(),
    });
    setAmount("");
    setDetails("");
  };

  return (
    <Container>
      <Input
        type="number"
        placeholder="Enter Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <Input
        type="text"
        placeholder="Enter Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />

      <RadioContainer>
        <RadioBtn>
          <input
            type="radio"
            id="expense"
            name="type"
            value="expense"
            checked={transType === "expense"}
            onChange={(e) => setTransType(e.target.value)}
          />
          <Label htmlFor="expense">Expense</Label>
        </RadioBtn>

        <RadioBtn>
          <input
            type="radio"
            id="income"
            name="type"
            value="income"
            checked={transType === "income"}
            onChange={(e) => setTransType(e.target.value)}
          />
          <Label htmlFor="income">Income</Label>
        </RadioBtn>
      </RadioContainer>

      <SubmitBtn onClick={AddTransactionData}>Add Transaction</SubmitBtn>
    </Container>
  );
};

export default AddTransaction;
