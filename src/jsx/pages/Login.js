import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Loader from "../loader";
import {
  loadingToggleAction,
  loginAction,
  loginGoogleAction,
} from "../../store/actions/AuthActions";

import GoogleButton from "react-google-button";

import loginbg from "../../images/pic1.png";

import { auth, provider, signInWithGoogle } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

function Login(props) {
  const [email, setEmail] = useState("admin@admin.com");
  let errorsObj = { email: "", password: "" };
  const [errors, setErrors] = useState(errorsObj);
  const [password, setPassword] = useState("123456");

  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) {
      return;
    }
    dispatch(loadingToggleAction(true));
    dispatch(loginAction(email, password, props.history));
  }

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        dispatch(loadingToggleAction(true));
        dispatch(loginGoogleAction(result.user.accessToken, props.history));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="authincation d-flex flex-column flex-lg-row flex-column-fluid">
      {props.showLoading && <Loader />}
      <div className="login-aside text-center  d-flex flex-column flex-row-auto">
        <div className="d-flex flex-column-auto flex-column pt-lg-40 pt-15">
          <div className="text-center pt-5">
            <svg
              className="logo-abbr me-3"
              version="1.0"
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="200"
              fill="none"
              viewBox="0 0 800.000000 434.000000"
              preserveAspectRatio="xMidYMid meet"
            >
              <g
                transform="translate(0.000000,434.000000) scale(0.100000,-0.100000)"
                fill="#00A77F"
                stroke="none"
              >
                <path
                  d="M2820 3880 c-207 -20 -396 -106 -543 -249 -113 -109 -194 -231 -237
-356 l-17 -50 -106 -3 -107 -3 0 -199 0 -199 92 -3 91 -3 19 -79 c20 -86 78
-218 129 -293 47 -69 165 -189 229 -233 98 -67 271 -140 375 -159 86 -16 274
-14 363 5 184 38 371 145 490 282 112 130 168 238 212 403 15 60 35 117 43
129 41 58 139 97 207 81 77 -17 144 -73 156 -129 50 -233 140 -401 291 -542
171 -160 379 -241 623 -241 142 0 211 13 351 67 273 105 477 338 551 627 l23
87 93 0 92 0 -2 198 -3 197 -106 3 -106 3 -13 42 c-48 163 -199 359 -356 463
-158 105 -327 156 -519 156 -299 0 -562 -130 -739 -367 -57 -76 -116 -184
-136 -252 l-13 -43 -223 0 -222 0 -13 38 c-6 20 -30 73 -52 117 -170 342 -533
541 -917 505z m286 -160 c95 -25 150 -49 232 -104 303 -201 429 -565 316 -906
-116 -349 -482 -580 -837 -531 -186 26 -325 97 -464 236 -80 81 -97 105 -141
196 -63 130 -84 220 -84 349 0 130 22 220 84 347 76 157 196 277 353 356 170
85 354 105 541 57z m2214 4 c147 -33 329 -149 425 -272 58 -73 117 -187 147
-282 19 -63 23 -96 23 -210 0 -114 -4 -147 -23 -210 -88 -280 -291 -479 -561
-552 -106 -29 -286 -29 -392 0 -267 72 -475 276 -561 552 -33 108 -33 312 0
420 33 106 107 241 169 310 199 219 484 309 773 244z"
                />
                <path
                  d="M2778 3516 c-25 -7 -58 -20 -72 -30 -15 -9 -55 -26 -90 -36 -88 -28
-137 -67 -185 -148 -23 -37 -41 -73 -41 -80 0 -6 -12 -47 -27 -89 -21 -64 -27
-101 -31 -205 -4 -119 -3 -127 16 -137 11 -6 28 -8 37 -5 14 6 16 16 11 68 -7
61 4 167 24 239 8 27 20 42 48 57 96 50 183 137 207 206 11 33 23 44 76 72 59
31 69 33 129 28 36 -3 79 -8 96 -11 23 -5 33 -3 37 9 11 29 -4 46 -56 61 -60
18 -115 18 -179 1z"
                />
                <path
                  d="M5017 3520 c-20 -5 -56 -19 -78 -30 -22 -12 -69 -30 -103 -40 -112
-35 -182 -116 -232 -267 -38 -116 -54 -199 -54 -290 0 -86 14 -118 49 -111 13
3 17 24 22 128 4 69 14 147 23 175 14 43 22 53 57 69 57 26 186 153 195 191 9
39 30 62 79 88 39 21 120 26 230 15 26 -3 30 0 30 22 0 17 -8 29 -27 38 -36
17 -143 24 -191 12z"
                />
                <path
                  d="M1567 3199 c-78 -41 -114 -147 -83 -251 24 -83 86 -128 176 -128 l50
0 0 200 0 200 -52 0 c-33 -1 -67 -9 -91 -21z"
                />
                <path d="M1740 3020 l0 -200 25 0 24 0 0 200 0 200 -24 0 -25 0 0 -200z" />
                <path
                  d="M6260 3019 l0 -202 38 6 c40 5 329 117 369 143 31 20 55 58 47 77 -6
18 -16 23 -226 111 -95 40 -170 66 -192 66 l-36 0 0 -201z"
                />
                <path
                  d="M2436 1543 c-3 -21 -6 -49 -6 -62 l0 -24 91 7 92 7 -5 -296 -5 -295
71 0 71 0 -4 295 -3 296 90 -7 90 -7 4 62 3 61 -241 0 -241 0 -7 -37z"
                />
                <path
                  d="M3590 1496 l-55 -11 -3 -53 c-3 -50 -4 -52 -33 -52 -25 0 -29 -4 -29
-27 0 -16 -3 -38 -6 -50 -6 -21 -3 -23 30 -23 l36 0 0 -155 c0 -173 8 -203 60
-230 42 -22 76 -19 131 12 51 27 53 31 43 80 -5 27 -9 29 -52 29 l-47 -1 -3
133 -3 132 56 0 c60 0 60 0 69 63 l5 37 -61 0 -61 0 5 65 c6 74 11 71 -82 51z"
                />
                <path
                  d="M3973 1385 c-93 -47 -145 -147 -146 -280 -1 -68 3 -88 26 -131 65
-126 227 -140 326 -28 47 53 70 115 78 204 10 114 -28 198 -107 238 -58 29
-114 28 -177 -3z m130 -145 c62 -73 38 -225 -37 -244 -77 -19 -140 82 -117
187 19 84 104 116 154 57z"
                />
                <path
                  d="M4835 1392 c-50 -24 -111 -90 -138 -151 -25 -56 -34 -170 -18 -229
14 -51 64 -110 108 -128 75 -32 184 -2 252 69 l33 35 -27 36 c-25 33 -29 35
-44 22 -30 -28 -109 -57 -135 -50 -31 7 -63 41 -71 77 -5 20 -3 27 7 27 66 0
236 24 247 35 8 8 16 42 18 87 7 118 -36 175 -138 184 -40 4 -64 0 -94 -14z
m93 -114 c7 -7 12 -26 12 -44 0 -35 0 -36 -104 -49 l-49 -7 7 34 c3 18 17 43
32 56 28 24 82 30 102 10z"
                />
                <path
                  d="M5285 1392 c-50 -24 -111 -90 -138 -151 -25 -56 -34 -170 -18 -229
42 -153 221 -190 345 -70 l48 46 -27 36 -26 35 -44 -31 c-57 -40 -114 -43
-149 -8 -30 30 -45 80 -25 80 70 0 237 23 248 35 8 8 16 43 18 87 5 82 -11
126 -59 161 -39 29 -122 33 -173 9z m99 -124 c37 -52 16 -72 -87 -82 l-68 -7
16 38 c20 50 49 73 91 73 23 0 38 -7 48 -22z"
                />
                <path
                  d="M3024 1388 l-52 -9 5 -207 c6 -238 11 -257 80 -281 54 -19 108 -4
159 44 20 20 38 34 39 33 0 -2 9 -22 20 -45 10 -24 21 -43 25 -43 7 0 101 39
108 45 1 1 -5 19 -14 41 -13 31 -16 73 -15 202 0 90 3 179 7 198 3 19 2 34 -2
34 -8 0 -56 -10 -122 -25 l-23 -6 7 -162 7 -163 -29 -12 c-59 -22 -71 -23 -95
-3 -23 19 -24 22 -21 158 1 76 5 155 8 176 7 42 4 43 -92 25z"
                />
                <path
                  d="M4377 1388 l-48 -10 8 -62 c4 -33 7 -145 6 -248 -1 -104 1 -188 5
-187 4 0 36 6 71 12 l64 13 -3 94 c-7 203 -11 182 40 208 24 12 58 22 76 22
27 0 32 4 38 31 10 50 7 139 -4 139 -37 0 -140 -81 -140 -111 0 -5 -4 -9 -10
-9 -5 0 -10 13 -10 29 0 16 -3 43 -6 60 -7 34 -10 35 -87 19z"
                />
              </g>
            </svg>
          </div>
          <h3 className="mb-2">Welcome back to Tutoree!</h3>
        </div>
        <div
          className="aside-image"
          style={{ backgroundImage: "url(" + loginbg + ")" }}
        ></div>
      </div>
      <div className="container flex-row-fluid d-flex flex-column justify-content-center position-relative overflow-hidden p-7 mx-auto">
        <div className="d-flex justify-content-center h-100 align-items-center">
          <div className="authincation-content style-2">
            <div className="row no-gutters">
              <div className="col-xl-12 tab-content">
                <div id="sign-in" className="auth-form   form-validation">
                  {props.errorMessage && (
                    <div className="bg-red-300 text-red-900 border border-red-900 p-1 my-2">
                      {props.errorMessage}
                    </div>
                  )}
                  {props.successMessage && (
                    <div className="bg-green-300 text-green-900 border border-green-900 p-1 my-2">
                      {props.successMessage}
                    </div>
                  )}
                  <form onSubmit={onLogin} className="form-validate">
                    <h3 className="text-center mb-4 text-black">
                      Sign in your account
                    </h3>
                    <div className="form-group mb-3">
                      <label className="mb-1" htmlFor="val-email">
                        <strong>Email</strong>
                      </label>
                      <div>
                        <input
                          type="email"
                          className="form-control"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Type Your Email Address"
                        />
                      </div>
                      {errors.email && (
                        <div className="text-danger fs-12">{errors.email}</div>
                      )}
                    </div>
                    <div className="form-group mb-3">
                      <label className="mb-1">
                        <strong>Password</strong>
                      </label>
                      <input
                        type="password"
                        className="form-control"
                        value={password}
                        placeholder="Type Your Password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && (
                        <div className="text-danger fs-12">
                          {errors.password}
                        </div>
                      )}
                    </div>
                    <div className="form-row d-flex justify-content-between mt-4 mb-2">
                      <div className="form-group mb-3">
                        {/* <div className="custom-control custom-checkbox ml-1">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="basic_checkbox_1"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="basic_checkbox_1"
                          >
                            Remember my preference
                          </label>
                        </div> */}
                      </div>
                    </div>
                    <div className="text-center form-group mb-3">
                      <button
                        type="submit"
                        className="btn btn-primary btn-block"
                      >
                        Sign In
                      </button>
                    </div>
                    <div className="text-center text-center form-group mb-3">
                      or
                    </div>
                  </form>
                  <div className="text-center form-group mb-3">
                    <GoogleButton
                      onClick={signInWithGoogle}
                      className="w-100 btn-block"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    errorMessage: state.auth.errorMessage,
    successMessage: state.auth.successMessage,
    showLoading: state.auth.showLoading,
  };
};
export default connect(mapStateToProps)(Login);
