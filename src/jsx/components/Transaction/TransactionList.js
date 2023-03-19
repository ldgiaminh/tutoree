import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";
import CommonUtils from '../../../utils/CommonUtils'
import TransactionService from "../../../services/api/transaction/TransactionService";

const TransactionList = (props) => {
  const dispatch = useDispatch();

  //useState For Search
  const [search, setSearch] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  //useState For Render
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  //Search Function
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setTransactions(search);
    } else {
      const filterResult = search.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setTransactions(filterResult);
    }
    setFilterValue(e.target.value);
  };

  //Export Data To Excel
  let handleOnClickExport = async () => {
    const response = await TransactionService.getTransactions();
    if(response != null){
      await CommonUtils.exportExcel(response.data,"Transaction","TransactionList.xlsx");
    }
  }

  //Fetch Data Api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(loadingToggleAction(true));
      try {
        const response = await TransactionService.getTransactions();
        console.log(response);
        setTransactions(response.data);
        setSearch(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      dispatch(loadingToggleAction(false));
    };
    fetchData();
  }, []);

  const sort = 5;
  let paggination = Array(Math.ceil(transactions.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
    transactions.slice(activePag.current * sort, (activePag.current + 1) * sort)
  );

  const onClick = (i) => {
    activePag.current = i;
    jobData.current = transactions.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };

  useEffect(() => {
    jobData.current = transactions.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  });
  return (
    <div className="col-12">
      {props.showLoading && <Loader />}
      <div className="d-flex mb-4 justify-content-between align-items-center flex-wrap">
        <div className="table-search">
          <div className="input-group search-area mb-xxl-0 mb-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search here"
              value={filterValue}
              onInput={(e) => handleFilter(e)}
            />
            <span className="input-group-text">
              <i className="flaticon-381-search-2"></i>
            </span>
          </div>
        </div>
        {/* <Link to={"#"} className="btn btn-primary mb-xxl-0 mb-4 ">
          <i className="far fa-file-word me-2"></i>Generate Report
        </Link> */}
        <button className="btn btn-primary mb-xxl-0 mb-4 " onClick={() => handleOnClickExport()}>
          <i className="far fa-file-word me-2"></i>Generate Report
        </button>
      </div>
      <div className="card">
        <div className="card-body">
          <div className="w-100 table-responsive">
            <div id="patientTable_basic_table" className="dataTables_wrapper">
              <table
                id="example5"
                className="display dataTable no-footer w-100"
                style={{ minWidth: 845 }}
                role="grid"
                aria-describedby="example5_info"
              >
                <thead>
                  <tr role="row">
                    <th style={{ width: 73 }}>Course</th>
                    <th style={{ width: 73 }}>Mentor</th>
                    <th style={{ width: 73 }}>Create-Time</th>
                    <th style={{ width: 73 }}>Update-Time</th>
                    <th style={{ width: 73 }}>PayID</th>
                    <th style={{ width: 73 }}>Amount</th>
                    <th style={{ width: 73 }}>Description</th>
                    <th style={{ width: 73 }}>Status</th>
                    <th className="bg-none" style={{ width: 47 }}></th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {jobData.current.map((transaction, i) => {
                      return (
                        <tr role="row" className="odd" key={i}>
                          <td>{transaction.payment.booking.course.name}</td>
                          <td>{transaction.payment.booking.course.mentor.fullName}</td>
                          <td>
                            <div>
                              <h5>
                                {new Date(
                                  transaction.createdTime
                                ).toLocaleDateString()}
                              </h5>
                              <span className="fs-14">
                                {new Date(
                                  transaction.createdTime
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <h5>
                                {new Date(
                                  transaction.updatedTime
                                ).toLocaleDateString()}
                              </h5>
                              <span className="fs-14">
                                {new Date(
                                  transaction.updatedTime
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          </td>
                          <td>{transaction.paymentId}</td>

                          <td>{transaction.amount}</td>
                          <td>{transaction.description.substr(0, 3)}</td>
                          <td>
                            {transaction.status === "Completed" ? (
                              <span className="badge light badge-success">
                                <i className="fa fa-circle text-success me-1" />
                                Completed
                              </span>
                            ) : transaction.status === "Canceled" ? (
                              <span className="badge light badge-warning">
                                <i className="fa fa-circle text-warning me-1" />
                                Pending
                              </span>
                            ) : (
                              <span className="badge light badge-danger">
                                <i className="fa fa-circle text-danger me-1" />
                                Canceled
                              </span>
                            )}
                          </td>
                          <td>
                            <Dropdown className="dropdown ms-auto text-right">
                              <Dropdown.Toggle
                                variant=""
                                className="btn-link i-false"
                                data-toggle="dropdown"
                              >
                                <svg
                                  width="24px"
                                  height="24px"
                                  viewBox="0 0 24 24"
                                  version="1.1"
                                >
                                  <g
                                    stroke="none"
                                    strokeWidth={1}
                                    fill="none"
                                    fillRule="evenodd"
                                  >
                                    <rect x={0} y={0} width={24} height={24} />
                                    <circle
                                      fill="#000000"
                                      cx={5}
                                      cy={12}
                                      r={2}
                                    />
                                    <circle
                                      fill="#000000"
                                      cx={12}
                                      cy={12}
                                      r={2}
                                    />
                                    <circle
                                      fill="#000000"
                                      cx={19}
                                      cy={12}
                                      r={2}
                                    />
                                  </g>
                                </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu dropdown-menu-right">
                                <Dropdown.Item>Accept Patient</Dropdown.Item>
                                <Dropdown.Item>Reject Order</Dropdown.Item>
                                <Dropdown.Item>View Details</Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>

              <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
                <div className="dataTables_info">
                  Showing {activePag.current * sort + 1} to{" "}
                  {transactions.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : transactions.length}{" "}
                  of {transactions.length} entries
                </div>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="example5_paginate"
                >
                  <Link
                    className="paginate_button previous disabled"
                    to="/transaction"
                    onClick={() =>
                      activePag.current > 0 && onClick(activePag.current - 1)
                    }
                  >
                    <i
                      className="fa fa-angle-double-left"
                      aria-hidden="true"
                    ></i>
                  </Link>
                  <span>
                    {paggination.map((number, i) => (
                      <Link
                        key={i}
                        to="/transaction"
                        className={`paginate_button  ${
                          activePag.current === i ? "current" : ""
                        } `}
                        onClick={() => onClick(i)}
                      >
                        {number}
                      </Link>
                    ))}
                  </span>
                  <Link
                    className="paginate_button next"
                    to="/transaction"
                    onClick={() =>
                      activePag.current + 1 < paggination.length &&
                      onClick(activePag.current + 1)
                    }
                  >
                    <i
                      className="fa fa-angle-double-right"
                      aria-hidden="true"
                    ></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(TransactionList);
