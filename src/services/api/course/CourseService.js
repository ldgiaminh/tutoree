import axios from "axios";

const COURSE_API_BASE_URL = "https://13.214.189.72/api/v1/courses";

const config = {
  headers: {
    "Content-Type": "multipart/form-data",
  },
};

class CourseService {
  saveCourse(Course) {
    return axios.post(COURSE_API_BASE_URL, Course, config);
  }

  getCourses() {
    return axios.get(COURSE_API_BASE_URL);
  }

  getCourseById(id) {
    return axios.get(COURSE_API_BASE_URL + "/" + id);
  }

  getMentorCourseId(id) {
    return axios.get(COURSE_API_BASE_URL + "/mentors/" + id);
  }

  updateCourse(Course) {
    return axios.patch(COURSE_API_BASE_URL, Course, config);
  }

  getCourseByMentorId(id) {
    return axios.get(COURSE_API_BASE_URL + "/mentors/" + id);
  }
}

export default new CourseService();
