import {
  LOADING_TOGGLE_ACTION,
  LOGIN_CONFIRMED_ACTION,
  LOGIN_CONFIRMED_ADMIN_ACTION,
  LOGIN_FAILED_ACTION,
  LOGIN_FAILED_ADMIN_ACTION,
  LOGOUT_ACTION,
  LOGOUT_ADMIN_ACTION,
  SIGNUP_CONFIRMED_ACTION,
  SIGNUP_FAILED_ACTION,
} from "../actions/AuthActions";

const initialState = {
  auth: {
    accessToken: "",
    id: "",
    isFirstLogin: false,
    isConfirmedInfo: false,
    phone: "",
    image: "",
    name: "",
    email: "",
    role: "",
  },
  admin: {
    id: "",
    email: "",
    userName: "",
    password: "",
    isActived: "",
    roleId: "",
    isSystemAdmin: "",
  },
  errorMessage: "",
  successMessage: "",
  showLoading: false,
};

export function AuthReducer(state = initialState, action) {
  if (action.type === SIGNUP_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      errorMessage: "",
      successMessage: "Signup Successfully Completed",
      showLoading: false,
    };
  }

  if (action.type === LOGIN_CONFIRMED_ADMIN_ACTION) {
    return {
      ...state,
      admin: action.payload,
      errorMessage: "",
      successMessage: "Login Successfully Completed",
      showLoading: false,
    };
  }

  if (action.type === LOGIN_CONFIRMED_ACTION) {
    return {
      ...state,
      auth: action.payload,
      errorMessage: "",
      successMessage: "Login Successfully Completed",
      showLoading: false,
    };
  }

  if (action.type === LOGOUT_ACTION) {
    return {
      ...state,
      errorMessage: "",
      successMessage: "",
      auth: {
        accessToken: "",
        id: "",
        isFirstLogin: false,
        isConfirmedInfo: false,
        phone: "",
        image: "",
        name: "",
        email: "",
        role: "",
      },
    };
  }

  if (action.type === LOGOUT_ADMIN_ACTION) {
    return {
      ...state,
      errorMessage: "",
      successMessage: "",
      admin: {
        accessToken: "",
        id: "",
        isFirstLogin: false,
        isConfirmedInfo: false,
        phone: "",
        image: "",
        name: "",
        email: "",
        role: "",
      },
    };
  }

  if (
    action.type === SIGNUP_FAILED_ACTION ||
    action.type === LOGIN_FAILED_ACTION ||
    action.type === LOGIN_FAILED_ADMIN_ACTION
  ) {
    return {
      ...state,
      errorMessage: action.payload,
      successMessage: "",
      showLoading: false,
    };
  }

  if (action.type === LOADING_TOGGLE_ACTION) {
    return {
      ...state,
      showLoading: action.payload,
    };
  }
  return state;
}
