import PaymentDataList from "../components/paymentDataList";
import PaymentDataFormModal from "../components/paymentDataFormModal";
import React, { useEffect, useState } from "react";
import { fetchUserList } from "../api";
import { IUser } from "../type";
const Dashboard: React.FC = () => {
  const [userList, setUserList] = useState<IUser[]>([]);

  useEffect(() => {
    fetchUserList().then((response) => {
      setUserList(response);
    });
  }, []);

  return (
    <div className="payment-data-list">
      <div className="d-flex justify-content-around mb-2">
        <h1>Payment Data List</h1>
        <PaymentDataFormModal userList={userList} />
      </div>
      <PaymentDataList />
    </div>
  );
};

export default Dashboard;
