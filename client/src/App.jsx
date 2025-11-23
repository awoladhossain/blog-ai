import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCategory from "./components/Category/AddCategory";
import CategoryDetails from "./components/Category/CategoryDetails";
import EditCategory from "./components/Category/EditCategory";
import Layout from "./components/Layout/Layout";
import {
  RouteAddCategory,
  RouteCategoryDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSignin,
  RouteSignup,
} from "./helpers/RouteName";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />
        </Route>

        {/* for sign in and signup */}
        <Route path={RouteSignin} element={<Signin />} />
        <Route path={RouteSignup} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
