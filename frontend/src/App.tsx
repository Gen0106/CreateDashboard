import React, { useEffect } from "react";
import { addPaymentData } from "./store/actionCreator";
import { AppDispatch } from "./store";
import { useDispatch } from "react-redux";
import { fetchPaymentData } from "./api";
import { IPaymentData } from "./type";
import Dashboard from "./pages/dashboard";
import "./App.css";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const interval = setInterval(async () => {
    const data: IPaymentData = await fetchPaymentData();
    dispatch(addPaymentData(data));
  }, 500);

  useEffect(() => {
    return () => {
      console.log("cleaned up");
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      <Dashboard />
    </div>
  );
};

export default App;
