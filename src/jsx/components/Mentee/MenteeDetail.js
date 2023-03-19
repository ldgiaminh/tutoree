import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import swal from "sweetalert";

import { useParams } from "react-router-dom";

import MenteeService from "../../../services/api/mentee/MenteeService";

import PageTitle from "../../layouts/PageTitle";

const MenteeDetail = () => {
  const { id } = useParams();

  const [activeToggle, setActiveToggle] = useState("aboutMe");

  const [isDisabled, setIsDisabled] = useState(true);
  const [checked, setChecked] = useState(false);

  const [loading, setLoading] = useState(true);

  const [mentees, setMentees] = useState({
    id: id,
    fullName: "",
    phone: "",
    address: "",
    university: "",
    country: "",
    gender: "",
    image: "",
  });

  const canBeSubmitted = () => {
    return checked ? setIsDisabled(true) : setIsDisabled(false);
  };

  const onCheckboxClick = () => {
    setChecked(!checked);
    return canBeSubmitted();
  };

  const handleonApprove = (e) => {
    e.preventDefault();
    MenteeService.approvedMentor(id)
      .then(() => {
        swal("Good job!", "You clicked the button!", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MenteeService.getMenteeById(id);
        setMentees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="Student" />

      <div className="row">
        <div className="col-lg-">
          <div className="profile card card-body px-3 pt-3 pb-0">
            <div className="profile-head">
              {/* <div className="photo-content ">
                <div className="cover-photo rounded"></div>
              </div> */}
              <div className="profile-info">
                <div className="profile-photo">
                  <img
                    src={mentees.image}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h2 className="text-primary mb-0">{mentees.fullName}</h2>
                    <h4>Student</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xl-12">
          <div className="card">
            <div className="card-body">
              <div className="profile-tab">
                <div className="custom-tab-1">
                  <ul className="nav nav-tabs">
                    <li
                      className="nav-item"
                      onClick={() => setActiveToggle("aboutMe")}
                    >
                      <Link
                        to="#about-me"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "aboutMe" ? "active show" : ""
                        }`}
                      >
                        Information
                      </Link>
                    </li>
                    <li
                      className="nav-item"
                      onClick={() => setActiveToggle("approveMentor")}
                    >
                      <Link
                        to="#approve-mentor"
                        data-toggle="tab"
                        className={`nav-link ${
                          activeToggle === "approveMentor" ? "active show" : ""
                        }`}
                      >
                        Approve
                      </Link>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div
                      id="about-me"
                      className={`tab-pane fade ${
                        activeToggle === "aboutMe" ? "active show" : ""
                      }`}
                    >
                      <div className="profile-personal-info mt-4">
                        <h3 className="text-primary mb-4">Personal Detail</h3>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              {" "}
                              Full Name<span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{mentees.fullName}</h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              Phone<span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{mentees.phone}</h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              {" "}
                              Gender<span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{mentees.gender}</h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              {" "}
                              Location<span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">
                              {mentees.address}, {mentees.country}
                            </h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              University
                              <span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{mentees.university}</h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="approve-mentor"
                      className={`tab-pane fade ${
                        activeToggle === "approveMentor" ? "active show" : ""
                      }`}
                    >
                      <div className="profile-personal-info mt-4">
                        <h3 className="text-primary mb-4">Allow Mentor</h3>
                        <p class="mb-4 card-text">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. A, minima! Eligendi minima illum itaque harum
                          aliquam vel, sunt magni dolorem! Cum quaerat est
                          cupiditate saepe quidem, fugiat in at magni ad
                          provident distinctio eum tempore laboriosam adipisci,
                          tempora cumque ex quis unde voluptatem consequuntur.
                          Excepturi quibusdam accusamus deleniti officiis ullam
                          repellendus magni unde? Saepe quibusdam vel, ipsum
                          numquam ratione tempore. Dolor optio aliquid in velit
                          eaque, sed delectus reprehenderit quam quidem a eum id
                          nostrum ullam obcaecati error deleniti modi quasi
                          harum possimus voluptatum repellat saepe! Omnis dolor
                          maiores eaque deserunt exercitationem incidunt autem
                          et voluptatibus molestias quod explicabo ipsam nam
                          vitae a architecto, consectetur quas facilis sed
                          nulla, placeat eum ex, ducimus in. Hic quo
                          necessitatibus autem tempora provident!
                        </p>
                        <p className="text-danger fw-bold">
                          *Make sure you check email with condition to approve
                        </p>
                        <div className="col-12 d-flex">
                          <div className="form-check custom-checkbox">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id="customCheckBox1"
                              required
                              onClick={onCheckboxClick}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="customCheckBox1"
                            >
                              Checked
                            </label>
                          </div>
                          <button
                            type="submit"
                            class="btn btn-success offset-7"
                            disabled={isDisabled}
                            onClick={handleonApprove}
                          >
                            Success{" "}
                            <span class="btn-icon-end">
                              <i class="fa fa-check"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default MenteeDetail;
