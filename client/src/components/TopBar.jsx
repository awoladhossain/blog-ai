import { RouteSignin } from "@/helpers/RouteName";
import { logoutUser } from "@/redux/api/authAPI";
import { BookOpenText, LogIn, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SearchBox from "./SearchBox";
import Theme from "./Theme/Theme";
import { Button } from "./ui/button";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  console.log(isAuthenticated);
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate(RouteSignin);
  };
  return (
    <div className="flex justify-between items-center h-16 fixed w-full z-20 bg-background px-5 border-b border-border">
      <div className="text-foreground">
        <BookOpenText className="w-10 h-10 mx-2" />
      </div>
      <div className="w-[500px]">
        <SearchBox />
      </div>

      <div className="flex gap-3">
        <Theme />
        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg"
          >
            <LogOut className="mr-2" />
            Logout
          </Button>
        ) : (
          <Button asChild>
            <Link to={RouteSignin}>
              <LogIn className="mr-2" />
              Sign In
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default TopBar;
