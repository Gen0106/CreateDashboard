import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import * as colWidth from "../../constants";
import { Currency, FilterOptions } from "../../type";

type Props = {
  options: FilterOptions;
  setOptions: (options: FilterOptions) => void;
  clear: () => void;
};
const FilterBar: React.FC<Props> = ({ options, setOptions, clear }) => {
  const ONE_REM = 16; // 1rem = 16 pixels

  /**
   * clear filter options
   */
  const handleClear = () => {
    clear();
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, id: e.target.value });
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, date: e.target.value });
  };

  const handleSenderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, sender: e.target.value });
  };

  const handleReceiverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, receiver: e.target.value });
  };

  const handleMinAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      minAmount: e.target.value === "" ? "" : parseFloat(e.target.value),
    });
  };

  const handleMaxAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({
      ...options,
      maxAmount: e.target.value === "" ? "" : parseFloat(e.target.value),
    });
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setOptions({
      ...options,
      currency: e.target.value === "" ? "" : (e.target.value as Currency),
    });
  };

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOptions({ ...options, memo: e.target.value });
  };

  return (
    <div>
      <div className="form-group d-flex mb-2 align-items-center">
        <Form.Control
          type="text"
          className="form-control text-end px-2 mx-2"
          id="id"
          placeholder="Filter Id"
          style={{ width: colWidth.ID_COLUMN_WIDTH - ONE_REM }}
          value={options.id}
          onChange={handleIdChange}
        />
        <Form.Control
          type="text"
          className="form-control text-end px-2 mx-2"
          id="date"
          placeholder="Filter Date"
          style={{ width: colWidth.DATE_COLUMN_WIDTH - ONE_REM }}
          value={options.date}
          onChange={handleDateChange}
        />
        <Form.Control
          type="text"
          className="form-control text-start px-2 mx-2"
          id="sender"
          placeholder="Filter Sender"
          style={{ width: colWidth.NAME_COLUMN_WIDTH - ONE_REM }}
          value={options.sender}
          onChange={handleSenderChange}
        />
        <Form.Control
          type="text"
          className="form-control text-start px-2 mx-2"
          id="receiver"
          placeholder="Filter Receiver"
          style={{ width: colWidth.NAME_COLUMN_WIDTH - ONE_REM }}
          value={options.receiver}
          onChange={handleReceiverChange}
        />
        <div className="">
          <Form.Control
            type="number"
            className="form-control text-end px-1 mx-2 my-2"
            id="minAmount"
            placeholder="Min"
            style={{ width: colWidth.AMOUNT_COLUMN_WIDTH - ONE_REM }}
            value={options.minAmount}
            onChange={handleMinAmountChange}
          />
          <Form.Control
            type="number"
            className="form-control text-end px-1 mx-2 my-2"
            id="maxAmount"
            placeholder="Max"
            style={{ width: colWidth.AMOUNT_COLUMN_WIDTH - ONE_REM }}
            value={options.maxAmount}
            onChange={handleMaxAmountChange}
          />
        </div>

        <Form.Select
          className="text-start px-1 mx-2"
          style={{ width: colWidth.CURRENCY_COLUMN_WIDTH - ONE_REM }}
          id="currency"
          value={options.currency}
          onChange={handleCurrencyChange}
        >
          <option value=""></option>
          <option value={Currency.BTC}>{Currency.BTC}</option>
          <option value={Currency.EUR}>{Currency.EUR}</option>
          <option value={Currency.GBP}>{Currency.GBP}</option>
          <option value={Currency.JPY}>{Currency.JPY}</option>
          <option value={Currency.USD}>{Currency.USD}</option>
        </Form.Select>
        <Form.Control
          type="text"
          className="form-control text-start px-2 mx-2"
          id="memo"
          placeholder="Memo"
          style={{ width: colWidth.MEMO_COLUMN_WIDTH - ONE_REM }}
          value={options.memo}
          onChange={handleMemoChange}
        />
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );
};

export default FilterBar;
