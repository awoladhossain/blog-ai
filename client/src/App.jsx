import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import {
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
        </Route>
        {/* for sign in and signup */}
        <Route path={RouteSignin} element={<Signin />} />
        <Route path={RouteSignup} element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
