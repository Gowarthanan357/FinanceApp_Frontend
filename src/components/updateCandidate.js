import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ApiService } from "../services/apiServices";
import { user } from "fontawesome";
let UpdateCandidate = () => {
  let { userId } = useParams();
  let navigate = useNavigate();
  let [state, setState] = useState({
    users: {
      name: "",
      loannum: "",
      credit: "",
      debit: "",
      balance: "",
      date: "",
      duenum: "",
      category: "",
    },
    show: false,
    errorMessage: "",
  });
  let updateInput = (e) => {
    setState({
      ...state,
      users: {
        ...state.users,
        [e.target.name]: e.target.value,
      },
    });
  };
  async function getUser(userId) {
    try {
      let res = await ApiService.GetUser(userId);
      setState({
        ...state,
        users: res.data,
      });
    } catch (e) {
      setState({
        ...state,
        errorMessage: e.message,
      });
    }
  }

  let submitForm = async (e) => {
    e.preventDefault();
    console.log(state.users);
    try {
      let res = await ApiService.update(state.users, userId);
      if (res) {
        navigate("/", { replace: true });
      }
    } catch (e) {
      setState({
        ...state,
        errorMessage: e.message,
      });
    }
  };
  useEffect(() => {
    getUser(userId);
  }, [userId]);

  let { users } = state;
 console.log(users);
  return (
    <div className="container w-25 mt-2">
      <h3 className="text-center">Update User Details</h3>
      <div className="card mt-4 bg-dark">
        <div className="card-body text-white">
          <form onSubmit={submitForm}>
            <div className="mb-3">
              <label className="mb-2">Name</label>
              <input
                type="text"
                className="form-control"
                value={users.name}
                name="name"
                onChange={updateInput}
              ></input>
            </div>
            <div className="mb-3">
              <label className="mb-2">LoanNum</label>
              <input
                type="text"
                className="form-control"
                value={users.loannum}
                name="loannum"
                onChange={updateInput}
              ></input>
            </div>
            <div className="mb-3">
              <label className="mb-2">Credit</label>
              <input
                type="text"
                className="form-control"
                value={users.credit}
                name="credit"
                onChange={updateInput}
              ></input>
            </div>
            <div className="mb-3">
              <label className="mb-2">Debit</label>
              <input
                type="text"
                className="form-control"
                value={users.debit}
                name="debit"
                onChange={updateInput}
              ></input>
            </div>

           {/*  <div className="mb-3">
              <label className="mb-2">Balance</label>
              <input
                type="text"
                className="form-control"
                value={users.balance}
                name="balance"
                onChange={updateInput}
              ></input>
            </div> */}

            <div className="mb-3">
              <label className="mb-2">Date</label>
              <input
                type="date"
                className="form-control"
                value={users.date}
                name="date"
                onChange={updateInput}
              ></input>
            </div>

            <div className="mb-3">
            <label className="mb-2">Category</label>
                  <select
                    value={users.category}
                    name="name"
                    onChange={updateInput}
                    className="form-control text-dark"
                    required
                  >
              
                    <option value=""> Select a Group</option>
                    <option value="AX"> AX</option>
                    <option value="AV"> AV</option>
                    <option value="CINV"> CINV</option>
                    <option value="EXP"> EXP</option>
                    <option value="INT"> INT</option>
                    <option value="MD"> MD</option>
                    <option value="ML"> ML</option>
                    <option value="WD"> WD</option>
                    <option value="WL"> WL</option>

                  </select>
              </div>
              
              

            <div className="mb-3">
              <label className="mb-2">Due Number</label>
              <input
                type="number"
                className="form-control"
                value={users.duenum}
                name="duenum"
                onChange={updateInput}
              ></input>
            </div>

            <div className="text-center">
              <button className="btn btn-success btn-sm ">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateCandidate;
