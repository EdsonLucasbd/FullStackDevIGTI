import React from "react";

export default function ArrowButton({ 
  type = '-', 
  buttonDisabled = false,
  onClick = null,
}) {
  const handleClick = () => {
    onClick(null);
  };

  return (
    <button 
      className="btn" 
      disabled={buttonDisabled}
      onClick={handleClick}
    >
      <i className="material-icons">
        {type === "-" ? "navigate_before" : "navigate_next"}
      </i>
    </button>
  );
}
