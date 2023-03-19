import React, { Fragment, useState } from "react";
import NavHader from "./NavHader";
import Header from "./Header";
import MentorSideBar from "./mentorSideBar";

const MentorNav = ({ title, onClick: ClickToAddEvent, onClick2, onClick3 }) => {
  const [toggle, setToggle] = useState("");
  const onClick = (name) => setToggle(toggle === name ? "" : name);
  return (
    <Fragment>
      <NavHader />
      <Header
        onProfile={() => onClick("profile")}
        toggle={toggle}
        title={title}
        onBox={() => onClick("box")}
        onClick={() => ClickToAddEvent()}
      />
      <MentorSideBar />
    </Fragment>
  );
};

export default MentorNav;
