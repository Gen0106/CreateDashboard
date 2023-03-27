export interface IUser {
  id: number;
  name: string;
}

export enum Currency {
  BTC = "BTC",
  GBP = "GBP",
  EUR = "EUR",
  JPY = "JPY",
  USD = "USD",
}

export interface IPaymentData {
  id: string;
  date: string;
  sender: IUser;
  receiver: IUser;
  amount: string;
  currency: Currency;
  memo: string;
}

export type PaymentDataState = {
  paymentDataList: IPaymentData[];
};

export type PaymentDataAction = {
  type: string;
  paymentData: IPaymentData;
};

export type DispatchType = (args: PaymentDataAction) => PaymentDataAction;

export type PaymentDataFormError = {
  sender: string | null;
  receiver: string | null;
  amount: string | null;
};

export type FilterOptions = {
  id: string;
  date: string;
  sender: string;
  receiver: string;
  minAmount: number | "";
  maxAmount: number | "";
  currency: Currency | "";
  memo: string;
};
