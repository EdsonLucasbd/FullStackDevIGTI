import React from "react";

export default function ButtonPrevNext({ value, onClick }) {
  function handleClick({ currentTarget }) {
    const newValue = currentTarget.value;
    onClick(newValue);
  }

  return (
    <button className="waves-effect btn" value={value} onClick={handleClick}>
      <i className="material-icons">
        {value === "+" ? "navigate_next" : "navigate_before"}
      </i>
    </button>
  );
}
