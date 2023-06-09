import { lazy, Suspense, useEffect } from "react";

/// Components
import Index from "./jsx";
import { connect, useDispatch } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
// action
import { checkAutoLogin } from "./services/AuthService";
import { isAdmin, isAuthenticated } from "./store/selectors/AuthSelectors";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./vendor/datatables/css/dataTables.min.css";
import "./css/style.css";
import MentorAuth from "./jsx/mentor";
import Error403 from "./jsx/pages/Error403";

// const SignUp = lazy(() => import("./jsx/pages/Registration"));
// const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"));
const Login = lazy(() => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(import("./jsx/pages/Login")), 500);
  });
});

function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    checkAutoLogin(dispatch, props.history);
  }, [dispatch, props.history]);

  let routes = (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/page-error-403" component={Error403} />
      {/* <Route path="/page-register" component={SignUp} />
      <Route path="/page-forgot-password" component={ForgotPassword} /> */}
    </Switch>
  );
  if (props.isAdmin) {
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          <Index />
        </Suspense>
      </>
    );
  } else if (props.isAuthenticated) {
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          <MentorAuth />
        </Suspense>
      </>
    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {routes}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
    isAdmin: isAdmin(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
