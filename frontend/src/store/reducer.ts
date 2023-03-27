import * as actionTypes from "./actionTypes";
import { PaymentDataState, PaymentDataAction } from "../type";

const initialState: PaymentDataState = {
  paymentDataList: [],
};

const reducer = (
  state: PaymentDataState = initialState,
  action: PaymentDataAction
): PaymentDataState => {
  switch (action.type) {
    case actionTypes.ADD_PAYMENT: {
      const paymentDataList = [...state.paymentDataList];
      const duplicatedList = state.paymentDataList.filter((paymentData) => {
        return action.paymentData.id === paymentData.id;
      });

      return {
        ...state,
        paymentDataList: duplicatedList.length
          ? paymentDataList
          : [action.paymentData, ...state.paymentDataList],
      };
    }
    default:
      return state;
  }
};

export default reducer;
