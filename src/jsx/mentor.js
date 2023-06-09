import React, { useContext } from "react";

/// React router dom
import { Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
/// Dashboard
import Home from "./components/Dashboard/Home";
import DashboardDark from "./components/Dashboard/DashboardDark";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import Error400 from "./pages/Error400";
import Error403 from "./pages/Error403";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";
import Error503 from "./pages/Error503";

//Course
import CourseList from "./components/Course/CourseList";
import CourseDetail from "./components/Course/CourseDetail";
import CreateCourse from "./components/Course/Action/CreateCourse";
import EditCourse from "./components/Course/Action/EditCourse";

//Booking
import BookingList from "./components/Booking/BookingList";

//Payment
import PaymentList from "./components/Payment/PaymentList";

//Transaction
import TransactionList from "./components/Transaction/TransactionList";

//Major
import MajorList from "./components/Major/MajorList";
import CreateMajor from "./components/Major/action/CreateMajor";

//Subject
import SubjectList from "./components/Subject/SubjectList";
import CreateSubject from "./components/Subject/action/CreateSubject";

//Mentor
import MentorList from "./components/Mentor/MentorList";
import MentorDetail from "./components/Mentor/MentorDetail";
import EditMentor from "./components/Mentor/Action/EditMentor";

//Mentee
import MenteeList from "./components/Mentee/MenteeList";
import MenteeDetail from "./components/Mentee/MenteeDetail";
import EditMentee from "./components/Mentee/Action/EditMentee";

//import Setting from "./layouts/Setting";
import { ThemeContext } from "../context/ThemeContext";
import MentorNav from "./layouts/nav/mentorNav";
import MentorIdList from "./components/Mentor/MentorCourseList";
import MentorCourseList from "./components/Mentor/MentorCourseList";
import MentorBookingList from "./components/Mentor/MentorBookingList";
import MentorCourseDetail from "./components/Mentor/MentorCourseDetail";

const MentorAuth = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    //Course
    { url: "course", component: CourseList },
    { url: "create-course", component: CreateCourse },
    { url: ":id-tutor-course", component: MentorCourseList },

    { url: ":id-tutor-detail", component: CourseDetail },
    { url: ":id-course-tutor-detail", component: MentorCourseDetail },
    { url: ":id-tutor-edit", component: EditCourse },

    //Booking
    { url: "booking", component: BookingList },
    { url: ":id-tutor-booking", component: MentorBookingList },

    //Payment
    { url: "payment", component: PaymentList },

    //Transaction
    { url: "transaction", component: TransactionList },

    //Major
    { url: "major", component: MajorList },
    { url: "create-major", component: CreateMajor },

    //Subject
    { url: "subject", component: SubjectList },
    { url: "create-subject", component: CreateSubject },

    //Mentor
    { url: "tutor", component: MentorList },
    { url: ":id-tutor-details", component: MentorDetail },
    { url: ":id-tutor-edit", component: EditMentor },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "vh-100"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <MentorNav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      {/* <Setting /> */}
    </>
  );
};

export default MentorAuth;
