import axios from "axios";

const BOOKING_API_BASE_URL = "https://13.214.189.72/api/v1/bookings";

class BookingService {
  getBookings() {
    return axios.get(BOOKING_API_BASE_URL);
  }

  getBookingById(id) {
    return axios.get(BOOKING_API_BASE_URL + "/" + id);
  }

  getBookingMentorId(id) {
    return axios.get(BOOKING_API_BASE_URL + "/mentors/" + id);
  }

  updateBooking(Booking) {
    return axios.patch(BOOKING_API_BASE_URL, Booking);
  }

  getBookingByMentorId(id) {
    return axios.get(BOOKING_API_BASE_URL + "/mentors/" + id);
  }
}

export default new BookingService();
