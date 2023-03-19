import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { DropdownBlog } from "../../CourseList";

import pic11 from "../../../../../images/hotel/pic11.jpg";

const Pending = () => {
  const [data, setData] = useState(
    document.querySelectorAll("#room_wrapper tbody tr")
  );
  const sort = 10;
  const activePag = useRef(0);
  const [test, settest] = useState(0);

  // Active data
  const chageData = (frist, sec) => {
    for (var i = 0; i < data.length; ++i) {
      if (i >= frist && i < sec) {
        data[i].classList.remove("d-none");
      } else {
        data[i].classList.add("d-none");
      }
    }
  };
  // use effect
  useEffect(() => {
    setData(document.querySelectorAll("#room_wrapper tbody tr"));
    //chackboxFun();
  }, [test]);

  // Active pagginarion
  activePag.current === 0 && chageData(0, sort);
  // paggination
  let paggination = Array(Math.ceil(data.length / sort))
    .fill()
    .map((_, i) => i + 1);

  // Active paggination & chage data
  const onClick = (i) => {
    activePag.current = i;
    chageData(activePag.current * sort, (activePag.current + 1) * sort);
    settest(i);
  };

  const chackbox = document.querySelectorAll(".sorting_7 input");
  const motherChackBox = document.querySelector(".sorting_asc_7 input");
  // console.log(document.querySelectorAll(".sorting_1 input")[0].checked);
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };
  return (
    <>
      <div className="table-responsive">
        <div id="" className="dataTables_wrapper no-footer">
          <table className="table card-table display mb-4 dataTablesCard booking-table room-list-tbl dataTable no-footer">
            <thead>
              <tr role="row">
                <th className="sorting_asc_7 bg-none">
                  <div className="form-check  style-1">
                    <input
                      type="checkbox"
                      onClick={() => chackboxFun("all")}
                      className="form-check-input"
                      id="checkAll"
                      required=""
                    />
                  </div>
                </th>
                <th>Room Name</th>
                <th>Bed Type</th>
                <th>Room Floor</th>
                <th>Room Facility</th>
                <th>Status</th>
                <th className="bg-none"></th>
              </tr>
            </thead>
            <tbody>
              <tr role="row" className="odd">
                <td className="sorting_7">
                  <div className="form-check   style-1">
                    <input
                      type="checkbox"
                      onClick={() => chackboxFun()}
                      className="form-check-input"
                      id="customCheckBox21"
                      required=""
                    />
                  </div>
                </td>
                <td>
                  <div className="guest-bx">
                    <div
                      id="carouselExampleControls"
                      className="carousel slide me-3"
                    >
                      <div className="carousel-inner">
                        <img src={pic11} className="d-block w-100" alt="..." />
                      </div>
                    </div>
                    <div>
                      <span className="text-primary">#0002</span>
                      <h4 className="mb-0 mt-1">
                        <Link className="text-black" to={"./guest-detail"}>
                          Deluxe B-0004
                        </Link>
                      </h4>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">Single Bed</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">Floor G-05</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">
                      AC, Shower, Double Bed, Towel, Bathup,
                      <br /> Coffee Set, LED TV, Wifi
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="text-danger d-block">Booked</span>
                    <span className="fs-14">Oct 24th - 26th</span>
                  </div>
                </td>
                <td>
                  <DropdownBlog />
                </td>
              </tr>
              <tr className="even">
                <td className="sorting_7">
                  <div className="form-check   style-1">
                    <input
                      type="checkbox"
                      onClick={() => chackboxFun()}
                      className="form-check-input"
                      id="customCheckBox22"
                      required=""
                    />
                  </div>
                </td>
                <td>
                  <div className="guest-bx">
                    <div
                      id="carouselExampleControls"
                      className="carousel slide me-3"
                    >
                      <div className="carousel-inner">
                        <img src={pic11} className="d-block w-100" alt="..." />
                      </div>
                    </div>
                    <div>
                      <span className="text-primary">#0002</span>
                      <h4 className="mb-0 mt-1">
                        <Link className="text-black" to={"./guest-detail"}>
                          Deluxe B-0004
                        </Link>
                      </h4>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">Double Bed</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">Floor G-05</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">
                      AC, Shower, Double Bed, Towel, Bathup,
                      <br /> Coffee Set, LED TV, Wifi
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="text-danger d-block">Booked</span>
                    <span className="fs-14 ">Oct 24th - 26th</span>
                  </div>
                </td>
                <td>
                  <DropdownBlog />
                </td>
              </tr>
              <tr className="odd">
                <td className="sorting_7">
                  <div className="form-check  style-1">
                    <input
                      type="checkbox"
                      onClick={() => chackboxFun()}
                      className="form-check-input"
                      id="customCheckBox23"
                      required=""
                    />
                  </div>
                </td>
                <td>
                  <div className="guest-bx">
                    <div
                      id="carouselExampleControls"
                      className="carousel slide me-3"
                    >
                      <div className="carousel-inner">
                        <img src={pic11} className="d-block w-100" alt="..." />
                      </div>
                    </div>
                    <div>
                      <span className="text-primary">#0002</span>
                      <h4 className="mb-0 mt-1">
                        <Link className="text-black" to={"./guest-detail"}>
                          Deluxe B-0004
                        </Link>
                      </h4>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">Double Bed</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">Floor G-05</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">
                      AC, Shower, Double Bed, Towel, Bathup,
                      <br /> Coffee Set, LED TV, Wifi
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="text-danger d-block">Booked</span>
                    <span className="fs-14 ">Oct 24th - 26th</span>
                  </div>
                </td>
                <td>
                  <DropdownBlog />
                </td>
              </tr>
              <tr className="even">
                <td className="sorting_7">
                  <div className="form-check  style-1">
                    <input
                      type="checkbox"
                      onClick={() => chackboxFun()}
                      className="form-check-input"
                      id="customCheckBox24"
                      required=""
                    />
                  </div>
                </td>
                <td>
                  <div className="guest-bx">
                    <div
                      id="carouselExampleControls"
                      className="carousel slide me-3"
                    >
                      <div className="carousel-inner">
                        <img src={pic11} className="d-block w-100" alt="..." />
                      </div>
                    </div>
                    <div>
                      <span className="text-primary">#0002</span>
                      <h4 className="mb-0 mt-1">
                        <Link className="text-black" to={"./guest-detail"}>
                          Deluxe B-0004
                        </Link>
                      </h4>
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">Double Bed</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">Floor G-05</span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="fs-16">
                      AC, Shower, Double Bed, Towel, Bathup,
                      <br /> Coffee Set, LED TV, Wifi
                    </span>
                  </div>
                </td>
                <td>
                  <div>
                    <span className="text-danger d-block">Booked</span>
                    <span className="fs-14 ">Oct 24th - 26th</span>
                  </div>
                </td>
                <td>
                  <DropdownBlog />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="d-sm-flex text-center justify-content-between align-items-center mt-3">
            <div className="dataTables_info">
              Showing {activePag.current * sort + 1} to{" "}
              {data.length > (activePag.current + 1) * sort
                ? (activePag.current + 1) * sort
                : data.length}{" "}
              of {data.length} entries
            </div>
            <div
              className="dataTables_paginate paging_simple_numbers mb-0"
              id="example2_paginate"
            >
              <Link
                className="paginate_button previous disabled"
                to="/guest-list"
                onClick={() =>
                  activePag.current > 0 && onClick(activePag.current - 1)
                }
              >
                <i className="fa fa-angle-double-left"></i> Previous
              </Link>
              <span>
                {paggination.map((number, i) => (
                  <Link
                    key={i}
                    to="/guest-list"
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
                to="/guest-list"
                onClick={() =>
                  activePag.current + 1 < paggination.length &&
                  onClick(activePag.current + 1)
                }
              >
                Next <i className="fa fa-angle-double-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pending;
