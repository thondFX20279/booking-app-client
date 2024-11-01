import React from "react";
import useFetch from "../../hooks/useFetch";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import "./Transactions.css";
const Transaction = () => {
  const { user } = useAuth();

  const { data: transactions } = useFetch(`/transactions/${user._id}`);
  const formatDate = (date) => {
    return date.split("T")[0].split("-").join("/");
  };
  return (
    <div>
      <Navbar />
      <Header type={"list"} />
      <div className="transactions">
        <h2>Your transaction</h2>
        <table className="table">
          <thead className="thead">
            <tr>
              <td>#</td>
              <td>Hotel</td>
              <td>Room</td>
              <td>Date</td>
              <td>Price</td>
              <td>Payment method</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody className="tbody">
            {transactions.length !== 0 &&
              transactions.map((tr, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{tr.hotel.name}</td>
                  <td>{tr.room.join(",")}</td>
                  <td>
                    {formatDate(tr.dateStart)}-{formatDate(tr.dateEnd)}
                  </td>
                  <td>{tr.price}</td>
                  <td>{tr.payment}</td>
                  <td>
                    <span className={`btn-tr ${tr.status}`}>{tr.status}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transaction;
