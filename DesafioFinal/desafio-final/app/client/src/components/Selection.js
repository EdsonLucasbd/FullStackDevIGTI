import React, { useEffect } from "react";
import M from "materialize-css";
import "../styles.css";

export default function Selection({
  values,
  selectedValue,
  onChange,
}) {
  useEffect(() => {
    M.AutoInit();
  }, []);

  function handleChange({ target }) {
    const newValue = target.value;
    onChange(newValue);
  }

  return (
    <div className="selectContainer">
      <select value={selectedValue} onChange={handleChange}>
        {values.map(value => {
          const {  id, description } = value;
          return (
            <option key={id} value={id}>
              {description}
            </option>
          );
        })}
      </select>
    </div>
  );
}
