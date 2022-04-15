import React, { useEffect, useState } from "react";
import BtcInput from "../components/BtcInput";
import CurrenciesCol from "../components/CurrenciesCol";
import styled from "styled-components";

function Home() {
  // States for Loading Currencies and Catching errors
  const [isPendingEur, setIsPendingEur] = useState(true);
  const [errorEur, setErrorEur] = useState();

  const [isPendingUsd, setIsPendingUsd] = useState(true);
  const [errorUsd, setErrorUsd] = useState();

  const [isPendingGbp, setIsPendingGbp] = useState(true);
  const [errorGbp, setErrorGbp] = useState();

  // Exchange rates states
  const [exchangeRateEur, setExchangeRateEur] = useState();
  const [exchangeRateUsd, setExchangeRateUsd] = useState();
  const [exchangeRateGbp, setExchangeRateGbp] = useState();

  // Currency names states
  const [fromCurrency, setFromCurrency] = useState();
  const [toEurCurrency, setToEurCurrency] = useState();
  const [toUsdCurrency, setToUsdCurrency] = useState();
  const [toGbpCurrency, setToGbpCurrency] = useState();

  // Amount states
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

  let toAmountEur, toAmountUsd, toAmountGbp, fromAmount;

  // Rates Calculations
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmountEur = amount / exchangeRateEur;
    toAmountUsd = amount / exchangeRateUsd;
    toAmountGbp = amount / exchangeRateGbp;
  }

  //Fetching Data for EUR currency
  const fetchDataToEur = async () => {
    await fetch(process.env.REACT_APP_EUR_URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data from API");
        }
        return res.json();
      })
      .then((data) => {
        setFromCurrency(data.currencyFrom);
        setToEurCurrency(data.currencyTo);
        setExchangeRateEur(data.last);
        setIsPendingEur(false);
        setErrorEur(null);
      })
      .catch((err) => {
        setIsPendingEur(false);
        setErrorEur(err.message);
      });
  };

  //Fetching Data for USD currency
  const fetchDataToUsd = async () => {
    await fetch(process.env.REACT_APP_USD_URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data from API");
        }
        return res.json();
      })
      .then((data) => {
        setToUsdCurrency(data.currencyTo);
        setExchangeRateUsd(data.last);
        setIsPendingUsd(false);
        setErrorUsd(null);
      })
      .catch((err) => {
        setIsPendingUsd(false);
        setErrorUsd(err.message);
      });
  };

  //Fetching Data for GBP currency
  const fetchDataToGbp = async () => {
    await fetch(process.env.REACT_APP_GBP_URL)
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch data from API");
        }
        return res.json();
      })
      .then((data) => {
        setToGbpCurrency(data.currencyTo);
        setExchangeRateGbp(data.last);
        setIsPendingGbp(false);
        setErrorGbp(null);
      })
      .catch((err) => {
        setIsPendingGbp(false);
        setErrorGbp(err.message);
      });
  };

  //Fetch on page Load and then refresh it every minute.
  useEffect(() => {
    fetchDataToEur();
    fetchDataToUsd();
    fetchDataToGbp();
    const interval = setInterval(() => {
      fetchDataToEur();
      fetchDataToUsd();
      fetchDataToGbp();
      console.log("Data was refreshed");
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleFromAmountChange = (e) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  return (
    <div className="calculator">
      <h1>
        BTC to Fiat <br /> Calculator
      </h1>
      {errorEur && errorUsd && errorGbp ? <div>{errorEur}</div> : null}
      {isPendingEur && isPendingUsd && isPendingGbp ? (
        <Message>Loading...</Message>
      ) : null}
      {toEurCurrency && toUsdCurrency && toGbpCurrency ? (
        <CalculatorRow>
          <div>
            <BtcInput
              fromCurrency={fromCurrency}
              amount={fromAmount}
              onChangeAmount={handleFromAmountChange}
            />
          </div>
          <div>
            <h3>Will cost you:</h3>
            <CurrenciesCol
              toEurCurrency={toEurCurrency}
              toAmountEur={toAmountEur}
              toUsdCurrency={toUsdCurrency}
              toAmountUsd={toAmountUsd}
              toGbpCurrency={toGbpCurrency}
              toAmountGbp={toAmountGbp}
            />
          </div>
        </CalculatorRow>
      ) : null}
    </div>
  );
}

const CalculatorRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  justify-items: center;
  align-items: center;
  max-width: 40rem;
  flex-direction: row;
  gap: 3rem;
  @media screen and (max-width: 990px) {
    flex-direction: column;
    gap: unset;
  }
`;

const Message = styled.div`
  color: #fff;
  font-size: 1.6rem;
`;

export default Home;
