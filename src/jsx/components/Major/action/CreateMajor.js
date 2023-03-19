import PageTitle from "../../../layouts/PageTitle";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import Loader from "../../../loader";
import { loadingToggleAction } from "../../../../store/actions/AuthActions";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../../../firebase";

import { v4 } from "uuid";
import swal from "sweetalert";

import MajorService from "../../../../services/api/major/MajorService";

const CreateMajor = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [majors, setMajors] = useState({
    name: "",
    detail: "",
  });

  //Use State For Subject Image
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setMajors({ ...majors, [e.target.name]: value });
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const saveMajors = (e) => {
    e.preventDefault();

    dispatch(loadingToggleAction(true));
    const imageRef = ref(storage, `images/admin/major/${image.name + v4()}`);
    uploadBytes(imageRef, image)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            const formData = new FormData();
            formData.append("name", majors.name);
            formData.append("detail", majors.detail);
            formData.append("image", url);

            MajorService.saveMajor(formData)
              .then(() => {
                swal("Success!", "Add New Major Successful", "success");
                history.push("/major");
              })
              .catch((error) => {
                console.log(error);
              });
          })
          .catch((error) => {
            console.log(error.message, "error getting the image url");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const reset = (e) => {
    e.preventDefault();
    setMajors({
      name: "",
      detail: "",
      image: "",
    });
  };

  return (
    <Fragment>
      {props.showLoading && <Loader />}
      <PageTitle
        activeMenu="Create New Major"
        motherMenu="Major"
        pageContent="Create New Major"
      />

      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Major</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={saveMajors}>
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
                        value={majors.name}
                      />
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
                        value={majors.detail}
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
export default connect(mapStateToProps)(CreateMajor);
