import React, { useState, useRef, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Dropdown, Tab, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../loader";
import { loadingToggleAction } from "../../../store/actions/AuthActions";

///Import
import Approved from "./Status/Approved/Approved";
import Pending from "./Status/Pending/Pending";
import Reject from "./Status/Reject/Reject";

import MentorService from "../../../services/api/mentor/MentorService";
import CourseService from "../../../services/api/course/CourseService";
import BookingService from "../../../services/api/booking/BookingService";

const MentorBookingList = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id } = useParams();

  //useState For Search
  const [search, setSearch] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  //useState For Render
  const [loading, setLoading] = useState(true);
  const [mentors, setMentors] = useState([]);

  //Search Function
  const handleFilter = (e) => {
    if (e.target.value === "") {
      setMentors(search);
    } else {
      const filterResult = search.filter((item) =>
        item.course.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setMentors(filterResult);
    }
    setFilterValue(e.target.value);
  };

  //Fetch Data Api
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      dispatch(loadingToggleAction(true));
      try {
        const response = await BookingService.getBookingMentorId(id);
        setMentors(response.data);
        setSearch(response.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      dispatch(loadingToggleAction(false));
    };
    fetchData();
  }, []);

  const editCourse = (e, id) => {
    e.preventDefault();
    history.push(`./${id}-course-edit`);
  };

  const sort = 5;
  let paggination = Array(Math.ceil(mentors.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
    mentors.slice(activePag.current * sort, (activePag.current + 1) * sort)
  );

  const onClick = (i) => {
    activePag.current = i;
    jobData.current = mentors.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };

  useEffect(() => {
    jobData.current = mentors.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  });

  return (
    <>
      {props.showLoading && <Loader />}
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
      <div className="card">
        <div className="card-body">
          <div className="w-100 table-responsive">
            <div id="example_wrapper" className="dataTables_wrapper">
              <table id="example" className="display w-100 dataTable">
                <thead>
                  {/* <tr role="row">
                    {data.profileTable.columns.map((d, i) => (
                      <th key={i}>{d}</th>
                    ))}
                  </tr> */}
                  <tr role="row">
                    <th>Course</th>
                    <th>Student</th>
                    <th>Price</th>
                    <th>Book Date</th>
                    <th>Status</th>
                    <th className="bg-none"></th>
                  </tr>
                </thead>
                {!loading && (
                  <tbody>
                    {jobData.current.map((booking, i) => {
                      return (
                        <tr key={i}>
                          <td>
                            <h4>{booking.course.name}</h4>
                          </td>

                          <td>
                            <span className="text-dark font-w600">
                              {booking.mentee.fullName}
                            </span>
                          </td>
                          <td>{booking.coursePrice}</td>

                          <td>
                            <div>
                              <h5>
                                {new Date(
                                  booking.bookingTime
                                ).toLocaleDateString()}
                              </h5>
                              <span className="fs-14">
                                {new Date(
                                  booking.bookingTime
                                ).toLocaleTimeString()}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span
                              className={
                                booking.status === "Complete"
                                  ? "badge badge-success"
                                  : booking.status === "Pending"
                                  ? "badge badge-warning"
                                  : "badge badge-danger"
                              }
                            >
                              {booking.status}
                            </span>
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
                                <Dropdown.Item>View Booking</Dropdown.Item>
                                <Dropdown.Item>Edit Booking</Dropdown.Item>
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
                  {mentors.length > (activePag.current + 1) * sort
                    ? (activePag.current + 1) * sort
                    : mentors.length}{" "}
                  of {mentors.length} entries
                </div>
                <div
                  className="dataTables_paginate paging_simple_numbers"
                  id="example5_paginate"
                >
                  <Link
                    className="paginate_button previous disabled"
                    to={`${id}-tutor-booking`}
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
                        to={`${id}-tutor-booking`}
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
                    to={`${id}-tutor-booking`}
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
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(MentorBookingList);
