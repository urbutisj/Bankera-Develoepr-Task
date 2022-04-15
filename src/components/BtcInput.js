import React from "react";
import styled from "styled-components";

// Bitcoin Value Input Field Component

const BtcInput = (props) => {
  const { amount, onChangeAmount, fromCurrency } = props;

  return (
    <BitcoinInputRow>
      <div className="currency-title">{fromCurrency}</div>
      <InputStyle
        type="number"
        min="0"
        step="1"
        value={amount && Math.max(0, amount)}
        onChange={onChangeAmount}
      />
    </BitcoinInputRow>
  );
};

// BTC Input row and syling of input himself

const BitcoinInputRow = styled.div`
  .currency-title {
    font-size: 1.8rem;
    color: #fff;
    margin: 1rem 0;
  }
`;

const InputStyle = styled.input`
  border: 2px solid #fff;
  outline: none;
  background: none;
  color: #fff;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 1rem;
  padding: 1rem 0rem;
  width: 16rem;
  text-align: center;
  -moz-appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export default BtcInput;
