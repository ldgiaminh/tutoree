import axios from "axios";

const MENTEE_API_BASE_URL = "https://13.214.189.72/api/v1/mentees";

const MENTEE_TO_MENTOR_API_URL = "https://13.214.189.72/api/v1/users";

class MenteeService {
  saveMentee(mentee) {
    return axios.post(MENTEE_API_BASE_URL, mentee);
  }

  getMentees() {
    return axios.get(MENTEE_API_BASE_URL);
  }

  getMenteeById(id) {
    return axios.get(MENTEE_API_BASE_URL + "/" + id);
  }

  updateMentee(mentee) {
    return axios.patch(MENTEE_API_BASE_URL, mentee);
  }

  approvedMentor(id) {
    return axios.post(MENTEE_TO_MENTOR_API_URL + "/" + id + "/change-role");
  }
}

export default new MenteeService();
