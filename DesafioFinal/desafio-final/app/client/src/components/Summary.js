import React from "react";
import "../styles.css";

export default function Summary({ transactions }) {
  const { total, credit, debit, balance } = transactions;
  /* const total = transactions.length;

  const sum = transactions.reduce(
    (accumulator, { type, value }) => {
      type === "+"
        ? (accumulator.credit += value)
        : (accumulator.debit += value);

      return accumulator;
    },
    { credit: 0, debit: 0 }
  );

  const credit = sum.credit;
  const debit = sum.debit;
  const balance = credit - debit; */
  /* const [balanceIcon, setBalanceIcon] = useState("");

  if (balance > 0) {
    setBalanceIcon("sentiment_very_satisfied");
  }
  if (balance < 0) {
    setBalanceIcon("sentiment_very_dissatisfied");
  }
  if (balance == 0) {
    setBalanceIcon("sentiment_neutral");
  } */

  const balanceIcon = balance >= 0 ? "sentiment_very_satisfied" : "sentiment_very_dissatisfied";

  return (
    <div className="alignRow">
      <div>
        Lançamentos: <span>{total}</span>
      </div>
      <div>
        <span>
          <i className="material-icons summaryIcon">expand_less</i>
        </span>
        Receitas: <span className="green-text text-accent-3">R$ {credit}</span>
      </div>
      <div>
        <span>
          <i className="material-icons summaryIcon">expand_more</i>
        </span>
        Despesas: <span className="red-text">R$ {debit}</span>
      </div>
      <div>
        <span>
          <i className="material-icons summaryIcon">{balanceIcon}</i>
        </span>
        Saldo: <span className="red-text">R$ {balance}</span>
      </div>
    </div>
  );
}
