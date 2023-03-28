import PageTitle from "../../../layouts/PageTitle";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import MenteeService from "../../../../services/api/mentee/MenteeService";

const EditMentee = () => {
  const { id } = useParams();

  const history = useHistory();

  const [mentee, setMentee] = useState({
    id: id,
    fullName: "",
    phone: "",
    address: "",
    university: "",
    country: "",
    gender: "",
    image: "",
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setMentee({ ...mentee, [e.target.name]: value });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await MenteeService.getMenteeById(id);
        setMentee(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const updateMentees = (e) => {
    e.preventDefault();
    MenteeService.updateMentee(mentee)
      .then((response) => {
        history.push("/student");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <PageTitle activeMenu="Edit" motherMenu="Mentee" pageContent="Edit" />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">Edit Mentor</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={updateMentees}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="fullName"
                        onChange={(e) => handleChange(e)}
                        value={mentee.fullName}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        University
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="university"
                        onChange={(e) => handleChange(e)}
                        value={mentee.university}
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
                        value={mentee.phone}
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
                        value={mentee.address}
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
                            checked={mentee.gender === "Male"}
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
                            checked={mentee.gender === "Female"}
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
                        Country
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="country"
                        onChange={(e) => handleChange(e)}
                        value={mentee.country}
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
                        value={mentee.image}
                      />
                    </div>
                    {/* <div className="form-group mb-3 col-md-6">
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
                    </div> */}
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

export default EditMentee;
