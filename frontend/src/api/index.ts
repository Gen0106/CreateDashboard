import { API_PAYMENT_URL, API_USERLIST_URL } from "../config";
import axios from "axios";
import { IPaymentData, IUser } from "../type";
import seedrandom from "seedrandom";

const SERVER_FLAKY_STATUS_CODE = 503;
const ID_ALREADY_EXISTS_CODE = 409;

/**
 * get a payment data from the server
 * @returns the payment data
 */
export const fetchPaymentData = async (): Promise<IPaymentData> => {
  const response = await axios.get(API_PAYMENT_URL);
  return response.data.data as IPaymentData;
};

/**
 * get user list from the server
 * @returns user list
 */
export const fetchUserList = async (): Promise<IUser[]> => {
  const response = await axios.get(API_USERLIST_URL);
  return response.data.data as IUser[];
};

/**
 * get random number and current date ISO string
 * @returns generated random number and current date ISO string
 */
const getIDAndDateString = (): [string, string] => {
  const curDate = new Date();
  const epochSeconds = Math.round(curDate.getTime() / 1000);
  const prng: seedrandom.PRNG = seedrandom(epochSeconds.toString());

  return [Math.round(prng() * 1e16).toString(), curDate.toISOString()];
};

/**
 * post a payment data
 * @param paymentData
 * @returns the response's status code and the final payment data that was posted
 */
export const postPaymentData = async (
  paymentData: IPaymentData
): Promise<[number, IPaymentData]> => {
  let statusCode: number = SERVER_FLAKY_STATUS_CODE;
  const [id, date]: [string, string] = getIDAndDateString();
  paymentData = { ...paymentData, id: id, date: date };

  while (
    statusCode === SERVER_FLAKY_STATUS_CODE ||
    statusCode === ID_ALREADY_EXISTS_CODE
  ) {
    statusCode = await new Promise((resolve) => {
      if (statusCode === ID_ALREADY_EXISTS_CODE) {
        const [id, date]: [string, string] = getIDAndDateString();
        paymentData = { ...paymentData, id: id, date: date };
      }

      axios
        .post(API_PAYMENT_URL, paymentData)
        .then(() => {
          resolve(201);
        })
        .catch((error) => {
          resolve(error.response.status);
        });
    });
  }

  return [statusCode, paymentData];
};
