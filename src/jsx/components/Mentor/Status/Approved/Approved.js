import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

//import { DropdownBlog } from "../../MentorList";

const Approved = ({ mentorList, mentorss }) => {
  const sort = 5;
  let paggination = Array(Math.ceil(mentorss.length / sort))
    .fill()
    .map((_, i) => i + 1);

  const activePag = useRef(0);
  const jobData = useRef(
    mentorss.slice(activePag.current * sort, (activePag.current + 1) * sort)
  );

  const onClick = (i) => {
    activePag.current = i;
    jobData.current = mentorss.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  };

  useEffect(() => {
    jobData.current = mentorss.slice(
      activePag.current * sort,
      (activePag.current + 1) * sort
    );
  });

  const mentorLists = mentorList.current.filter(
    (mentor) => mentor.approveStatusId === 3
  );

  return (
    <>
      <div className="table-responsive">
        <div id="example2_wrapper" className="dataTables_wrapper no-footer">
          <table
            id="example2"
            className="table card-table default-table display mb-4 dataTablesCard dataTable no-footer"
          >
            <thead>
              <tr role="row">
                <th>Full Name</th>
                <th>Job</th>
                <th>Address</th>
                <th>Qualification</th>
                <th>Gender</th>
                <th>Contact</th>
                <th>Status</th>
                <th className="bg-none"></th>
              </tr>
            </thead>

            <tbody>
              {mentorLists.map((mentor) => {
                return (
                  <tr role="row" className="odd" key={mentor.id}>
                    <td>
                      <div className="media-bx">
                        <img
                          className="me-3 rounded"
                          src={mentor.image}
                          alt=""
                        />
                        <div>
                          <h4 className="mb-0 mt-1">
                            <Link
                              to={`./${mentor.id}-mentor-detail`}
                              className="text-black"
                            >
                              {mentor.fullName}
                            </Link>
                          </h4>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h5>{mentor.job}</h5>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h5 className="font-w600">{mentor.address}</h5>
                        <span>{mentor.country}</span>
                      </div>
                    </td>
                    <td>
                      <div>
                        <h5>{mentor.qualification}</h5>
                      </div>
                    </td>
                    <td>
                      <h5>{mentor.gender}</h5>
                    </td>
                    <td>
                      <div className="text-nowrap">
                        <span className="text-black font-w500">
                          <i className="fas fa-phone-volume me-2 text-primary"></i>
                          {mentor.phone}
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={
                          mentor.approveStatusId === 1
                            ? "text-warning font-w600"
                            : mentor.approveStatusId === 3
                            ? "text-success font-w600"
                            : mentor.approveStatusId === 4
                            ? "text-danger font-w600"
                            : "text-muted font-w600"
                        }
                      >
                        {mentor.approveStatusId === 3 ? "APPROVED" : ""}
                      </span>
                    </td>
                    {/* <td>
                        <Dropdown className="dropdown">
                          <Dropdown.Toggle
                            as="div"
                            className="btn-link i-false"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            <svg
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M11 12C11 12.5523 11.4477 13 12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12Z"
                                stroke="#262626"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M18 12C18 12.5523 18.4477 13 19 13C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11C18.4477 11 18 11.4477 18 12Z"
                                stroke="#262626"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M4 12C4 12.5523 4.44772 13 5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12Z"
                                stroke="#262626"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="dropdown-menu">
                            <Dropdown.Item
                              className="dropdown-item"
                              onClick={(e, id) => editMentor(e, mentor.id)}
                            >
                              Edit
                            </Dropdown.Item>
                            <Dropdown.Item className="dropdown-item">
                                        Delete
                                      </Dropdown.Item>
                          </Dropdown.Menu>
                        </Dropdown>
                      </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
            <div className="dataTables_info">
              Showing {activePag.current * sort + 1} to{" "}
              {mentorss.length > (activePag.current + 1) * sort
                ? (activePag.current + 1) * sort
                : mentorss.length}{" "}
              of {mentorss.length} entries
            </div>
            <div
              className="dataTables_paginate paging_simple_numbers"
              id="example2_paginate"
            >
              <Link
                className="paginate_button previous disabled"
                to="/mentor"
                onClick={() =>
                  activePag.current > 0 && onClick(activePag.current - 1)
                }
              >
                <i className="fa fa-angle-double-left" aria-hidden="true"></i>
              </Link>
              <span>
                {paggination.map((number, i) => (
                  <Link
                    key={i}
                    to="/mentor"
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
                to="/mentor"
                onClick={() =>
                  activePag.current + 1 < paggination.length &&
                  onClick(activePag.current + 1)
                }
              >
                <i className="fa fa-angle-double-right" aria-hidden="true"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Approved;
