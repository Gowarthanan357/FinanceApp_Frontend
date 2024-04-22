import React, { useEffect, useState } from "react";
import { ApiService } from "../services/apiServices";
import fa, { user } from "fontawesome";
import { Link } from "react-router-dom";
import ExportToText from "./exportToText";
//import ExportToExcel from "./exportToExcel";
const Form = () => {
  const [search, setSearch] = useState();
  const [filtercat, setFiltercat] = useState();
  const [show, setShow] = useState(false);
  const [showcat, setShowcat] = useState(false);
  const [datefilter, setDatefilter] = useState("");
  const [showdate, setShowdate] = useState(false);
  const [startDate, setStartdate] = useState("");
  const [endDate, setEnddate] = useState("");
  let [state, setState] = useState({
    users: [],
    userList: {
      name: "",
      loannum: "",
      credit: "",
      debit: "",
      balance: "",
      date: "",
      duenum: "",
      category: "",
    },
    errorMessage: "",
  });

  /* const[name,SetName]=useState("");
  let updateNmae=(e)=>{
    SetName(e.target.value);
  } */

  let updateInput = (e) => {
    setState({
      ...state,
      userList: {
        ...state.userList,
        [e.target.name]: e.target.value,
      },
    });
  };

  const searchText = (e) => {
    setSearch(e.target.value);
    setShow(true);
    setShowcat(false);
    setShowdate(false);
  };

  const searchFiltercat = (e) => {
    setFiltercat(e.target.value);
    setShowcat(true);
    setShow(false);
    setShowdate(false);
    /*  if(filtercat=="empty"){
      setShowcat(false);
      setShow(false);
    setShowdate(false);
    } */
  };
  // console.log(filtercat);

  const searchStart = (e) => {
    setStartdate(e.target.value);
    //setStartdate(e);
    // console.log(e);
  };

  const searchEnd = (e) => {
    setEnddate(e.target.value);
    //console.log(e);
  };

  const handleExportClick = () => {
    const filteredData = users.filter(
      (item) => item.date >= startDate && item.date <= endDate
    );
    console.log(filteredData);
  };

  const searchDate = (e) => {
    setDatefilter(e.target.value);
    setShow(false);
    setShowcat(false);
    setShowdate(true);
  };
  //console.log(datefilter);
  //console.log(showdate);

  async function fetchData() {
    try {
      let res = await ApiService.getAllUsers();
      console.log(res.data);
      //setUsers(res.data);
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
  useEffect(() => {
    fetchData();
  }, []);
  let totalCredit=0;
  //totalCredit = state.users;
  

  for(let i=0;i<state.users.length;i++){
    totalCredit=state.users[i]?.credit + totalCredit
  }
  //console.log(totalCredit);

  

  const submitForm = async (e) => {
    
    e.preventDefault();
    let newBalance=state.userList.credit-state.userList.debit;
      console.log(newBalance)
    
    //console.log(state.userList);
    try {
      //CalculateBalance();
      
      let res = await ApiService.addUser(state.userList);
      console.log(res);
      if (res) {
        fetchData();
        window.location.reload();
      }
    } catch (e) {
      // setError(e.message);
      setState({
        ...state,
        errorMessage: e.message,
      });
    }
  };
  //console.log(userList);
  async function updateUser() {
    //console.log("hi");
    try {
    } catch (e) {
      setState({
        ...state,
        errorMessage: e.message,
      });
    }
  }
  const filterName = state.users.filter((user) =>
    user.name.toLowerCase().includes(search)
  );
  
  /* let totalfilterCredit=0;
  for(let i=0;i<filterName.length;i++){
       totalfilterCredit=totalfilterCredit+filterName[i]?.credit
       //console.log(filterName[i]?.credit + 200)
  }
  console.log(totalfilterCredit); */


  const filterCatogery = state.users.filter(
    (user) => user.category == filtercat
  );

  let totalfilterCategoryCredit=0;
  for(let i=0;i<filterCatogery.length;i++){
    totalfilterCategoryCredit=totalfilterCategoryCredit+filterCatogery[i]?.credit
    //console.log(filterName[i]?.credit + 200)
}
let totalfilterCategoryDebit=0;
  for(let i=0;i<filterCatogery.length;i++){
    totalfilterCategoryDebit=totalfilterCategoryDebit+filterCatogery[i]?.debit
    //console.log(filterName[i]?.credit + 200)
}
 console.log(totalfilterCategoryCredit);


  const filterDate = state.users.filter((user) => user.date == datefilter);
  let totalfilterDateCredit=0;
  for(let i=0;i<filterDate.length;i++){
    totalfilterDateCredit=totalfilterDateCredit+filterDate[i]?.credit
    //console.log(filterName[i]?.credit + 200)
}
let totalfilterDateDebit=0;
  for(let i=0;i<filterDate.length;i++){
    totalfilterDateDebit=totalfilterDateDebit+filterDate[i]?.debit
    //console.log(filterName[i]?.credit + 200)
}

  console.log(state.userList);

  console.log(filterCatogery);

  let[showAdd,setShowAdd]=useState(false)
  let CalculateBalance=(e)=>{

    e.preventDefault();
    const newBalance=state.userList.credit-state.userList.debit
    console.log(newBalance)
    setState({
      ...state,
      userList:{
        ...state.userList,
        balance: newBalance
      }
        
    })
    setShowAdd(true);
  }
  console.log(state.userList.balance)
  let { users, userList } = state;
  return (
    <React.Fragment>
      <div>
        <div className="container w-50 mt-2">
          <h3 className="text-center text-dark">Finance Management</h3>
          {/* <div className="text-center">
          <img className="image " src="../photo1.png"></img>
          </div> */}
          <h3 className="text-center mt-5">Add Customer's Details!!</h3>
          <div className="card mt-4 card1 ">
            <div className="card-body text-white">
              <form onSubmit={submitForm}>
                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="mb-2">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userList.name} //user input
                        name="name" //user input stored in name.
                        onChange={updateInput}
                        placeholder="Enter Name"
                      ></input>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="mb-2">LoanNum</label>
                      <input
                        type="number"
                        className="form-control"
                        value={userList.loannum}
                        name="loannum"
                        onChange={updateInput}
                        placeholder="Enter LoanNumber"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col">
                    <div className="mb-3">
                      <label className="mb-2">Credit</label>
                      <input
                        type="number"
                        className="form-control"
                        value={userList.credit}
                        name="credit"
                        onChange={updateInput}
                        placeholder="Enter Credit Amount"
                      ></input>
                    </div>
                  </div>
                  <div className="col">
                    <div className="mb-3">
                      <label className="mb-2">Debit</label>
                      <input
                        type="number"
                        className="form-control"
                        value={userList.debit}
                        name="debit"
                        onChange={updateInput}
                        placeholder="Enter Debit Amount"
                      ></input>
                    </div>
                  </div>
                </div>

                <div className="row">
                   <div className="col-6">
                <div className="mb-3">
                  <label className="mb-2">Due Number</label>
                  <input
                    type="number"
                    className="form-control"
                    value={userList.duenum}
                    name="duenum"
                    onChange={updateInput}
                  ></input>
                </div>
              </div>  
                  <div className="col">
                    <div className="mb-3">
                      <label className="mb-2">Date</label>
                      <input
                        type="date"
                        className="form-control"
                        value={userList.date}
                        name="date"
                        onChange={updateInput}
                        placeholder="Enter Date"
                      ></input>
                    </div>
                  </div>
                  


                <div className="row">
                <div className="col-6">
                    <div className="mb-2">
                      <label className="mb-2">Category</label>
                      <select
                        value={userList.category}
                        name="category"
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
                </div>
                  {showAdd && <div className="col-6">
                    <label className="mb-2">Balance</label>
                    <input
                      type="number"
                      className="form-control"
                      value={userList.balance}
                      name="balance"
                      onChange={updateInput}
                    ></input>
                  </div>
                  
                  
                  }
                  </div>
                  

                <div className="d-flex justify-content-end mt-2">
                  {showAdd ? <button className="btn btn-success" type="submit">AddUser</button> :
                  <button className="btn btn-success " onClick={CalculateBalance}>Calc Balance</button>
                  }
                  
                  
                </div>
                </div>
              </form>
            </div>
            
          </div>
        </div>

        {/* Table area */}
        <div style={{ margin: "10%", marginTop: "0%" }}>
          <h3 className="text-center mt-5">Customer's List!!</h3>
          <div className="card w-50 card2 ">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <label>Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={startDate}
                    onChange={searchStart}
                  ></input>
                </div>
                <div className="col">
                  <label>End Date</label>
                  <input
                    type="date"
                    className="form-control"
                    value={endDate}
                    onChange={searchEnd}
                  ></input>
                </div>
                <div className="col">
                  <ExportToText
                    data={users}
                    startDate={startDate}
                    endDate={endDate}
                  ></ExportToText>
                  {/*  <ExportToExcel data={users} startDate={startDate} endDate={endDate}></ExportToExcel>  */}
                </div>
              </div>
            </div>
          </div>
          <table className="table mt-3 table-primary table-striped table-bordered">
            <thead>
              <tr className="text-center">
                <th scope="col">ID </th>
                <th scope="col d-flex">
                  Name
                  <input
                    type="text"
                    className="form-control"
                    onChange={searchText}
                    value={search}
                  ></input>
                </th>
                <th scope="col">
                  Category
                  <select
                    value={filtercat}
                    name="category"
                    onChange={searchFiltercat}
                    className="form-control text-dark"
                    required
                  >
                    <option value="empty"> Select a Group</option>
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
                </th>
                <th scope="col">
                  Date
                  <input
                    type="date"
                    className="form-control"
                    onChange={searchDate}
                    value={datefilter}
                  ></input>
                </th>
                <th scope="col">LoanNumber</th>
                <th scope="col">Due Number</th>
                <th scope="col">Credit</th>
                <th scope="col">Debit</th>
                <th scope="col">Balance</th>
                <th scope="col">Update</th>
              </tr>
            </thead>
            <tbody>
              {show &&
                !showcat &&
                !showdate &&
                filterName.map((filterUser) => {
                  return (
                    <tr>
                      <td>{filterUser.id}</td>
                      <td>{filterUser.name}</td>
                      <td>{filterUser.category}</td>
                      <td>{filterUser.date}</td>
                      <td>{filterUser.loannum}</td>
                      <td>{filterUser.duenum}</td>
                      <td>{filterUser.credit}</td>
                      <td>{filterUser.debit}</td>
                      {/* <td>{filterUser.balance}</td>  */}
                      <td>{filterUser.credit - filterUser.debit}</td>
                      <td>
                        <Link
                          to={`/update/${filterUser.id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              {!show &&
                showcat &&
                !showdate &&
                filterCatogery.map((filterUser) => {
                  return (
                    <>
                    <tr>
                      <td>{filterUser.id}</td>
                      <td>{filterUser.name}</td>
                      <td>{filterUser.category}</td>
                      <td>{filterUser.date}</td>
                      <td>{filterUser.loannum}</td>
                      <td>{filterUser.duenum}</td>
                      <td>{filterUser.credit}</td>
                      <td>{filterUser.debit}</td>
                      <td>{filterUser.balance}</td> 
                      {/* <td>{filterUser.credit - filterUser.debit}</td> */}
                      
                        
                    
                      
                      <td>
                        <Link
                          to={`/update/${filterUser.id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                      </td>
                    </tr>
                    
                    

                    </>

                    
                    
                  );
                })}
                
              {!show &&
                !showcat &&
                showdate &&
                filterDate.map((filterUser) => {
                  return (
                    <tr>
                      <td>{filterUser.id}</td>
                      <td>{filterUser.name}</td>
                      <td>{filterUser.category}</td>
                      <td>{filterUser.date}</td>
                      <td>{filterUser.loannum}</td>
                      <td>{filterUser.duenum}</td>
                      <td>{filterUser.credit}</td>
                      <td>{filterUser.debit}</td>
                       <td>{filterUser.balance}</td> 
                      {/* <td>{filterUser.credit - filterUser.debit}</td> */}
                      <td>
                        <Link
                          to={`/update/${filterUser.id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              {!show &&
                !showcat &&
                !showdate &&
                users.map((user) => {
                  return (
                    <tr className="text-center">
                      <td>{user.id}</td>
                      <td>{user.name}</td>
                      <td>{user.category}</td>
                      <td>{user.date}</td>
                      <td>{user.loannum}</td>
                      <td>{user.duenum}</td>
                      <td>{user.credit}</td>
                      <td>{user.debit}</td>
                      <td>{user.balance}</td>
                      {/* <td>{user.credit - user.debit}</td> */}

                      <td>
                        <Link
                          to={`/update/${user.id}`}
                          className="btn btn-dark"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          
          { !show &&
                showcat &&
                !showdate && <div className="p4 text-dark fw-bold">
            <label>Total Credit: {totalfilterCategoryCredit}</label>
          </div> }
          { !show &&
                !showcat &&
                showdate && <div className="p4 text-dark fw-bold">
            <label>Total Credit: {totalfilterDateCredit}</label>
          </div> }
          { !show &&
                showcat &&
                !showdate && <div className="p4 text-dark fw-bold">
            <label>Total Debit: {totalfilterCategoryDebit}</label>
          </div> }
          { !show &&
                !showcat &&
                showdate && <div className="p4 text-dark fw-bold">
            <label>Total Debit: {totalfilterDateDebit}</label>
          </div> }
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
