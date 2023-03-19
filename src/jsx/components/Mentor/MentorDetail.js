import React, { Fragment, useState, useEffect } from "react";
import { Button, Dropdown, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SRLWrapper } from "simple-react-lightbox";
import swal from "sweetalert";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

import { useHistory, useParams } from "react-router-dom";

import MentorService from "../../../services/api/mentor/MentorService";
import CourseService from "../../../services/api/course/CourseService";

//** Import Image */
import profile01 from "../../../images/profile/1.jpg";
import profile02 from "../../../images/profile/2.jpg";
import profile03 from "../../../images/profile/3.jpg";
import profile04 from "../../../images/profile/4.jpg";
import profile05 from "../../../images/profile/5.jpg";
import profile06 from "../../../images/profile/6.jpg";
import profile07 from "../../../images/profile/7.jpg";
import profile08 from "../../../images/profile/8.jpg";
import profile09 from "../../../images/profile/9.jpg";
import profile from "../../../images/profile/profile.png";
import PageTitle from "../../layouts/PageTitle";

const MentorDetail = () => {
  const { id } = useParams();

  const history = useHistory();

  const [activeToggle, setActiveToggle] = useState("aboutMe");

  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState(null);

  const [mentors, setMentors] = useState({
    id: id,
    fullName: "",
    phone: "",
    address: "",
    country: "",
    qualification: "",
    evidence: "",
    job: "",
    gender: "",
    image: "",
    schedule: "",
    websiteUrl: "",
    approveStatusId: "",
  });

  let schedules = [];
  if (mentors.schedule !== "") {
    schedules = JSON.parse(mentors.schedule);
  }

  const handleChange = (e, index) => {
    if (index !== undefined) {
      const newSchedules = [...schedules];
      newSchedules[index].isActive = !newSchedules[index].isActive;
      setMentors({ ...mentors, schedule: JSON.stringify(newSchedules) });
    } else {
      const value = e.target.value;
      setMentors({ ...mentors, [e.target.name]: value });
    }
  };

  const updateMentor = (e) => {
    e.preventDefault();
    MentorService.updateMentor(mentors)
      .then(() => {
        swal("Success!", "Update Information Successful", "success");
        setMentors(mentors);
        setActiveToggle("aboutMe");
        console.log(mentors);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MentorService.getMentorById(id);
        setMentors(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await CourseService.getCourseByMentorId(id);
        setCourses(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <Fragment>
      <PageTitle activeMenu="Profile" motherMenu="Tutor" />

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
                    src={mentors.image}
                    className="img-fluid rounded-circle"
                    alt="profile"
                  />
                </div>
                <div className="profile-details">
                  <div className="profile-name px-3 pt-2">
                    <h2 className="text-primary mb-0">{mentors.fullName}</h2>
                    <h4>Tutor</h4>
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
                    <li className="nav-item">
                      <Link
                        to="#profile-settings"
                        data-toggle="tab"
                        onClick={() => setActiveToggle("setting")}
                        className={`nav-link  ${
                          activeToggle === "setting" ? "active show" : ""
                        }`}
                      >
                        Setting
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
                            <h4 className="text-muted">{mentors.fullName}</h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              Phone<span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{mentors.phone}</h4>
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
                            <h4 className="text-muted">{mentors.gender}</h4>
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
                              {mentors.address}, {mentors.country}
                            </h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              Website
                              <span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">{mentors.websiteUrl}</h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              Qualification
                              <span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">
                              {mentors.qualification}
                            </h4>
                          </div>
                        </div>
                        <div className="row mb-2">
                          <div className="col-3">
                            <h4 className="f-w-500">
                              Schedule
                              <span className="pull-right">:</span>
                            </h4>
                          </div>
                          <div className="col-9">
                            <h4 className="text-muted">
                              {schedules
                                .filter((item) => item.isActive)
                                .map((item, index) => (
                                  <div key={index}>{item.date}</div>
                                ))}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      id="profile-settings"
                      className={`tab-pane fade ${
                        activeToggle === "setting" ? "active show" : ""
                      }`}
                    >
                      <div className="card-body">
                        <div className="basic-form">
                          <form onSubmit={updateMentor}>
                            <div className="row">
                              {/* <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        ID
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="id"
                        onChange={(e) => handleChange(e)}
                        value={mentor.id}
                      />
                    </div> */}
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Full Name
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="fullName"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.fullName}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Qualification
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="qualification"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.qualification}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Phone
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="phone"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.phone}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Evidence
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="evidence"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.evidence}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Address
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="address"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.address}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Job
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="job"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.job}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Country
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="country"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.country}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Image
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="image"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.image}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Gender
                                </label>
                                <div className="radio form-control-lg text-center ">
                                  <label className="col-md-3">
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      checked={mentors.gender === "Male"}
                                      name="gender"
                                      onChange={(e) => handleChange(e)}
                                      value="Male"
                                    />{" "}
                                    Male
                                  </label>
                                  <label>
                                    <input
                                      type="radio"
                                      className="form-check-input"
                                      checked={mentors.gender === "Female"}
                                      name="gender"
                                      onChange={(e) => handleChange(e)}
                                      value="Female"
                                    />{" "}
                                    Female
                                  </label>
                                </div>
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Website
                                </label>
                                <input
                                  type="text"
                                  className="form-control form-control-lg"
                                  name="websiteUrl"
                                  onChange={(e) => handleChange(e)}
                                  value={mentors.websiteUrl}
                                />
                              </div>
                              <div className="form-group mb-3 col-md-6">
                                <label className="col-form-label col-form-label-lg">
                                  Schedule
                                </label>
                                {schedules?.map((item, index) => (
                                  <div id="multiselect" key={index}>
                                    <input
                                      type="checkbox"
                                      className="form-check-input"
                                      id="customCheckBox1"
                                      name="isActive"
                                      checked={item.isActive}
                                      onChange={(e) => handleChange(e, index)}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor="customCheckBox1"
                                    >
                                      {item.date}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="form-group"></div>
                            <button className="btn btn-primary">Update</button>
                          </form>
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

export default MentorDetail;
