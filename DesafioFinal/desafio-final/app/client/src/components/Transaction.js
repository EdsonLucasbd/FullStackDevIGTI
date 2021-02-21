import React from 'react'

export default function Transaction({ id, day, category, description, value, type }) {
  const { transactionContanier, descriptionStyle, editIcon } = styles;
  return (
    <div 
      className={`card ${type === '+' ? 'green accent-3' : 'red' }`}
    >
      <div style={transactionContanier}>
        <strong>{day.toString().padStart(2, '0')}</strong>
        <strong>{category}</strong>
        <div style={descriptionStyle}>
          {description}
        </div>
        {value}
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
    margin: '5px',
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
