import React from 'react'
import Transaction from './Transaction'

export default function Transactions({transactions}) {
  return (
    <div>
      {transactions.map(({ id, day, category, description, value, type }) => {
        return (
          <div key={id}>
            <Transaction
              id={id}
              day={day}
              category={category}
              description={description}
              value={value}
              type={type}
            />
          </div>
        );
      })}
    </div>
  )
}
