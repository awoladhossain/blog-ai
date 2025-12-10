import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCategory from "./components/Category/AddCategory";
import CategoryDetails from "./components/Category/CategoryDetails";
import EditCategory from "./components/Category/EditCategory";
import Layout from "./components/Layout/Layout";
import PublicLayout from "./components/Layout/PublicLayout";
import {
  RouteAddCategory,
  RouteBlog,
  RouteBlogAdd,
  RouteBlogByCategory,
  RouteBlogDetails,
  RouteBlogEdit,
  RouteCategoryDetails,
  RouteEditCategory,
  RouteIndex,
  RouteProfile,
  RouteSearch,
  RouteSignin,
  RouteSignup,
  RouteWelcome,
} from "./helpers/RouteName";
import AddBlog from "./pages/blog/AddBlog";
import BlogDetails from "./pages/blog/BlogDetails";
import EditBlog from "./pages/blog/EditBlog";
import BlogByCategory from "./pages/BlogByCategory";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import SingleBlogDetails from "./pages/SingleBlogDetails";
import SearchResult from "./pages/SearchResult";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Welcome/Landing Page - First page users see */}
        <Route path={RouteWelcome} element={<PublicLayout />} />

        {/* Auth Routes - No layout */}
        <Route path={RouteSignin} element={<Signin />} />
        <Route path={RouteSignup} element={<Signup />} />

        {/* Main App Routes - With sidebar layout */}
        <Route path={RouteIndex} element={<Layout />}>
          <Route index element={<Index />} />
          <Route path={RouteProfile} element={<Profile />} />
          <Route path={RouteAddCategory} element={<AddCategory />} />
          <Route path={RouteCategoryDetails} element={<CategoryDetails />} />
          <Route path={RouteEditCategory()} element={<EditCategory />} />

          {/* Blog routes */}
          <Route path={RouteBlog} element={<BlogDetails />} />
          <Route path={RouteBlogAdd} element={<AddBlog />} />
          <Route path={RouteBlogEdit()} element={<EditBlog />} />
          <Route path={RouteBlogDetails()} element={<SingleBlogDetails />} />
          <Route path={RouteBlogByCategory()} element={<BlogByCategory />} />
          <Route path={RouteSearch()} element={<SearchResult />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
