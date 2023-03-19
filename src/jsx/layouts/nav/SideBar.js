/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import useScrollPosition from "use-scroll-position";
import { ThemeContext } from "../../../context/ThemeContext";

/// Image
//import profile from "../../../images/profile/pic1.jpg";
//import plus from "../../../images/plus.png";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);
  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);

    //sidebar icon Heart blast
    var handleheartBlast = document.querySelector(".heart");
    function heartBlast() {
      return handleheartBlast.classList.toggle("heart-blast");
    }
    handleheartBlast.addEventListener("click", heartBlast);
  }, []);
  let scrollPosition = useScrollPosition();
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "",
      "dashboard-dark",
      "guest-list",
      "guest-detail",
      "concierge",
      "room-list",
      "reviews",
      "task",
    ],
    //Course
    course = [
      "course",
      ":id-course-detail",
      "create-course",
      ":id-course-edit",
    ],
    //Booking
    booking = ["booking"],
    //Payment
    payment = ["payment"],
    //Transaction
    transaction = ["transaction"],
    //Major
    major = ["major", "create-major"],
    //Subject
    subject = ["subject", "create-subject"],
    //Mentor
    mentor = ["tutor", ":id-mentor-detail", ":id-mentor-edit"],
    //Mentee
    mentee = ["student", ":id-mentee-detail", ":id-mentee-edit"];

  return (
    <div
      className={`deznav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
          ? scrollPosition > 120
            ? "fixed"
            : ""
          : ""
      }`}
    >
      <PerfectScrollbar className="deznav-scroll">
        <MM className="metismenu" id="menu">
          <li className={`${booking.includes(path) ? "mm-active" : ""}`}>
            <Link to="booking" className="ai-icon">
              <i className="flaticon-381-note"></i>
              <span className="nav-text">Booking</span>
            </Link>
          </li>
          <li className={`${course.includes(path) ? "mm-active" : ""}`}>
            <Link to="course" className="ai-icon">
              <i className="flaticon-381-tab"></i>
              <span className="nav-text">Course</span>
            </Link>
          </li>
          <li className={`${mentor.includes(path) ? "mm-active" : ""}`}>
            <Link to="tutor" className="ai-icon">
              <i className="flaticon-381-id-card-4"></i>
              <span className="nav-text">Tutor</span>
            </Link>
          </li>
          <li className={`${mentee.includes(path) ? "mm-active" : ""}`}>
            <Link to="student" className="ai-icon">
              <i className="flaticon-381-user-7"></i>
              <span className="nav-text">Student</span>
            </Link>
          </li>
          <li className={`${major.includes(path) ? "mm-active" : ""}`}>
            <Link to="major" className="ai-icon">
              <i className="flaticon-381-notification"></i>
              <span className="nav-text">Major</span>
            </Link>
          </li>
          <li className={`${subject.includes(path) ? "mm-active" : ""}`}>
            <Link to="subject" className="ai-icon">
              <i className="flaticon-381-menu"></i>
              <span className="nav-text">Subject</span>
            </Link>
          </li>
        </MM>
        <div className="copyright">
          <p>
            <strong>Tutoree</strong> © 2023 All Rights Reserved
          </p>
          <p className="fs-12">
            Made with <span className="heart"></span> by Tutoree
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
