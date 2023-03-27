import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";

import * as colWidth from "../../constants";
import {
  IPaymentData,
  PaymentDataState,
  Currency,
  FilterOptions,
} from "../../type";
import FilterBar from "./filterBar";

const selectPaymentDataList = (state: PaymentDataState) => state.paymentDataList;

const PaymentDataList: React.FC = () => {
  const nonFilterOptions: FilterOptions = {
    id: "",
    date: "",
    sender: "",
    receiver: "",
    minAmount: "",
    maxAmount: "",
    currency: "",
    memo: "",
  };

  /**
   * check if the payment data id includes filter id value
   * @param data payment data
   * @param id filter value
   * @returns true: the payment data id includes filter id
   *          false: the payment data id doesn't include filter id
   */
  const checkId = (data: IPaymentData, id: string): boolean => {
    return id === "" || data.id.includes(id);
  };

  /**
   * check if the payment data date includes filter date value
   * @param data payment data
   * @param date filter value
   * @returns true: the payment data date includes filter date
   *          false: the payment data date doesn't include filter date
   */
  const checkDate = (data: IPaymentData, date: string): boolean => {
    return date === "" || data.date.includes(date);
  };

  /**
   * check if the payment data sender includes filter sender value
   * @param data payment data
   * @param sender filter value
   * @returns true: the payment data sender includes filter sender
   *          false: the payment data sender doesn't include filter sender
   */
  const checkSender = (data: IPaymentData, sender: string): boolean => {
    return sender === "" || data.sender.name.includes(sender);
  };

  /**
   * check if the payment data receiver includes filter receiver value
   * @param data payment data
   * @param receiver filter value
   * @returns true: the payment data receiver includes filter receiver
   *          false: the payment data receiver doesn't include filter receiver
   */
  const checkReceiver = (data: IPaymentData, receiver: string): boolean => {
    return receiver === "" || data.receiver.name.includes(receiver);
  };

  /**
   * check if the payment data amount is greater or equals than filter min amount value
   * @param data payment data
   * @param minAmount filter value
   * @returns true: the payment data amount is greater or equals filter min amount
   *          false: the payment data amount is less than filter min amount
   */
  const checkMinAmount = (
    data: IPaymentData,
    minAmount: number | ""
  ): boolean => {
    return minAmount === "" || parseFloat(data.amount) >= minAmount;
  };

  /**
   * check if the payment data amount is less or equals than filter max amount value
   * @param data payment data
   * @param maxAmount filter value
   * @returns true: the payment data amount is less or equals filter max amount
   *          false: the payment data amount is greater than filter max amount
   */
  const checkMaxAmount = (
    data: IPaymentData,
    maxAmount: number | ""
  ): boolean => {
    return maxAmount === "" || parseFloat(data.amount) <= maxAmount;
  };

  /**
   * check if the payment data currency equals filter currency value
   * @param data payment data
   * @param currency filter value
   * @returns true: the payment data currency equals filter currency
   *          false: the payment data currency doesn't equal filter currency
   */
  const checkCurrency = (
    data: IPaymentData,
    currency: Currency | ""
  ): boolean => {
    return currency === "" || data.currency === currency;
  };

  /**
   * check if the payment data memo includes filter memo value
   * @param data payment data
   * @param memo filter value
   * @returns true: the payment data memo includes filter memo
   *          false: the payment data memo doesn't include filter memo
   */
  const checkMemo = (data: IPaymentData, memo: string): boolean => {
    return memo === "" || data.memo.includes(memo);
  };

  /**
   * check if the payment data can pass for filter options
   * @param data the payment data
   * @param options filter options
   * @returns true: the payment data passes for filter options
   *          false: the payment data doesn't pass for filter options
   */
  const checkFilterOption = (
    data: IPaymentData,
    options: FilterOptions
  ): boolean => {
    return (
      checkId(data, options.id) &&
      checkDate(data, options.date) &&
      checkSender(data, options.sender) &&
      checkReceiver(data, options.receiver) &&
      checkMinAmount(data, options.minAmount) &&
      checkMaxAmount(data, options.maxAmount) &&
      checkCurrency(data, options.currency) &&
      checkMemo(data, options.memo)
    );
  };

  /**
   * filter the payment data list with the filter options that the user inputed
   * @param list the payment data list that got from the server
   * @param options the filter options that the user inputed
   * @returns the filtered list
   */
  const filter = (options: FilterOptions): IPaymentData[] => {
    const filteredList: IPaymentData[] = [];
    paymentDataList.map((data: IPaymentData) => {
      if (checkFilterOption(data, options)) filteredList.push(data);
    });
    return filteredList.slice(0, 25);
  };

  /**
   * the payment data list that got from the server
   */
  const paymentDataList: IPaymentData[] = useSelector(selectPaymentDataList);

  const [filterOptions, setFilterOptions] =
    useState<FilterOptions>(nonFilterOptions);

  const [showList, setShowList] = useState<IPaymentData[]>([]);

  useEffect(() => {
    setShowList(filter(filterOptions));
  }, [paymentDataList, filterOptions]);

  /**
   * clear filter options
   */
  const handleClear = () => {
    setFilterOptions(nonFilterOptions);
  };

  return (
    <>
      <FilterBar
        options={filterOptions}
        setOptions={setFilterOptions}
        clear={handleClear}
      />
      <Table bordered hover size="sm" className="text-left">
        <thead>
          <tr>
            <th
              className="text-end px-2"
              style={{ width: colWidth.ID_COLUMN_WIDTH }}
            >
              Id
            </th>
            <th
              className="text-end px-2"
              style={{ width: colWidth.DATE_COLUMN_WIDTH }}
            >
              Date
            </th>
            <th
              className="text-start px-2"
              style={{ width: colWidth.NAME_COLUMN_WIDTH }}
            >
              Sender Name
            </th>
            <th
              className="text-start px-2"
              style={{ width: colWidth.NAME_COLUMN_WIDTH }}
            >
              Receiver Name
            </th>
            <th
              className="text-end px-2"
              style={{ width: colWidth.AMOUNT_COLUMN_WIDTH }}
            >
              Amount
            </th>
            <th
              className="text-center"
              style={{ width: colWidth.CURRENCY_COLUMN_WIDTH }}
            >
              Currency
            </th>
            <th
              className="text-start px-2"
              style={{ width: colWidth.MEMO_COLUMN_WIDTH }}
            >
              Memo
            </th>
          </tr>
        </thead>
        <tbody>
          {showList.length == 0 ? (
            <tr>
              <td colSpan={7}>No payment data</td>
            </tr>
          ) : (
            showList.map((paymentData: IPaymentData) => (
              <tr key={paymentData.id}>
                <td
                  className="text-end px-2"
                  style={{ width: colWidth.ID_COLUMN_WIDTH }}
                >
                  {paymentData.id}
                </td>
                <td
                  className="text-end px-2"
                  style={{ width: colWidth.DATE_COLUMN_WIDTH }}
                >
                  {paymentData.date}
                </td>
                <td
                  className="text-start px-2"
                  style={{ width: colWidth.NAME_COLUMN_WIDTH }}
                >
                  {paymentData.sender.name}
                </td>
                <td
                  className="text-start px-2"
                  style={{ width: colWidth.NAME_COLUMN_WIDTH }}
                >
                  {paymentData.receiver.name}
                </td>
                <td
                  className="text-end px-2"
                  style={{ width: colWidth.AMOUNT_COLUMN_WIDTH }}
                >
                  {paymentData.amount}
                </td>
                <td
                  className="text-center"
                  style={{ width: colWidth.CURRENCY_COLUMN_WIDTH }}
                >
                  {paymentData.currency}
                </td>
                <td
                  className="text-start px-2"
                  style={{ width: colWidth.MEMO_COLUMN_WIDTH }}
                >
                  {paymentData.memo}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  );
};

export default PaymentDataList;
