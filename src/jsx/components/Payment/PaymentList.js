import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import CommonUtils from "../../../utils/CommonUtils";
import { loadingToggleAction } from "../../../store/actions/AuthActions";

import PaymentService from "../../../services/api/payment/PaymentService";

const PaymentList = (props) => {
  const dispatch = useDispatch();

  //useState For Search
  const [search, setSearch] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  //useState For Render
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);

  //Search Function
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setPayments(search);
    } else {
      const filterResult = search.filter((item) =>
        item.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setPayments(filterResult);
    }
    setFilterValue(e.target.value);
  };

  //Export Data To Excel
  let handleOnClickExport = async () => {
    const response = await PaymentService.getPayments();
    if (response != null) {
      await CommonUtils.exportExcel(
        response.data,
        "Payment",
        "PaymentList.xlsx"
      );
    }
  };

  //Fetch Data Api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(loadingToggleAction(true));
      try {
        const response = await PaymentService.getPayments();
        setPayments(response.data);
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
  let paggination = Array(Math.ceil(payments.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
    payments.slice(activePag.current * sort, (activePag.current + 1) * sort)
  );

  const onClick = (i) => {
    activePag.current = i;
    jobData.current = payments.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };

  useEffect(() => {
    jobData.current = payments.slice(
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
        <button
          className="btn btn-primary mb-xxl-0 mb-4 "
          onClick={() => handleOnClickExport()}
        >
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
                    <th style={{ width: 73 }}>Price</th>
                    <th style={{ width: 73 }}>Method</th>
                    <th style={{ width: 73 }}>Fail-Reason</th>
                    <th style={{ width: 73 }}>Status</th>
                    <th className="bg-none" style={{ width: 47 }}></th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {jobData.current.map((payment, i) => {
                      return (
                        <tr role="row" className="odd" key={i}>
                          <td>{payment.booking.course.name}</td>
                          <td>{payment.booking.course.mentor.fullName}</td>
                          <td>{payment.totalPrice}</td>
                          <td>
                            <span className="text-dark font-w600">
                              {payment.paymentType}
                            </span>
                          </td>
                          <td>{payment.failReason.substr(0, 3)}</td>
                          <td>
                            {payment.status === "Completed" ? (
                              <span className="badge light badge-success">
                                <i className="fa fa-circle text-success me-1" />
                                Completed
                              </span>
                            ) : payment.status === "Canceled" ? (
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
                  {payments.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : payments.length}{" "}
                  of {payments.length} entries
                </div>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="example5_paginate"
                >
                  <Link
                    className="paginate_button previous disabled"
                    to="/payment"
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
                        to="/payment"
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
                    to="/payment"
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
export default connect(mapStateToProps)(PaymentList);
