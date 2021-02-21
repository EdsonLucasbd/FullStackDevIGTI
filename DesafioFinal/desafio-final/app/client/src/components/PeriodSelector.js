import React, { useEffect, useState } from "react";
import ArrowButton from "./ArrowButton";

export default function PeriodSelector({
  allPeriodsValues,
  selectedValue,
  onChangePeriod,
}) {
  const [isFirstPeriod, setIsFirstPeriod] = useState(false);
  const [isLastPeriod, setIsLastPeriod] = useState(false);
  
  useEffect(() => {
    if (!allPeriodsValues || !selectedValue) {
      return;
    }

    const chekIsFirstPeriod = () => selectedValue.index === 0;

    const chekIsLastPeriod = () => 
      selectedValue.index === allPeriodsValues.length - 1;

    setIsFirstPeriod(chekIsFirstPeriod(selectedValue.index));
    setIsLastPeriod(chekIsLastPeriod(selectedValue.index));
  
  }, [selectedValue, allPeriodsValues]);

  const handleSelectChange = event => {
    onChangePeriod(allPeriodsValues.find(period => period.id === event.target.value));
  };

  const handleLeftClick = () => {
    const index = allPeriodsValues.findIndex(item => item.id === selectedValue.id);

    onChangePeriod(allPeriodsValues[index - 1]);
  };

  const handleRightClick = () => {
    const index = allPeriodsValues.findIndex(item => item.id === selectedValue.id);

    onChangePeriod(allPeriodsValues[index + 1]);
  };

  if (allPeriodsValues.length === 0 || !selectedValue) {
    return null;
  }

  const { flexRowStyle, selectStyle } = styles;

  return (
    <div className="center" style={flexRowStyle}>
      <ArrowButton
        type='-'
        onClick={handleLeftClick}
        buttonDisabled={isFirstPeriod}
      />
      <select 
        className="browser-default" 
        style={selectStyle}
        value={selectedValue.id} 
        onChange={handleSelectChange}
        >
          {allPeriodsValues.map(value => {
            const {  id, description } = value;
            return (
              <option key={id} value={id}>
                {description}
              </option>
            );
          })}
      </select>

      <ArrowButton
        type='+'
        onClick={handleRightClick}
        buttonDisabled={isLastPeriod}
      />
    </div>
  );
}

const styles = {
  flexRowStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px',
  },

  selectStyle: {
    width: '150px',
    fontFamily: "'Fira Code Retina', Consolas, monospace, Arial",
  },
};