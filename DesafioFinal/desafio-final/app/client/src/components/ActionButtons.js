import React from 'react'

export default function ActionButtons({ filterText, onFilter, onNewTransaction }) {
  const handleChangeFilterText = ({ currentTarget }) => {
    const userText = currentTarget.value;
    onFilter(userText);
  };

  const handleButtonClick = () => {
    onNewTransaction();
  };

  const { containerStyle, inputStyle } = styles;

  return (
    <div style={containerStyle}>
      <button 
        className="btn"
        disabled={filterText.trim() !== ''}
        onClick={handleButtonClick}
      >
        + Novo lançamento
      </button>
      
      <div className="input-field" style={inputStyle}>
        <input 
          type="text"
          placeholder="Filtro"
          value={filterText}
          onChange={handleChangeFilterText}
        />
      </div>
    </div>
  );
}

const styles = {
  containerStyle: {
    padding: '10px',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  inputStyle: {
    marginLeft: '10px',
    display: 'flex',
    flex: 1,
  },
};