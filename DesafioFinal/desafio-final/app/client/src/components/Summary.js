import React from "react";
import "../styles.css";
import { formatMoney } from '../helpers/moneyHelpers';

export default function Summary({ transactions }) {
  const { total, credit, debit, balance } = transactions;
  /* const CREDIT_COLOR = "green-text text-accent-3";
  const DEBIT_COLOR = "red-text"; */
  const textColor = balance >= 0 ? "green-text text-accent-3" : "red-text";

  const balanceIcon = balance >= 0 ? "sentiment_very_satisfied" : "sentiment_very_dissatisfied";
  
  const { containerStyle, summaryIcon, iconContainer } = styles;
  
  return (
    <div style={containerStyle}>
      <span>
        <strong>Lançamentos: </strong>
        {total}
      </span>

      <span>
        <strong>
          Receitas:{' '}
          <span className="green-text text-accent-3">{formatMoney(credit)}</span>
        </strong>
        <div style={iconContainer}>
          <i className="material-icons" style={summaryIcon}>arrow_circle_up</i>
        </div>
      </span>

      <span>
        <strong>
          Despesas:{' '} 
          <span className="red-text">{formatMoney(debit)}</span>
        </strong>
        <div style={iconContainer}>
          <i className="material-icons" style={summaryIcon}>arrow_circle_down</i>
        </div>
      </span>

      <span>
        <strong>
          Saldo: <span className={textColor}>{formatMoney(balance)}</span>
        </strong>
        <div style={iconContainer}>
          <i className="material-icons" style={summaryIcon}>{balanceIcon}</i>
        </div>
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
    border: '1px solid lightgrey',
    borderRadius: '4px',
  },
  summaryIcon: {
    fontSize: '20px',
    marginRight: '5px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }
}