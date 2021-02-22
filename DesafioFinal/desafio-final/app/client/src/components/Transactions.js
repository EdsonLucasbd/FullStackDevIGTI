import React from 'react';
import Transaction from './Transaction';

export default function Transactions({
  transactions, 
  onDeleteTransaction, 
  onEditTransaction,
}) {

  const handleDelete = (id) => {
    onDeleteTransaction(id);
  };

  const handleEdit = (id) => {
    onEditTransaction(id);
  };

  return (
    <div className='center' style={styles.transactionStyle}>
      {transactions.map((transaction) => {
        const { id } = transaction;
        return (
          <Transaction
            key={id}
            transaction={transaction}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        );
      })}
    </div>
  )
}

const styles = {
  transactionsStyle: {
    padding: '5px',
  },
};