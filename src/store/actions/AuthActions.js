import {
  formatError,
  login,
  loginGoogle,
  runLogoutAdminTimer,
  runLogoutTimer,
  saveAdminTokenInLocalStorage,
  saveTokenInLocalStorage,
  signUp,
} from "../../services/AuthService";

export const SIGNUP_CONFIRMED_ACTION = "[signup action] confirmed signup";
export const SIGNUP_FAILED_ACTION = "[signup action] failed signup";
export const LOGIN_CONFIRMED_ACTION = "[login action] confirmed login";
export const LOGIN_FAILED_ACTION = "[login action] failed login";
export const LOGIN_CONFIRMED_ADMIN_ACTION =
  "[login admin action] confirmed login";
export const LOGIN_FAILED_ADMIN_ACTION = "[login admin action] failed login";
export const LOADING_TOGGLE_ACTION = "[Loading action] toggle loading";
export const LOGOUT_ACTION = "[Logout action] logout action";
export const LOGOUT_ADMIN_ACTION = "[Logout admin action] logout action";

export function signupAction(email, password, history) {
  return (dispatch) => {
    signUp(email, password)
      .then((response) => {
        saveTokenInLocalStorage(response.data);
        runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
        dispatch(confirmedSignupAction(response.data));
        history.push("/dashboard");
      })
      .catch((error) => {
        const errorMessage = formatError(error.response.data);
        dispatch(signupFailedAction(errorMessage));
      });
  };
}

export function logout(history) {
  localStorage.removeItem("authMentor");
  history.push("/login");
  return {
    type: LOGOUT_ACTION,
  };
}

export function logoutAdmin(history) {
  localStorage.removeItem("authAdmin");
  history.push("/login");
  return {
    type: LOGOUT_ADMIN_ACTION,
  };
}

export function loginAction(email, password, history) {
  return (dispatch) => {
    login(email, password)
      .then((response) => {
        console.log(response.data);
        const tokenDetails = response.data;
        tokenDetails.expireDate = new Date(new Date().getTime() + 8600000); // Set expiry time to 1 hour from now
        saveAdminTokenInLocalStorage(tokenDetails);
        runLogoutAdminTimer(dispatch, 8600000, history); // Logout after 1 hour
        dispatch(loginConfirmedAdminAction(tokenDetails));
        history.push("/booking");
      })
      .catch((error) => {
        //console.log(error);
        const errorMessage = formatError(error.response.data);
        dispatch(loginFailedAdminAction(errorMessage));
      });
  };
}

// export function loginGoogleAction(token, history) {
//   return (dispatch) => {
//     loginGoogle(token)
//       .then((response) => {
//         console.log(response.data);
//         saveTokenInLocalStorage(response.data);
//         runLogoutTimer(dispatch, response.data.expiresIn * 1000, history);
//         dispatch(loginConfirmedAction(response.data));
//         history.push("/dashboard");
//       })
//       .catch((error) => {
//         //console.log(error);
//         const errorMessage = formatError(error.response.data);
//         dispatch(loginFailedAction(errorMessage));
//       });
//   };
// }

export function loginGoogleAction(token, history) {
  return (dispatch) => {
    loginGoogle(token)
      .then((response) => {
        if (response.data.role !== "Mentor") {
          runLogoutTimer(dispatch, 8600000, history);
          dispatch(loginFailedAction(""));
          history.push("/page-error-403");
        } else {
          console.log(response.data);
          const tokenDetails = response.data;
          tokenDetails.expireDate = new Date(new Date().getTime() + 8600000); // Set expiry time to 1 hour from now
          saveTokenInLocalStorage(tokenDetails);
          runLogoutTimer(dispatch, 8600000, history); // Logout after 1 hour
          dispatch(loginConfirmedAction(tokenDetails));
          history.push(`/${tokenDetails.id}-tutor-details`);
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === 401 &&
          error.response.data.role !== "Mentor"
        ) {
          history.push("/page-error-403"); // Redirect to 401 page if role is not Mentor
        } else {
          const errorMessage = formatError(error.response.data);
          dispatch(loginFailedAction(errorMessage));
        }
      });
  };
}

export function loginFailedAction(data) {
  return {
    type: LOGIN_FAILED_ACTION,
    payload: data,
  };
}

export function loginConfirmedAction(data) {
  return {
    type: LOGIN_CONFIRMED_ACTION,
    payload: data,
  };
}

export function loginFailedAdminAction(data) {
  return {
    type: LOGIN_FAILED_ADMIN_ACTION,
    payload: data,
  };
}

export function loginConfirmedAdminAction(data) {
  return {
    type: LOGIN_CONFIRMED_ADMIN_ACTION,
    payload: data,
  };
}

export function confirmedSignupAction(payload) {
  return {
    type: SIGNUP_CONFIRMED_ACTION,
    payload,
  };
}

export function signupFailedAction(message) {
  return {
    type: SIGNUP_FAILED_ACTION,
    payload: message,
  };
}

export function loadingToggleAction(status) {
  return {
    type: LOADING_TOGGLE_ACTION,
    payload: status,
  };
}
