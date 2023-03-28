import PageTitle from "../../../layouts/PageTitle";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import MentorService from "../../../../services/api/mentor/MentorService";
import swal from "sweetalert";

const EditMentor = () => {
  const { id } = useParams();

  const history = useHistory();

  const [mentor, setMentor] = useState({
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
  if (mentor.schedule !== "") {
    schedules = JSON.parse(mentor.schedule);
  }

  // const handleChange = (e) => {
  //   const value = e.target.value;
  //   setMentor({ ...mentor, [e.target.name]: value });
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MentorService.getMentorById(id);
        setMentor(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  // const updateMentor = (e) => {
  //   e.preventDefault();
  //   MentorService.updateMentor(mentor)
  //     .then(() => {
  //       history.push("./mentor");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  //   console.log(mentor);
  // };

  const handleChange = (e, index) => {
    if (index !== undefined) {
      const newSchedules = [...schedules];
      newSchedules[index].isActive = !newSchedules[index].isActive;
      setMentor({ ...mentor, schedule: JSON.stringify(newSchedules) });
    } else {
      const value = e.target.value;
      setMentor({ ...mentor, [e.target.name]: value });
    }
  };

  const updateMentor = (e) => {
    e.preventDefault();
    MentorService.updateMentor(mentor)
      .then(() => {
        swal("Success!", "Update Information Successful", "success");
        setMentor(mentor);
        history.push("/tutor");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Edit" motherMenu="tutor" pageContent="Edit" />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Tutor</h4>
            </div>
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
                        value={mentor.fullName}
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
                        value={mentor.qualification}
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
                        value={mentor.phone}
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
                        value={mentor.evidence}
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
                        value={mentor.address}
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
                        value={mentor.job}
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
                        value={mentor.country}
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
                        value={mentor.image}
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
                            checked={mentor.gender === "Male"}
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
                            checked={mentor.gender === "Female"}
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
                        value={mentor.websiteUrl}
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
    </Fragment>
  );
};

export default EditMentor;
