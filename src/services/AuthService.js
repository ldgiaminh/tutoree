import axios from "axios";
import swal from "sweetalert";

import {
  loginConfirmedAction,
  loginConfirmedAdminAction,
  logout,
  logoutAdmin,
} from "../store/actions/AuthActions";

export function signUp(email, password) {
  //axios call
  const postData = {
    email,
    password,
    returnSecureToken: true,
  };
  return axios.post(
    `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
    postData
  );
}

// export function login(email, password) {
//   const postData = {
//     email,
//     password,
//     returnSecureToken: true,
//   };
//   return axios.post(
//     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD3RPAp3nuETDn9OQimqn_YF6zdzqWITII`,
//     postData
//   );
// }

export function login(email, password) {
  return axios.post(
    `https://13.214.189.72/api/v1/authentication/admin/sign-in?email=${email}&password=${password}`
  );
}

export function loginGoogle(token) {
  return axios.post(
    `https://13.214.189.72/api/v1/authentication/login?token=${token}`
  );
}

export function formatError(errorResponse) {
  switch (errorResponse.error.message) {
    case "EMAIL_EXISTS":
      //return 'Email already exists';
      swal("Oops", "Email already exists", "error");
      break;
    case "EMAIL_NOT_FOUND":
      //return 'Email not found';
      swal("Oops", "Email not found", "error", { button: "Try Again!" });
      break;
    case "INVALID_PASSWORD":
      //return 'Invalid Password';
      swal("Oops", "Invalid Password", "error", { button: "Try Again!" });
      break;
    case "USER_DISABLED":
      return "User Disabled";

    default:
      return "";
  }
}

export function saveTokenInLocalStorage(tokenDetails) {
  // tokenDetails.expireDate = new Date(
  //   new Date().getTime() + tokenDetails.expiresIn * 1000
  // );
  tokenDetails.expireDate = new Date(new Date().getTime() + 86400000);
  localStorage.setItem("authMentor", JSON.stringify(tokenDetails));
}

export function saveAdminTokenInLocalStorage(tokenDetails) {
  // tokenDetails.expireDate = new Date(
  //   new Date().getTime() + tokenDetails.expiresIn * 1000
  // );
  tokenDetails.expireDate = new Date(new Date().getTime() + 86400000);
  localStorage.setItem("authAdmin", JSON.stringify(tokenDetails));
}

export function runLogoutTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logout(history));
  }, timer);
}

export function runLogoutAdminTimer(dispatch, timer, history) {
  setTimeout(() => {
    dispatch(logoutAdmin(history));
  }, timer);
}

// export function checkAutoLogin(dispatch, history) {
//   const tokenDetailsString =
//     localStorage.getItem("authMentor") ;
//   const tokenDetailsString1 =
//     localStorage.getItem("authAdmin");
//   let tokenDetails = "";
//   if (!tokenDetailsString ) {
//     dispatch(logout(history));
//     return;
//   }

//   tokenDetails = JSON.parse(tokenDetailsString);
//   let expireDate = new Date(tokenDetails.expireDate);
//   let todaysDate = new Date();

//   if (todaysDate > expireDate) {
//     dispatch(logout(history));
//     return;
//   }
//   dispatch(loginConfirmedAction(tokenDetails));

//   const timer = expireDate.getTime() - todaysDate.getTime();
//   runLogoutTimer(dispatch, timer, history);
// }
export function checkAutoLogin(dispatch, history) {
  const tokenDetailsString = localStorage.getItem("authMentor");
  const tokenDetailsString1 = localStorage.getItem("authAdmin");
  let tokenDetails = "";
  let tokenDetails1 = "";

  if (!tokenDetailsString) {
    dispatch(logout(history));
  } else if (!tokenDetailsString1) {
    dispatch(logoutAdmin(history));
  } else {
    tokenDetails = JSON.parse(tokenDetailsString);
    let expireDate = new Date(tokenDetails.expireDate);
    let todaysDate = new Date();
    if (todaysDate > expireDate) {
      dispatch(logout(history));
      return;
    }
    dispatch(loginConfirmedAction(tokenDetails));
    const timer = expireDate.getTime() - todaysDate.getTime();
    runLogoutTimer(dispatch, timer, history);

    tokenDetails1 = JSON.parse(tokenDetailsString1);
    let expireDate1 = new Date(tokenDetails1.expireDate);
    let todaysDate1 = new Date();
    if (todaysDate1 > expireDate1) {
      dispatch(logoutAdmin(history));
      return;
    }
    dispatch(loginConfirmedAdminAction(tokenDetails1));
    const timer1 = expireDate1.getTime() - todaysDate1.getTime();
    runLogoutAdminTimer(dispatch, timer1, history);
  }
}
