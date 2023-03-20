import axios from "axios";

const MENTOR_API_BASE_URL = "https://13.214.189.72/api/v1/mentors";

class MentorService {
  saveMentor(mentor) {
    return axios.post(MENTOR_API_BASE_URL, mentor);
  }

  getMentors() {
    return axios.get(MENTOR_API_BASE_URL);
  }

  getMentorById(id) {
    return axios.get(MENTOR_API_BASE_URL + "/" + id);
  }

  updateMentor(mentor) {
    return axios.patch(MENTOR_API_BASE_URL, mentor);
  }
}

export default new MentorService();
