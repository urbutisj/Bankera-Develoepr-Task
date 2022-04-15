import React, { useState } from "react";
import styled from "styled-components";

// Currencies dropdown component. It appears when one of the currencies are removed.

const Dropdown = (props) => {
  const {
    showEur,
    showUsd,
    showGbp,
    setShowEur,
    setShowUsd,
    setShowGbp,
    toEurCurrency,
    toUsdCurrency,
    toGbpCurrency,
  } = props;
  const [stateValue, setStateValue] = useState("Choose Currency");

  return (
    <div>
      <DropdownStyle
        className="custom-select"
        value={stateValue}
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (selectedValue === toUsdCurrency) {
            setShowUsd(true);
          }
          if (selectedValue === toEurCurrency) {
            setShowEur(true);
          }
          if (selectedValue === toGbpCurrency) {
            setShowGbp(true);
          }
          setStateValue(selectedValue);
        }}
      >
        <option value="Choose Currency">Choose Currency</option>
        {!showEur ? (
          <option value={toEurCurrency}>{toEurCurrency}</option>
        ) : null}
        {!showUsd ? (
          <option value={toUsdCurrency}>{toUsdCurrency}</option>
        ) : null}
        {!showGbp ? (
          <option value={toGbpCurrency}>{toGbpCurrency}</option>
        ) : null}
      </DropdownStyle>
    </div>
  );
};

// Styling of Dropdown Component

const DropdownStyle = styled.select`
  border: 2px solid #fff;
  border-radius: 1rem;
  padding: 1rem 0rem;
  width: 16rem;
  text-align: center;
  outline: none;
  background: none;
  margin-bottom: 2rem;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  option {
    background-color: #070336;
    color: #fff;
  }
`;

export default Dropdown;
