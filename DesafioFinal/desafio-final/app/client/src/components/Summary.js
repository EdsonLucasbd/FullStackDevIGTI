import React from "react";
import "../styles.css";

export default function Summary({ transactions }) {
  const { total, credit, debit, balance } = transactions;
  /* const CREDIT_COLOR = "green-text text-accent-3";
  const DEBIT_COLOR = "red-text"; */
  const textColor = balance >= 0 ? "green-text text-accent-3" : "red-text";

  const balanceIcon = balance >= 0 ? "sentiment_very_satisfied" : "sentiment_very_dissatisfied";

  return (
    <div /* className="alignRow" */ style={styles.containerStyle}>
      <span>
        <strong>Lançamentos: </strong>
        {total}
      </span>

      <span>
        <strong>
          Receitas:{' '}
        <span className="green-text text-accent-3">R$ {credit}</span>
        </strong>
        <i className="material-icons summaryIcon">arrow_circle_up</i>
      </span>

      <span>
        <strong>
          Despesas:{' '} 
          <span className="red-text">R$ {debit}</span>
        </strong>
        <i className="material-icons summaryIcon">arrow_circle_down</i>
      </span>

      <span>
        <strong>
          Saldo: <span className={textColor}>R$ {balance}</span>
        </strong>
        <i className="material-icons summaryIcon">{balanceIcon}</i>
      </span>
    </div>
  );
}

const styles = {
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: '5px',
    margin: '10px',
    /* border: '1px solid lightgrey',
    borderRadius: '4px', */
  }
}