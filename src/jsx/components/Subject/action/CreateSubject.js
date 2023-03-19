import PageTitle from "../../../layouts/PageTitle";
import React, { Fragment, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../../loader";
import { loadingToggleAction } from "../../../../store/actions/AuthActions";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";

import { v4 } from "uuid";
import swal from "sweetalert";

import SubjectService from "../../../../services/api/subject/SubjectService";
import MajorService from "../../../../services/api/major/MajorService";

const CreateSubject = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //Use State For Select
  const [majors, setMajors] = useState([{ id: "", name: "" }]);

  //Use State For Create Subject
  const [subjects, setSubjects] = useState({
    name: "",
    detail: "",
    majorId: "",
  });

  //Use State For Subject Image
  const [image, setImage] = useState("");

  //Fetch Major Data Api
  useEffect(() => {
    const fetchData = async () => {
      const response = await MajorService.getMajors();
      setMajors(response.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setSubjects({
      ...subjects,
      [e.target.name]: value,
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const saveSubjects = (e) => {
    e.preventDefault();

    dispatch(loadingToggleAction(true));
    const imageRef = ref(storage, `images/admin/subject/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const formData = new FormData();
        formData.append("name", subjects.name);
        formData.append("detail", subjects.detail);
        formData.append("majorId", subjects.majorId);
        formData.append("image", url);
        SubjectService.saveSubject(formData)
          .then(() => {
            swal("Success!", "Add New Subject Successful", "success");
            history.push("/subject");
          })
          .catch((error) => {
            console.log(error);
          });
      });
    });
  };

  const reset = (e) => {
    e.preventDefault();
    setSubjects({
      name: "",
      detail: "",
    });
  };

  return (
    <Fragment>
      {props.showLoading && <Loader />}
      <PageTitle
        activeMenu="Create New Subject"
        motherMenu="Subject"
        pageContent="Create New Subject"
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Subject</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={saveSubjects}>
                  <div className="row">
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="name"
                        onChange={(e) => handleChange(e)}
                        value={subjects.name}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Major
                      </label>
                      <select
                        className="form-control form-control-lg"
                        onChange={(e) => handleChange(e)}
                        value={subjects.majorId}
                        name="majorId"
                      >
                        <option value="" disabled>
                          -- Choose Major --
                        </option>
                        {majors.map((major) => (
                          <option value={major.id} key={major.id}>
                            {major.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Image
                      </label>
                      <div className="input-group mb-3">
                        <div className="input-group">
                          <div className="from-file">
                            <input
                              type="file"
                              name="image"
                              className="form-file-input form-control"
                              onChange={handleChangeImage}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Detail
                      </label>
                      <textarea
                        type="text"
                        className="form-control form-control-lg"
                        name="detail"
                        onChange={(e) => handleChange(e)}
                        value={subjects.detail}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <button className="me-2 btn btn-primary">Save</button>
                    <button onClick={reset} className="me-2 btn btn-dark">
                      Clear
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(CreateSubject);
