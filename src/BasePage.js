import React, { Suspense, lazy } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import SplashScreen from "./modules/Partials/SplashScreen";
import ProfileUpdate from "./pages/Profile/ProfileUpdate";

const DashboardPage = lazy(() => import("./pages/dashboard/"));
const ProfilePage = lazy(() => import("./pages/Profile/Profile"));
const ProfileUpdatePage = lazy(() => import("./pages/Profile/ProfileUpdate"));
const UsersPage = lazy(() => import("./pages/Users/User"));
const ProductIndex = lazy(() => import("./pages/Products/Products"));
const CategoriesPage = lazy(() => import("./pages/Categories/Category"));
const OrderPage = lazy(() => import("./pages/Order/Order"));
const TransactionPage = lazy(() => import("./pages/Transaction/Transaction"));
const ChallengesPage = lazy(() => import("./pages/challenges/Challenges"));

export default function BasePage() {
  return (
    <Suspense fallback={<SplashScreen />}>
      <Switch>
        {
          /* Redirect from root URL to /dashboard. */
          <Redirect exact from="/" to="/admin/dashboard" />
        }

        <Route exact path="/admin/transactions" component={TransactionPage} />
        <Route exact path="/admin/orders" component={OrderPage} />
        <Route exact path="/admin/categories" component={CategoriesPage} />
        <Route exact path="/admin/products" component={ProductIndex} />
        <Route exact path="/admin/users" component={UsersPage} />
        <Route exact path="/admin/profile" component={ProfilePage} />
        <Route exact path="/admin/dashboard" component={DashboardPage} />
        <Route exact path="/admin/Upprofile" component={ProfileUpdatePage} />
        <Route exact path="/admin/Challenges" component={ChallengesPage} />

        <Redirect to="error" />
      </Switch>
    </Suspense>
  );
}
