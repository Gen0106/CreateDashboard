import React, { useState } from "react";
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { IUser, Currency, IPaymentData, PaymentDataFormError } from "../type";
import { postPaymentData } from "../api";
import { addPaymentData } from "../store/actionCreator";

type Props = {
  userList: IUser[];
};
const PaymentDataFormModal: React.FC<Props> = ({ userList }) => {
  const FORM_INVALID_SENDER_MSG = "Please select the sender!";
  const FORM_INVALID_RECEIVER_MSG = "Please select the receiver!";
  const FORM_INVALID_SENDER_RECEIVER_MSG =
    "The sender and receiver should not the same user!";
  const FORM_INVALID_AMOUNT_MSG = "Please input the correct amount value!";

  const nonSelectedUser: IUser = { id: 0, name: "" };

  const dispatch: AppDispatch = useDispatch();

  const [show, setShow] = useState<boolean>(false);
  const [isCreating, setIsCreating] = useState<boolean>(false);

  const [sender, setSender] = useState<IUser>(nonSelectedUser);
  const [receiver, setReceiver] = useState<IUser>(nonSelectedUser);
  const [amount, setAmount] = useState<number>(0);
  const [currency, setCurrency] = useState<Currency>(Currency.BTC);
  const [memo, setMemo] = useState<string>("");

  const [errors, setErrors] = useState<PaymentDataFormError>({
    sender: null,
    receiver: null,
    amount: null,
  });

  const [invalidMsg, setInvalidMsg] = useState<string>("");

  /**
   * Initialize state values
   */
  const initializeStates = () => {
    setSender(nonSelectedUser);
    setReceiver(nonSelectedUser);
    setAmount(0);
    setCurrency(Currency.BTC);
    setMemo("");
    setInvalidMsg("");
    setErrors({ sender: null, receiver: null, amount: null });
  };

  /**
   * close the modal
   */
  const handleClose = () => {
    setShow(false);
    initializeStates();
  };

  /**
   * open the modal
   */
  const handleShow = () => setShow(true);

  /**
   * This function reflects the sender value with the user's input value in the sender select field
   * @param e
   */
  const handleChangeSender = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const user = userList.find((user) => user.id.toString() == e.target.value);
    setSender(user == undefined ? nonSelectedUser : user);
    setErrors({
      ...errors,
      sender: user !== undefined ? null : FORM_INVALID_SENDER_MSG,
    });
    if (user != undefined && user.id !== receiver.id) setInvalidMsg("");
  };

  /**
   * This function reflects the receiver value with the user's input value in the receiver select field
   * @param e
   */
  const handleChangeReceiver = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const user = userList.find((user) => user.id.toString() == e.target.value);
    setReceiver(user == undefined ? nonSelectedUser : user);
    setErrors({
      ...errors,
      receiver: user !== undefined ? null : FORM_INVALID_RECEIVER_MSG,
    });
    if (user != undefined && user.id !== sender.id) setInvalidMsg("");
  };

  /**
   * This function reflects the amount value with the user's input value in the amount input field
   * @param e
   */
  const handleChangeAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setAmount(val);
    setErrors({ ...errors, amount: val > 0 ? null : FORM_INVALID_AMOUNT_MSG });
  };

  /**
   * This function reflects the currency value with the user's input value in the currency select field
   * @param e
   */
  const handleChangeCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrency(e.target.value as Currency);
  };

  /**
   * This function reflects the memo value with the user's input value in the memo input area field
   * @param e
   */
  const handleChangeMemo = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMemo(e.target.value);
  };

  /**
   * check the validation
   */
  const checkValidation = (): boolean => {
    let hasError = false;
    const errs = { ...errors };

    // check if sender was selected
    if (sender.id === 0) {
      errs.sender = FORM_INVALID_SENDER_MSG;
      hasError = true;
    }

    // check if receiver was selected
    if (sender.id === 0) {
      errs.receiver = FORM_INVALID_RECEIVER_MSG;
      hasError = true;
    }

    // check if sender and receiver are not the same
    if (
      errs.sender === null &&
      errs.receiver === null &&
      sender.id === receiver.id
    ) {
      setInvalidMsg(FORM_INVALID_SENDER_RECEIVER_MSG);
      hasError = true;
    }

    // check if amount is greater than zero
    if (amount <= 0) {
      errs.amount = FORM_INVALID_AMOUNT_MSG;
      hasError = true;
    }

    setErrors(errs);

    return !hasError;
  };

  /**
   * create a payment data with the data that the user filled
   */
  const createPaymentData = async () => {
    if (!checkValidation()) return;

    const paymentData: IPaymentData = {
      id: "",
      date: "",
      sender: sender,
      receiver: receiver,
      amount: amount.toFixed(2),
      currency: currency,
      memo: memo,
    };

    setIsCreating(true);
    const [statusCode, updatedData] = await postPaymentData(paymentData);
    if (statusCode == 201) {
      dispatch(addPaymentData(updatedData));
      handleClose();
    } else {
      setInvalidMsg(
        "An unknown error occurred. Please check your internet connection!"
      );
    }
    setIsCreating(false);
  };

  return (
    <>
      <Button variant="primary" className="mt-2 mb-2" onClick={handleShow}>
        Create a Payment Data
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create a Payment Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="sender">
              <Form.Label>Sender</Form.Label>
              <Form.Select
                value={sender.id}
                onChange={handleChangeSender}
                isInvalid={!!errors.sender}
              >
                <option value={0}>-- Select Sender --</option>
                {userList.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.sender}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="receiver">
              <Form.Label>Receiver</Form.Label>
              <Form.Select
                value={receiver.id}
                onChange={handleChangeReceiver}
                isInvalid={!!errors.receiver}
              >
                <option value={0}>-- Select Receiver --</option>
                {userList.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.receiver}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                isInvalid={!!errors.amount}
                type="number"
                value={amount}
                onChange={handleChangeAmount}
              />
              <Form.Control.Feedback type="invalid">
                {errors.amount}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="currency">
              <Form.Label>Currency</Form.Label>
              <Form.Select value={currency} onChange={handleChangeCurrency}>
                <option value={Currency.BTC}>{Currency.BTC}</option>
                <option value={Currency.EUR}>{Currency.EUR}</option>
                <option value={Currency.GBP}>{Currency.GBP}</option>
                <option value={Currency.JPY}>{Currency.JPY}</option>
                <option value={Currency.USD}>{Currency.USD}</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="memo">
              <Form.Label>Memo</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={memo}
                onChange={handleChangeMemo}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        {invalidMsg !== "" ? (
          <div className="w-100 text-center text-danger">
            <p>{invalidMsg}</p>
          </div>
        ) : (
          <></>
        )}

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleClose}
            disabled={isCreating}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={createPaymentData}
            disabled={isCreating}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PaymentDataFormModal;
