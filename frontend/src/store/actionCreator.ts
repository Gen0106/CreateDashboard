import * as actionTypes from "./actionTypes";
import { IPaymentData, PaymentDataAction, DispatchType } from "../type";

export function addPaymentData(paymentData: IPaymentData) {
  const action: PaymentDataAction = {
    type: actionTypes.ADD_PAYMENT,
    paymentData,
  };

  return (dispatch: DispatchType) => dispatch(action);
}
