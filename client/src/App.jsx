import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRoute from "./components/AdminRoute";
import AddCategory from "./components/Category/AddCategory";
import CategoryDetails from "./components/Category/CategoryDetails";
import EditCategory from "./components/Category/EditCategory";
import Layout from "./components/Layout/Layout";
import PublicLayout from "./components/Layout/PublicLayout";
import PrivateRoute from "./components/PrivateRoute";
import {
  RouteAdComments,
  RouteAddCategory,
  RouteAllUser,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategoryDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSignin,
  RouteSignup,
  RouteWelcome,
} from "./helpers/RouteName";
import AdComments from "./pages/AdComments";
import AdUsers from "./pages/AdUsers";
import AddBlog from "./pages/blog/AddBlog";
import BlogDetails from "./pages/blog/BlogDetails";
import EditBlog from "./pages/blog/EditBlog";
import BlogByCategory from "./pages/BlogByCategory";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import SearchResult from "./pages/SearchResult";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SingleBlogDetails from "./pages/SingleBlogDetails";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route path={RouteWelcome} element={<PublicLayout />} />
        <Route path={RouteSignin} element={<Signin />} />
        <Route path={RouteSignup} element={<Signup />} />

        {/* App layout */}
        <Route path={RouteIndex} element={<Layout />}>
          {/* PUBLIC inside app */}
          <Route index element={<Index />} />
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path="/app/blog/search" element={<SearchResult />} />

          {/* PRIVATE routes */}
          <Route element={<PrivateRoute />}>
            <Route path={RouteProfile} element={<Profile />} />
            <Route path={RouteBlogAdd} element={<AddBlog />} />
            <Route path={RouteBlogEdit()} element={<EditBlog />} />
          </Route>

          {/* ADMIN routes */}
          <Route element={<AdminRoute />}>
            <Route path={RouteAddCategory} element={<AddCategory />} />
            <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
            <Route path={RouteEditCategory()} element={<EditCategory />} />
            <Route path={RouteAdComments} element={<AdComments />} />
            <Route path={RouteAllUser} element={<AdUsers />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
