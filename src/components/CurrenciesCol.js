import React, { useState } from "react";
import Dropdown from "./CurrenciesDropdown";
import styled from "styled-components";

const CurrenciesColumn = (props) => {
  const {
    toEurCurrency,
    toAmountEur,
    toUsdCurrency,
    toAmountUsd,
    toGbpCurrency,
    toAmountGbp,
  } = props;
  const [showEur, setShowEur] = useState(true);
  const [showUsd, setShowUsd] = useState(true);
  const [showGbp, setShowGbp] = useState(true);

  const fEurCurrency =
    toAmountEur.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    }) + "€";

  const fUsdCurrency =
    "$" +
    toAmountUsd.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

  const fGbpCurrency =
    "£" +
    toAmountGbp.toLocaleString(undefined, {
      maximumFractionDigits: 2,
    });

  return (
    <>
      <div className="currencies-container">
        {showEur ? (
          <CurrencyContainer className="eur-container calc-col">
            <div className="currencyName">{toEurCurrency}</div>
            <div>{fEurCurrency}</div>
            <span className="delete-item" onClick={() => setShowEur(false)}>
              x
            </span>
          </CurrencyContainer>
        ) : null}
        {showUsd ? (
          <CurrencyContainer className="usd-container calc-col">
            <div className="currencyName">{toUsdCurrency}</div>
            <div>{fUsdCurrency}</div>
            <span className="delete-item" onClick={() => setShowUsd(false)}>
              x
            </span>
          </CurrencyContainer>
        ) : null}
        {showGbp ? (
          <CurrencyContainer className="gbp-container calc-col">
            <div className="currencyName">{toGbpCurrency}</div>
            <div>{fGbpCurrency}</div>
            <span className="delete-item" onClick={() => setShowGbp(false)}>
              x
            </span>
          </CurrencyContainer>
        ) : null}

        {!showUsd || !showEur || !showGbp ? (
          <Dropdown
            showEur={showEur}
            showUsd={showUsd}
            showGbp={showGbp}
            setShowEur={setShowEur}
            setShowUsd={setShowUsd}
            setShowGbp={setShowGbp}
            toEurCurrency={toEurCurrency}
            toUsdCurrency={toUsdCurrency}
            toGbpCurrency={toGbpCurrency}
          />
        ) : null}
      </div>
    </>
  );
};

const CurrencyContainer = styled.div`
  border: 2px solid #fff;
  color: #fff;
  border-radius: 2rem;
  padding: 2rem;
  position: relative;
  width: 12rem;
  .currencyName {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.4rem;
  }
  .delete-item {
    position: absolute;
    right: 5px;
    top: 0px;
    font-size: 1.4rem;
    color: red;
    border-radius: 25px;
    padding: 5px 14px;
    cursor: pointer;
    transition: transform 0.25s ease-in-out;
    :hover {
      transform: scale(1.5);
    }
  }
`;

export default CurrenciesColumn;
