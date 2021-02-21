import React from 'react';
import { formatMoney } from '../helpers/moneyHelpers';

const CREDIT_COLOR = '#5AD76B';
const DEBIT_COLOR = '#D75A5A';

export default function Transaction({ id, day, category, description, value, type }) {
  const { 
    transactionContanier,
    transactionStyle, 
    dataStyle, 
    descriptionValueStyle, 
    descriptionStyle, 
    dateStyle, 
    categoryStyle, 
    valueStyle, 
    actionsStyle, 
    creditStyle,
    debitStyle } = styles;
    
  const transactionTypeStyle = type === '+' ? creditStyle : debitStyle;
  return (
    <div 
      style={{ 
        ...transactionContanier, 
        ...transactionStyle,
        ...transactionTypeStyle 
      }}
    >
      
      <span style={dateStyle}>{day.toString().padStart(2, '0')}</span>
     
      <div style={dataStyle}>
        <div style={descriptionValueStyle}>
          <span style={categoryStyle}>{category}</span>
          <span style={descriptionStyle}>{description}</span>
        </div>

        <span style={valueStyle}>{formatMoney(value)}</span>
      </div>

      <div style={actionsStyle}>
        <i className="material-icons">edit</i>
        <i className="Tiny material-icons">delete</i>
      </div>
    </div>
  )
}

const styles = {
  transactionContanier: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
  },

  transactionStyle: {
    border: '1px solid transparent',
    borderRadius: '4px',
    padding: '5px',
    margin: '15px',
    boxShadow: '-1px 7px 15px -3px #000000',
  },

  debitStyle: {
    backgroundColor: DEBIT_COLOR,
  },

  creditStyle: {
    backgroundColor: CREDIT_COLOR,
  },

  dateStyle: {
    marginRight: '20px',
    fontFamily: 'Consolas, monospace',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },

  descriptionValueStyle: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },

  dataStyle: {
    display: 'flex',
    flex: 7,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  categoryStyle: {
    fontWeight: 'bold',
    fontSize: '1.2rem',
  },

  descriptionStyle: {
    fontSize: '1.1rem',
  },

  valueStyle: {
    textAlign: 'right',
    fontFamily: 'Consolas, monospace',
    fontSize: '1.8rem',
  },

  actionsStyle: {
    marginLeft: '10px',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
};
