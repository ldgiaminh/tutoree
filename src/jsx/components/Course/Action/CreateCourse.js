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

import CourseService from "../../../../services/api/course/CourseService";
import SubjectService from "../../../../services/api/subject/SubjectService";
import MentorService from "../../../../services/api/mentor/MentorService";

const CreateCourse = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();

  //Use State For Subject
  const [subjects, setSubjects] = useState([{ id: "", name: "" }]);

  //Use State For Mentor
  const [mentor, setMentor] = useState([{ id: "", name: "" }]);

  const today = new Date(),
    date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate() +
      " " +
      today.getHours() +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

  //Use State For Create Course
  const [courses, setCourses] = useState({
    name: "",
    detail: "",
    videoUrl: "",
    price: "",
    discount: "",
    capacity: "",
    classUrl: "",
    estimateHour: "",
    subjectId: "",
    mentorId: "",
    createTime: date,
    updateTime: "",
    publishDate: "",
    isActived: "On Going",
    approver: "Admin",
    approveStatus: 1,
  });

  //Use State For Coruse Image
  const [image, setImage] = useState("");

  //Fetch Subject Data Api
  useEffect(() => {
    const fetchData = async () => {
      const response = await SubjectService.getSubjects();
      setSubjects(response.data);
    };
    fetchData();
  }, []);

  //Fetch Mentor Data Api
  useEffect(() => {
    const fetchData = async () => {
      const response = await MentorService.getMentors();
      setMentor(response.data);
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setCourses({ ...courses, [e.target.name]: value });
  };

  const handleChangeImage = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const saveCourses = (e) => {
    e.preventDefault();

    dispatch(loadingToggleAction(true));
    const imageRef = ref(storage, `images/mentor/course/${image.name + v4()}`);
    uploadBytes(imageRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const formData = new FormData();
        formData.append("name", courses.name);
        formData.append("detail", courses.detail);
        formData.append("videoUrl", courses.videoUrl);
        formData.append("image", url);
        formData.append("price", courses.price);
        formData.append("discount", courses.discount);
        formData.append("capacity", courses.capacity);
        formData.append("classUrl", courses.classUrl);
        formData.append("estimateHour", courses.estimateHour);
        formData.append("subjectId", courses.subjectId);
        formData.append("mentorId", courses.mentorId);
        formData.append("createTime", courses.createTime);
        formData.append("updateTime", courses.updateTime);
        formData.append("publishDate", courses.publishDate);
        formData.append("isActived", courses.isActived);
        formData.append("approver", courses.approver);
        formData.append("approveStatus", courses.approveStatus);
        // CourseService.saveCourse(formData)
        //   .then((response) => {
        //     console.log(response.data);
        //     swal("Success!", "Add New Courses Successful", "success");
        //     history.push("/course");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //   });
        for (var pair of formData.entries()) {
          console.log(pair[0] + ", " + pair[1]);
        }
      });
    });
  };

  const reset = (e) => {
    e.preventDefault();
    setCourses({
      name: "",
      detail: "",
      videoUrl: "",
      price: "",
      discount: "",
      capacity: "",
      classUrl: "",
      estimateHour: "",
      subjectId: "",
      mentorId: "",
      createTime: new Date().toLocaleString(),
      updateTime: null,
      publishDate: null,
      isActived: "",
      approver: null,
      approveStatus: "Pending",
    });
  };

  return (
    <Fragment>
      {props.showLoading && <Loader />}
      <PageTitle
        activeMenu="Create New Courses"
        motherMenu="Course"
        pageContent="Create New Courses"
      />
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title">New Course</h4>
            </div>
            <div className="card-body">
              <div className="basic-form">
                <form onSubmit={saveCourses}>
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
                        value={courses.name}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Mentor
                      </label>
                      <select
                        className="form-control form-control-lg"
                        name="mentorId"
                        onChange={(e) => handleChange(e)}
                        value={courses.mentorId}
                      >
                        <option value="" disabled>
                          -- Choose Mentor --
                        </option>
                        {mentor.map((mentors) => (
                          <option value={mentors.id} key={mentors.id}>
                            {mentors.fullName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Class
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="classUrl"
                        onChange={(e) => handleChange(e)}
                        value={courses.classUrl}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Subject
                      </label>
                      <select
                        className="form-control form-control-lg"
                        name="subjectId"
                        onChange={(e) => handleChange(e)}
                        value={courses.subjectId}
                      >
                        <option value="" disabled>
                          -- Choose Subject --
                        </option>
                        {subjects.map((subject) => (
                          <option value={subject.id} key={subject.id}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Hours
                      </label>
                      <input
                        type="text"
                        placeholder="less than 9"
                        className="form-control form-control-lg"
                        name="estimateHour"
                        onChange={(e) => handleChange(e)}
                        value={courses.estimateHour}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Capacity
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="capacity"
                        onChange={(e) => handleChange(e)}
                        value={courses.capacity}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Price
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="price"
                        onChange={(e) => handleChange(e)}
                        value={courses.price}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Discount
                      </label>
                      <input
                        type="text"
                        placeholder="less than 9"
                        className="form-control form-control-lg"
                        name="discount"
                        onChange={(e) => handleChange(e)}
                        value={courses.discount}
                      />
                    </div>
                    <div className="form-group mb-3 col-md-6">
                      <label className="col-form-label col-form-label-lg">
                        Video URL
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        name="videoUrl"
                        onChange={(e) => handleChange(e)}
                        value={courses.videoUrl}
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
                        value={courses.detail}
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
export default connect(mapStateToProps)(CreateCourse);
