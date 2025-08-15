import styled from "styled-components";

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  background: ${(props) => (props.type === "income" ? "#e0ffe0" : "#ffe0e0")};
  border-radius: 5px;
`;

const DeleteBtn = styled.button`
  background-color: #ff5c5c;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #e60000;
  }
`;

const TransactionContainer = ({ transactions, deleteTransaction }) => {
  return (
    <List>
      {transactions.map((t) => (
        <Item key={t.id} type={t.transType}>
          <span>
            {t.details} - ₹{t.amount}
          </span>
          <DeleteBtn onClick={() => deleteTransaction(t.id)}>Delete</DeleteBtn>
        </Item>
      ))}
    </List>
  );
};

export default TransactionContainer;
