import React, { useState } from "react";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Layout from "./modules/Layout";
import { Logout, AuthPage } from "./modules/Auth";
import { useDispatch, useSelector } from "react-redux";
import BasePage from "./BasePage";
import ErrorsPage from "./modules/Errors/ErrorPage";
import { me } from "./helpers/auth";
import { isMeAuth } from "./reducers/authReducer";

export function Routes() {
  const { isAuth } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  React.useEffect(() => {
    handleMe();
  }, []);
  const handleMe = () => {
    setLoading(true);
    try {
      me().then((data) => {
        if (data?._id) {
          dispatch(isMeAuth({ data }));
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    } catch (error) {
      console.log("login page catch error", error);
    }
  };

  if (loading) {
    return (
      <>
        <div>Loading..</div>
      </>
    );
  }
  return (
    <Router>
      <Switch>
        {!isAuth ? (
          /*Render auth page when user at `/auth/login` and not authorized.*/
          <Route>
            <AuthPage />
          </Route>
        ) : (
          /*Otherwise redirect to root page (`/`)*/
          <Redirect from="/auth" to="/" />
        )}
        <Route path="/error" component={ErrorsPage} />
        <Route path="/logout" component={Logout} />
        {!isAuth ? (
          /*Redirect to `/auth` when user is not authorized*/
          <Redirect to="/auth/login" />
        ) : (
          <Layout>
            <BasePage />
          </Layout>
        )}
      </Switch>
    </Router>
  );
}
